"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

/**
 * Revelación por caracteres (H2 / Encabezados)
 */
export function ScrollTextReveal({
  children,
  className,
  tag: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const split = new SplitText(containerRef.current, {
        type: "chars, words",
      });

      if (!split.chars || split.chars.length === 0) return;

      gsap.set(split.chars, {
        y: 40,
        opacity: 0,
        scale: 0.9,
      });

      gsap.to(split.chars, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.015,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 92%",
          toggleActions: "play none none none", // Revela una vez y permanece visible de forma limpia y consistente
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <Tag ref={containerRef as any} className={cn("inline-block", className)}>
      {children}
    </Tag>
  );
}

/**
 * Revelación continua ligada a la posición exacta del scroll (Scrub / Words Opacity)
 * Como la demo de Lenis: las palabras inician opacas/apagadas y conforme avanzas en el scroll se encienden con opacidad 100%.
 */
export function ScrollWordOpacity({
  children,
  className,
  tag: Tag = "p",
  lowOpacity = 0.25,
}: {
  children: React.ReactNode;
  className?: string;
  tag?: "p" | "div" | "span" | "blockquote";
  lowOpacity?: number;
}) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const split = new SplitText(containerRef.current, {
        type: "words",
      });

      if (!split.words || split.words.length === 0) return;

      // Estado inicial: Opacidad baja (semi-transparente/tenue)
      gsap.set(split.words, {
        opacity: lowOpacity,
      });

      // Animación scrubbing atada al progreso del scroll
      gsap.to(split.words, {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%", // Empieza cuando el párrafo entra a la vista
          end: "bottom 35%", // Termina de iluminarse cuando está en el centro
          scrub: 0.5, // Progreso suave atado al ratón/scroll
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <Tag ref={containerRef as any} className={cn(className)}>
      {children}
    </Tag>
  );
}

/**
 * Revelación suave para tarjetas, filas de listas o elementos visuales enteros al hacer scroll.
 */
export function ScrollElementReveal({
  children,
  className,
  delay = 0,
  y = 30,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.fromTo(
        containerRef.current,
        {
          y,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

