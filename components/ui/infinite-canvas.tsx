"use client";

import { useEffect, useId, useRef } from "react";
import { animate, type AnimationPlaybackControls } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

export type CanvasNote = {
  id: string;
  x: number;
  y: number;
  title: string;
  text: string;
  tags?: string[];
  rotate?: number;
  accent?: boolean;
};

type View = { x: number; y: number; s: number };
type Point = { x: number; y: number };

const MIN_SCALE = 0.25;
const MAX_SCALE = 3;
// World units between grid dots at 100%.
const GRID = 24;
// Critically damped and about 300ms: view changes are navigation, and a
// camera that overshoots its target makes people feel seasick.
const VIEW_SPRING = { type: "spring", visualDuration: 0.3, bounce: 0 } as const;
// Velocity kept per millisecond of coasting. 0.995 gives a time constant of
// about 200ms, so a flick glides a short way and settles, like Figma rather
// than a long iOS scroll list.
const FRICTION = 0.995;
// Below this (px per ms) a release is a placement, not a throw.
const MIN_FLICK = 0.05;
// A pause this long before lifting the finger cancels the throw.
const STALE_RELEASE = 50;
// Velocity is averaged over the last 100ms, smoothing jittery final events.
const VELOCITY_WINDOW = 100;
const BUTTON_ZOOM = 1.5;
const KEY_PAN = 80;
const FIT_PADDING = 32;

// Tuned so one trackpad pinch gesture covers roughly the full zoom range and
// one ctrl + mouse wheel notch (about 100px) zooms by ~16%.
const PINCH_SPEED = 0.01;
const WHEEL_SPEED = 0.0015;
// How recently the page must have scrolled for a wheel over the canvas to
// count as the same page scroll: longer than the gap between wheel events.
const PAGE_SCROLL_GRACE = 250;
// Pixels per line when the browser reports wheel deltas in lines.
const LINE_HEIGHT = 33;

const clampScale = (s: number) => Math.min(Math.max(s, MIN_SCALE), MAX_SCALE);

// Keeps `anchor` (a point in the viewport) pinned while the scale changes.
function zoomAround(view: View, s: number, anchor: Point): View {
  const k = s / view.s;
  return {
    s,
    x: anchor.x - (anchor.x - view.x) * k,
    y: anchor.y - (anchor.y - view.y) * k,
  };
}

function centeredOn(
  point: Point,
  s: number,
  width: number,
  height: number,
): View {
  return { s, x: width / 2 - point.x * s, y: height / 2 - point.y * s };
}

// Two dot layers: a minor grid that fades out as its dots crowd together when
// zoomed out, and a major grid every four cells that stays, so there is
// always a sense of scale and movement.
function gridImage(minorAlpha: number) {
  return [
    `radial-gradient(circle, color-mix(in oklch, var(--foreground) ${minorAlpha}%, transparent) 1px, transparent 1.5px)`,
    "radial-gradient(circle, color-mix(in oklch, var(--foreground) 24%, transparent) 1.25px, transparent 1.75px)",
  ].join(", ");
}

function gridState(view: View) {
  const minor = GRID * view.s;
  const major = minor * 4;
  // Fully visible from 18px spacing, gone by 8px.
  const alpha = Math.round(Math.min(Math.max((minor - 8) / 10, 0), 1) * 16);
  return {
    alpha,
    size: `${minor}px ${minor}px, ${major}px ${major}px`,
    // Offset by half a cell so dots land on world grid points, not between.
    position: `${view.x - minor / 2}px ${view.y - minor / 2}px, ${
      view.x - major / 2
    }px ${view.y - major / 2}px`,
  };
}

// No will-change here on purpose: a permanently promoted layer keeps the
// notes rasterized at their old scale, so text goes soft after zooming.
function worldTransform(view: View) {
  return `translate(${view.x}px, ${view.y}px) scale(${view.s})`;
}

// Rendered before measuring, so the server markup already shows the notes in
// place at the canvas's full size.
const DEFAULT_WIDTH = 1100;
const DEFAULT_HEIGHT = 750;

type Api = {
  zoomBy: (factor: number) => void;
  fit: () => void;
  reset: () => void;
};

export function InfiniteCanvas({
  notes,
  home,
  label,
  className,
}: {
  notes: CanvasNote[];
  // The world point shown centered at 100% on load and on reset.
  home: Point;
  label: string;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const reduceRef = useRef(reduceMotion);
  const viewport = useRef<HTMLDivElement>(null);
  const world = useRef<HTMLDivElement>(null);
  const zoomLabel = useRef<HTMLSpanElement>(null);
  const api = useRef<Api>(null);
  const hintId = useId();

  useEffect(() => {
    reduceRef.current = reduceMotion;
  }, [reduceMotion]);

  useEffect(() => {
    const vp = viewport.current;
    const layer = world.current;
    const zoomText = zoomLabel.current;
    if (!vp || !layer || !zoomText) return;

    let width = vp.clientWidth;
    let height = vp.clientHeight;
    let view = centeredOn(home, 1, width, height);
    let gridAlpha = -1;
    let percent = -1;

    const paint = () => {
      layer.style.transform = worldTransform(view);
      const grid = gridState(view);
      if (grid.alpha !== gridAlpha) {
        vp.style.backgroundImage = gridImage(grid.alpha);
        gridAlpha = grid.alpha;
      }
      vp.style.backgroundSize = grid.size;
      vp.style.backgroundPosition = grid.position;
      const next = Math.round(view.s * 100);
      if (next !== percent) {
        zoomText.textContent = `${next}%`;
        percent = next;
      }
    };

    let flight: { controls: AnimationPlaybackControls; target: View } | null =
      null;

    const stopFlight = () => {
      flight?.controls.stop();
      flight = null;
    };

    const flyTo = (target: View, anchor?: Point) => {
      stopMomentum();
      stopFlight();
      if (reduceRef.current) {
        view = target;
        paint();
        return;
      }
      const from = view;
      const scaleAt = (p: number) => from.s * (target.s / from.s) ** p;
      const fromCenter = {
        x: (width / 2 - from.x) / from.s,
        y: (height / 2 - from.y) / from.s,
      };
      const toCenter = {
        x: (width / 2 - target.x) / target.s,
        y: (height / 2 - target.y) / target.s,
      };
      const controls = animate(0, 1, {
        ...VIEW_SPRING,
        onUpdate: (p) => {
          const s = scaleAt(p);
          view = anchor
            ? zoomAround(from, s, anchor)
            : centeredOn(
                {
                  x: fromCenter.x + (toCenter.x - fromCenter.x) * p,
                  y: fromCenter.y + (toCenter.y - fromCenter.y) * p,
                },
                s,
                width,
                height,
              );
          paint();
        },
        onComplete: () => {
          view = target;
          paint();
          flight = null;
        },
      });
      flight = { controls, target };
    };

    const zoomTo = (factor: number, anchor: Point) => {
      const base = flight?.target ?? view;
      const s = clampScale(base.s * factor);
      if (s === view.s && !flight) return;
      flyTo(zoomAround(view, s, anchor), anchor);
    };

    const center = () => ({ x: width / 2, y: height / 2 });

    const fit = () => {
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;
      for (const child of layer.children) {
        const el = child as HTMLElement;
        minX = Math.min(minX, el.offsetLeft);
        minY = Math.min(minY, el.offsetTop);
        maxX = Math.max(maxX, el.offsetLeft + el.offsetWidth);
        maxY = Math.max(maxY, el.offsetTop + el.offsetHeight);
      }
      if (minX === Infinity) return;
      const s = clampScale(
        Math.min(
          (width - FIT_PADDING * 2) / (maxX - minX),
          (height - FIT_PADDING * 2) / (maxY - minY),
          1,
        ),
      );
      flyTo(
        centeredOn(
          { x: (minX + maxX) / 2, y: (minY + maxY) / 2 },
          s,
          width,
          height,
        ),
      );
    };

    const reset = () => flyTo(centeredOn(home, 1, width, height));

    const panBy = (dx: number, dy: number) => {
      const base = flight?.target ?? view;
      flyTo({ ...base, x: base.x + dx, y: base.y + dy });
    };

    api.current = {
      zoomBy: (factor) => zoomTo(factor, center()),
      fit,
      reset,
    };

    // Auto-fit on small screens upon loading
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setTimeout(() => {
        fit();
      }, 150);
    }

    let coast = 0;
    const stopMomentum = () => {
      cancelAnimationFrame(coast);
      coast = 0;
    };
    const startMomentum = (vx: number, vy: number) => {
      let last = performance.now();
      const step = (now: number) => {
        const dt = Math.min(now - last, 32);
        last = now;
        view = { ...view, x: view.x + vx * dt, y: view.y + vy * dt };
        paint();
        const decay = FRICTION ** dt;
        vx *= decay;
        vy *= decay;
        coast = Math.hypot(vx, vy) > 0.01 ? requestAnimationFrame(step) : 0;
      };
      coast = requestAnimationFrame(step);
    };

    const pointers = new Map<number, Point>();
    let samples: { t: number; x: number; y: number }[] = [];
    let pinched = false;
    let travel = 0;
    let lastPanEnd = -Infinity;
    let origin: Point = { x: 0, y: 0 };

    const local = (e: { clientX: number; clientY: number }) => ({
      x: e.clientX - origin.x,
      y: e.clientY - origin.y,
    });

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      if ((e.target as Element).closest("[data-canvas-toolbar]")) return;
      stopMomentum();
      stopFlight();
      if (pointers.size === 0) {
        const rect = vp.getBoundingClientRect();
        origin = { x: rect.left, y: rect.top };
        pinched = false;
        travel = 0;
      }
      vp.setPointerCapture(e.pointerId);
      const p = local(e);
      pointers.set(e.pointerId, p);
      if (pointers.size > 1) pinched = true;
      samples = [{ t: e.timeStamp, ...p }];
      vp.dataset.dragging = "";
    };

    const onPointerMove = (e: PointerEvent) => {
      const prev = pointers.get(e.pointerId);
      if (!prev) return;
      const next = local(e);
      travel += Math.abs(next.x - prev.x) + Math.abs(next.y - prev.y);
      if (pointers.size === 1) {
        view = {
          ...view,
          x: view.x + next.x - prev.x,
          y: view.y + next.y - prev.y,
        };
        samples.push({ t: e.timeStamp, ...next });
        while (
          samples.length > 2 &&
          e.timeStamp - samples[0].t > VELOCITY_WINDOW
        ) {
          samples.shift();
        }
      } else {
        let other = prev;
        for (const [id, p] of pointers) {
          if (id !== e.pointerId) {
            other = p;
            break;
          }
        }
        const before = Math.hypot(prev.x - other.x, prev.y - other.y);
        const after = Math.hypot(next.x - other.x, next.y - other.y);
        const midBefore = {
          x: (prev.x + other.x) / 2,
          y: (prev.y + other.y) / 2,
        };
        const midAfter = {
          x: (next.x + other.x) / 2,
          y: (next.y + other.y) / 2,
        };
        const s = clampScale(view.s * (before > 0 ? after / before : 1));
        const zoomed = zoomAround(view, s, midBefore);
        view = {
          s,
          x: zoomed.x + midAfter.x - midBefore.x,
          y: zoomed.y + midAfter.y - midBefore.y,
        };
      }
      pointers.set(e.pointerId, next);
      paint();
    };

    const onPointerEnd = (e: PointerEvent) => {
      if (!pointers.delete(e.pointerId)) return;
      if (pointers.size > 0) {
        const [remaining] = pointers.values();
        samples = [{ t: e.timeStamp, ...remaining }];
        return;
      }
      delete vp.dataset.dragging;
      if (travel > 4) lastPanEnd = e.timeStamp;
      if (pinched || reduceRef.current || e.type === "pointercancel") return;
      const first = samples[0];
      const last = samples[samples.length - 1];
      if (!first || !last || e.timeStamp - last.t > STALE_RELEASE) return;
      const dt = last.t - first.t;
      if (dt <= 0) return;
      const vx = (last.x - first.x) / dt;
      const vy = (last.y - first.y) / dt;
      if (Math.hypot(vx, vy) > MIN_FLICK) startMomentum(vx, vy);
    };

    let pageScrolledAt = -Infinity;
    const onPageScroll = () => {
      pageScrolledAt = performance.now();
    };

    const onWheel = (e: WheelEvent) => {
      const zoom = e.ctrlKey || e.metaKey;
      if (!zoom && performance.now() - pageScrolledAt < PAGE_SCROLL_GRACE) {
        return;
      }
      e.preventDefault();
      stopMomentum();
      const rect = vp.getBoundingClientRect();
      const anchor = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      const unit = e.deltaMode === 1 ? LINE_HEIGHT : 1;
      let dx = e.deltaX * unit;
      let dy = e.deltaY * unit;
      const notch =
        e.deltaMode === 1 ||
        (dx === 0 && Math.abs(dy) >= 40 && Number.isInteger(dy));
      if (zoom) {
        if (notch) {
          zoomTo(Math.exp(-dy * WHEEL_SPEED), anchor);
          return;
        }
        stopFlight();
        view = zoomAround(
          view,
          clampScale(view.s * Math.exp(-dy * PINCH_SPEED)),
          anchor,
        );
        paint();
        return;
      }
      if (e.shiftKey && dx === 0) [dx, dy] = [dy, 0];
      if (notch) {
        panBy(-dx, -dy);
        return;
      }
      stopFlight();
      view = { ...view, x: view.x - dx, y: view.y - dy };
      paint();
    };

    const onDoubleClick = (e: MouseEvent) => {
      if ((e.target as Element).closest("[data-canvas-toolbar]")) return;
      if (e.timeStamp - lastPanEnd < 400) return;
      const rect = vp.getBoundingClientRect();
      zoomTo(e.shiftKey ? 0.5 : 2, {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target !== vp || e.metaKey || e.ctrlKey || e.altKey) return;
      const pan = e.shiftKey ? KEY_PAN * 3 : KEY_PAN;
      const actions: Record<string, () => void> = {
        ArrowLeft: () => panBy(pan, 0),
        ArrowRight: () => panBy(-pan, 0),
        ArrowUp: () => panBy(0, pan),
        ArrowDown: () => panBy(0, -pan),
        "+": () => zoomTo(BUTTON_ZOOM, center()),
        "=": () => zoomTo(BUTTON_ZOOM, center()),
        "-": () => zoomTo(1 / BUTTON_ZOOM, center()),
        _: () => zoomTo(1 / BUTTON_ZOOM, center()),
        "0": reset,
      };
      const action = actions[e.key];
      if (!action) return;
      e.preventDefault();
      action();
    };

    const resize = new ResizeObserver(() => {
      const w = vp.clientWidth;
      const h = vp.clientHeight;
      if (w === width && h === height) return;
      view = {
        ...view,
        x: view.x + (w - width) / 2,
        y: view.y + (h - height) / 2,
      };
      width = w;
      height = h;
      paint();
    });

    paint();
    resize.observe(vp);
    vp.addEventListener("pointerdown", onPointerDown);
    vp.addEventListener("pointermove", onPointerMove);
    vp.addEventListener("pointerup", onPointerEnd);
    vp.addEventListener("pointercancel", onPointerEnd);
    vp.addEventListener("wheel", onWheel, { passive: false });
    vp.addEventListener("dblclick", onDoubleClick);
    vp.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onPageScroll, {
      passive: true,
      capture: true,
    });
    return () => {
      window.removeEventListener("scroll", onPageScroll, { capture: true });
      resize.disconnect();
      stopMomentum();
      stopFlight();
      api.current = null;
      vp.removeEventListener("pointerdown", onPointerDown);
      vp.removeEventListener("pointermove", onPointerMove);
      vp.removeEventListener("pointerup", onPointerEnd);
      vp.removeEventListener("pointercancel", onPointerEnd);
      vp.removeEventListener("wheel", onWheel);
      vp.removeEventListener("dblclick", onDoubleClick);
      vp.removeEventListener("keydown", onKeyDown);
    };
  }, [home]);

  const initial = centeredOn(home, 1, DEFAULT_WIDTH, DEFAULT_HEIGHT);
  const initialGrid = gridState(initial);

  const toolButton =
    "flex h-9 touch-manipulation items-center justify-center rounded-full text-xs font-semibold text-foreground outline-none transition-[scale,background-color] duration-150 ease-out select-none hover:bg-muted/80 focus-visible:ring-2 focus-visible:ring-primary active:scale-95 cursor-pointer";

  return (
    <div
      ref={viewport}
      role="region"
      aria-roledescription="canvas"
      aria-label={label}
      aria-describedby={hintId}
      tabIndex={0}
      className={cn(
        "relative isolate h-[520px] sm:h-[750px] lg:h-[850px] w-full cursor-grab touch-none overflow-clip rounded-3xl border border-border/60 bg-card/40 backdrop-blur-xl outline-none select-none focus-visible:ring-2 focus-visible:ring-primary data-dragging:cursor-grabbing",
        className,
      )}
      style={{
        backgroundImage: gridImage(initialGrid.alpha),
        backgroundSize: initialGrid.size,
        backgroundPosition: initialGrid.position,
      }}
    >
      <div
        ref={world}
        className="absolute top-0 left-0 origin-top-left"
        style={{ transform: worldTransform(initial) }}
      >
        {notes.map((note) => (
          <div
            key={note.id}
            className={cn(
              "absolute flex w-64 flex-col gap-2 rounded-2xl p-5 border backdrop-blur-md transition-shadow hover:shadow-2xl",
              note.accent
                ? "bg-gradient-to-br from-primary/95 to-purple-600/95 text-white border-primary/40 shadow-primary/20"
                : "bg-card/90 text-card-foreground border-border/70 shadow-black/10",
            )}
            style={{
              left: note.x,
              top: note.y,
              transform: `rotate(${note.rotate ?? 0}deg)`,
            }}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-bold tracking-tight">
                {note.title}
              </span>
              <span
                className={cn(
                  "size-2 rounded-full",
                  note.accent ? "bg-emerald-400 animate-pulse" : "bg-primary",
                )}
              />
            </div>
            <p
              className={cn(
                "text-xs leading-relaxed",
                note.accent ? "text-white/85" : "text-muted-foreground",
              )}
            >
              {note.text}
            </p>
            {note.tags && note.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-1 mt-1 border-t border-current/10">
                {note.tags.map((t) => (
                  <span
                    key={t}
                    className={cn(
                      "px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold",
                      note.accent
                        ? "bg-white/15 text-white"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <p
        id={hintId}
        className="pointer-events-none absolute bottom-4 left-4 text-xs font-mono text-muted-foreground/80 max-sm:hidden backdrop-blur-sm px-3 py-1 rounded-full bg-background/60 border border-border/40"
      >
        Arrastra para navegar • Pellizca/Rueda para zoom
      </p>

      <div
        data-canvas-toolbar
        className="absolute right-2.5 sm:right-3 bottom-2.5 sm:bottom-3 flex h-10 sm:h-11 cursor-default items-center gap-1 rounded-full bg-background/95 sm:bg-background/90 backdrop-blur-md p-1 border border-border/60 shadow-lg"
      >
        <button
          type="button"
          aria-label="Zoom out"
          onClick={() => api.current?.zoomBy(1 / BUTTON_ZOOM)}
          className={cn(toolButton, "size-8 sm:w-9 sm:h-9")}
        >
          <ToolIcon d="M5 12h14" />
        </button>
        <button
          type="button"
          aria-label="Reset zoom"
          onClick={() => api.current?.reset()}
          className={cn(toolButton, "px-2 sm:w-14 font-mono text-[11px] sm:text-xs")}
        >
          <span ref={zoomLabel}>100%</span>
        </button>
        <button
          type="button"
          aria-label="Zoom in"
          onClick={() => api.current?.zoomBy(BUTTON_ZOOM)}
          className={cn(toolButton, "size-8 sm:w-9 sm:h-9")}
        >
          <ToolIcon d="M5 12h14M12 5v14" />
        </button>
        <span aria-hidden className="mx-0.5 sm:mx-1 h-4 sm:h-5 w-px bg-border/60" />
        <button
          type="button"
          onClick={() => api.current?.fit()}
          className={cn(toolButton, "px-2.5 sm:px-3.5 font-bold text-primary text-[11px] sm:text-xs")}
        >
          Encuadrar
        </button>
      </div>
    </div>
  );
}

function ToolIcon({ d }: { d: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}
