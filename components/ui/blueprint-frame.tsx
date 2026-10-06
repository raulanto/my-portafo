'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export type BlueprintFrameProps = {
  color?: string;
  inset?: number;
  speed?: number;
  mask?: boolean;
  className?: string;
};

const EO = 'cubic-bezier(0.23, 1, 0.32, 1)';

const HATCH =
  'repeating-linear-gradient(-63deg, color-mix(in srgb, var(--bp) 12%, transparent) 0, color-mix(in srgb, var(--bp) 12%, transparent) 1px, transparent 1px, transparent 14px)';

const CSS = `
@keyframes bp-draw-y { from { clip-path: inset(0 0 100% 0); } to { clip-path: inset(0 0 0 0); } }
@keyframes bp-draw-x { from { clip-path: inset(0 50% 0 50%); } to { clip-path: inset(0 0 0 0); } }
@keyframes bp-band-in { from { opacity: 0; filter: blur(5px); } to { opacity: 1; filter: blur(0); } }
@keyframes bp-cross-in { from { opacity: 0; transform: translate(-50%,-50%) scale(0.5); } to { opacity: 1; transform: translate(-50%,-50%) scale(1); } }
@keyframes bp-drift { to { background-position: 12.5px -6.4px; } }
@keyframes bp-fade { from { opacity: 0; } to { opacity: 1; } }
@media (prefers-reduced-motion: reduce) {
  .bp-anim, .bp-cross { animation: bp-fade 260ms ease both !important; clip-path: none !important; filter: none !important; }
  .bp-cross { transform: translate(-50%, -50%) !important; }
}
`;

function Cross({
  x,
  y,
  delay,
}: {
  x: React.CSSProperties;
  y: React.CSSProperties['top'];
  delay: number;
}) {
  const bar = 'color-mix(in srgb, var(--bp) 50%, transparent)';
  return (
    <div
      className="bp-cross absolute h-3.5 w-3.5"
      style={{
        ...x,
        top: y,
        transform: 'translate(-50%, -50%)',
        animation: `bp-cross-in 450ms ${EO} ${delay}ms both`,
      }}
    >
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2" style={{ background: bar }} />
      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2" style={{ background: bar }} />
    </div>
  );
}

export function BlueprintFrame({
  color = '#ffffff',
  inset = 48,
  speed = 1,
  mask = false,
  className,
}: BlueprintFrameProps) {
  const [currentInset, setCurrentInset] = React.useState(inset);

  React.useEffect(() => {
    const updateInset = () => {
      if (typeof window !== 'undefined') {
        const isMobile = window.innerWidth < 640;
        setCurrentInset(isMobile ? Math.min(inset, 16) : inset);
      }
    };
    updateInset();
    window.addEventListener('resize', updateInset);
    return () => window.removeEventListener('resize', updateInset);
  }, [inset]);

  const effectiveInset = currentInset;
  const frozen = speed <= 0;
  const driftDur = frozen ? 0 : 7 / speed;
  const line = 'color-mix(in srgb, var(--bp) 10%, transparent)';

  const bandH = 72;
  const gap = 40;
  const topTopY = gap;
  const topBotY = gap + bandH;
  const botTopY = `calc(100% - ${gap + bandH}px)`;
  const botBotY = `calc(100% - ${gap}px)`;

  const leftX: React.CSSProperties = { left: effectiveInset };
  const rightX: React.CSSProperties = { left: `calc(100% - ${effectiveInset}px)` };

  const bands = [
    { top: topTopY, height: bandH },
    { top: `calc(100% - ${gap + bandH}px)`, height: bandH },
  ];
  const rules = [topTopY, topBotY, botTopY, botBotY];
  const crosses = [
    { x: leftX, y: topTopY },
    { x: rightX, y: topTopY },
    { x: leftX, y: topBotY },
    { x: rightX, y: topBotY },
    { x: leftX, y: botTopY },
    { x: rightX, y: botTopY },
    { x: leftX, y: botBotY },
    { x: rightX, y: botBotY },
  ];

  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 select-none overflow-hidden',
        mask &&
          '[mask-image:radial-gradient(ellipse_94%_100%_at_50%_46%,black_44%,transparent_98%)]',
        className,
      )}
      style={{ '--bp': color } as React.CSSProperties}
    >
      <style>{CSS}</style>

      <div
        className="bp-anim absolute inset-y-0 w-px"
        style={{ left: inset, background: line, animation: `bp-draw-y 720ms ${EO} both` }}
      />
      <div
        className="bp-anim absolute inset-y-0 w-px"
        style={{ left: `calc(100% - ${inset}px)`, background: line, animation: `bp-draw-y 720ms ${EO} 90ms both` }}
      />

      {bands.map((b, i) => (
        <div
          key={i}
          className="bp-anim absolute overflow-hidden"
          style={{
            left: inset,
            right: inset,
            top: b.top,
            height: b.height,
            backgroundImage: HATCH,
            animation:
              `bp-band-in 700ms ${EO} 340ms both` +
              (frozen ? '' : `, bp-drift ${driftDur}s linear 1040ms infinite`),
          }}
        />
      ))}

      {rules.map((y, i) => (
        <div
          key={i}
          className="bp-anim absolute inset-x-0 h-px"
          style={{ top: y, background: line, animation: `bp-draw-x 620ms ${EO} ${240 + i * 70}ms both` }}
        />
      ))}

      {crosses.map((c, i) => (
        <Cross key={i} x={c.x} y={c.y} delay={720 + i * 45} />
      ))}
    </div>
  );
}
