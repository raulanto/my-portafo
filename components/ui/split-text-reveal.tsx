"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, SplitText);

export function SplitTextReveal({
  text,
  className,
  delay = 0.2,
  stagger = 0.04,
  tag: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  tag?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const split = new SplitText(containerRef.current, {
        mask: "chars",
        type: "chars",
      });
      gsap.set(split.chars, { y: 120, opacity: 0 });

      gsap.to(split.chars, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger,
        ease: "power3.out",
        delay,
      });
    },
    { scope: containerRef }
  );

  return (
    <Tag
      ref={containerRef as any}
      className={cn("inline-block overflow-hidden", className)}
    >
      {text}
    </Tag>
  );
}
