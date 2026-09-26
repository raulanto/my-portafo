"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

export type OrbitLogo = { title: string; path: string; hex: string };

type Ring = {
  logos: OrbitLogo[];
  radius: number;
  lap: number; // seconds per lap; negative = opposite direction
};

const TILT = 0.42;
const BRAKE = 4;

function readable(hex: string) {
  const n = parseInt(hex, 16);
  const lum =
    0.2126 * (n >> 16) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255);
  return lum > 40 && lum < 225;
}

export function LogoOrbit({
  rings,
  paused = false,
  className,
  children,
}: {
  rings: Ring[];
  paused?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hovering = useRef(false);
  const [active, setActive] = useState<string | null>(null);

  const flat = rings.flatMap((ring, r) =>
    ring.logos.map((logo, i) => ({ logo, r, i, n: ring.logos.length }))
  );

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const turns = rings.map(() => 0);
    let speed = 1;
    let frame = 0;
    let visible = true;
    let last = performance.now();

    const place = () => {
      const w = stage.offsetWidth;
      const h = stage.offsetHeight;
      flat.forEach(({ r, i, n }, k) => {
        const el = itemRefs.current[k];
        if (!el) return;
        const ring = rings[r];
        const angle = turns[r] + (i / n) * Math.PI * 2;
        const rx = (ring.radius * w) / 2;
        const x = Math.cos(angle) * rx;
        const y = Math.sin(angle) * rx * TILT;
        const depth = Math.sin(angle);
        const near = (depth + 1) / 2;
        el.style.transform = `translate(${(w / 2 + x).toFixed(1)}px, ${(h / 2 + y).toFixed(1)}px) translate(-50%, -50%) scale(${(0.7 + near * 0.35).toFixed(3)})`;
        el.style.opacity = (0.28 + near * 0.72).toFixed(3);
        el.style.zIndex = depth > 0 ? "3" : "1";
      });
    };

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      const target = hovering.current ? 0 : 1;
      speed += (target - speed) * (1 - Math.exp(-BRAKE * dt));
      rings.forEach((ring, r) => {
        turns[r] += ((Math.PI * 2) / ring.lap) * dt * speed;
      });
      place();
      frame = visible ? requestAnimationFrame(step) : 0;
    };

    place();
    if (paused || reduceMotion) return;

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) {
        last = performance.now();
        frame = requestAnimationFrame(step);
      }
    });
    io.observe(stage);
    const ro = new ResizeObserver(place);
    ro.observe(stage);
    frame = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rings, paused, reduceMotion]);

  return (
    <div
      ref={stageRef}
      className={cn("relative isolate aspect-[16/9] w-full", className)}
      onPointerEnter={(e) => {
        if (e.pointerType !== "touch") hovering.current = true;
      }}
      onPointerLeave={() => {
        hovering.current = false;
        setActive(null);
      }}
    >
      <div className="pointer-events-none absolute inset-0 z-[2] grid place-items-center px-[18%] text-center [&>*]:pointer-events-auto">
        {children}
      </div>

      {flat.map(({ logo }, k) => {
        const on = active === logo.title;
        return (
          <div
            key={logo.title}
            ref={(el) => void (itemRefs.current[k] = el)}
            data-on={on}
            className="absolute top-0 left-0 will-change-transform data-[on=true]:!z-[4] data-[on=true]:!opacity-100"
          >
            <button
              type="button"
              aria-label={logo.title}
              onPointerEnter={(e) =>
                e.pointerType !== "touch" && setActive(logo.title)
              }
              onPointerLeave={() => setActive(null)}
              onFocus={() => {
                hovering.current = true;
                setActive(logo.title);
              }}
              onBlur={() => {
                hovering.current = false;
                setActive(null);
              }}
              className="relative grid size-11 touch-manipulation place-items-center rounded-full text-foreground outline-hidden focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-foreground"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden
                className="size-7 transition-[color,scale] duration-200 ease-out"
                style={{
                  fill:
                    on && readable(logo.hex) ? `#${logo.hex}` : "currentColor",
                  scale: on ? "1.12" : "1",
                }}
              >
                <path d={logo.path} />
              </svg>
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute top-full left-1/2 mt-1 -translate-x-1/2 rounded-full bg-foreground px-2 py-0.5 text-xs font-medium whitespace-nowrap text-background transition-[opacity,translate] duration-150 ease-out",
                  on ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
                )}
              >
                {logo.title}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
