"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import GradientWaves from "@/components/GradientWaves";
import AceternityButton from "@/components/ui/AceternityButton";
import Image from "next/image";
import { SplitTextReveal } from "@/components/ui/split-text-reveal";
import { BlueprintFrame } from "@/components/ui/blueprint-frame";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Capturar el progreso del scroll dentro del HeroSection
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transformaciones parallax multicapa
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "75%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const frameY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center"
    >
      {/* GradientWaves background with subtle Parallax scroll */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 rotate-180 will-change-transform"
      >
        <GradientWaves
          horizonColor="#73b6ff"
          waveColor="#47a0ff"
          crestColor="#0a81ff"
          speed={0.4}
          amplitude={2.5}
          waveScale={0.6}
          waveRatio={0.9}
          swell={35}
          turbulence={10}
          tilt={1.11}
          zoom={1.0}
          height={5.5}
          fogDepth={15}
          detail="high"
          brightness={1.0}
          opacity={1.0}
          mouseInteraction={false}
          parallaxStrength={0.5}
          grain={true}
          grainIntensity={0.05}
        />
      </motion.div>

      {/* Blueprint Architectural Frame with mid-speed Parallax */}
      <motion.div style={{ y: frameY }} className="absolute inset-0 pointer-events-none">
        <BlueprintFrame color="hsl(var(--primary))" inset={32} speed={0.8} mask={true} />
      </motion.div>

      {/* Hero Content — Parallax shift + Fade Out on Scroll */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center text-center gap-6 pt-28 sm:pt-32 pb-16 will-change-transform"
      >
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-background/80 dark:bg-background/60 backdrop-blur-xl border border-border/60 text-xs font-medium text-foreground shadow-lg transition-transform hover:scale-105">
          <span className="relative flex size-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
          </span>
          <span>Disponible para proyectos</span>
        </div>

        {/* Brand Headline (raulantodev Portafolio+) */}
        <div className="relative flex flex-col items-center justify-center select-none py-4 w-full">
          {/* Subtle dotted background grid matching the design image */}
          <div className="absolute -inset-10 -z-10 rounded-3xl bg-[radial-gradient(rgba(120,119,198,0.25)_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(rgba(255,255,255,0.15)_1.5px,transparent_1.5px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)] pointer-events-none" />

          <div className="inline-flex flex-col items-center w-full gap-1">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-foreground leading-none drop-shadow-sm">
              <SplitTextReveal
                text="raulantodev"
                delay={0.1}
                stagger={0.05}
                tag="span"
              />
            </h1>

            <div className="flex items-center gap-2 text-2xl sm:text-3xl md:text-4xl font-serif italic font-normal text-foreground/90 tracking-wide">
              <SplitTextReveal
                text="Portafolio"
                delay={0.6}
                stagger={0.04}
                tag="span"
              />
              <span className="inline-flex items-center justify-center size-8 sm:size-9 md:size-10 rounded-xl p-1.5 hover:rotate-12 transition-transform duration-300">
                <Image
                  src="/logo.svg"
                  alt="Logo Raúl Antón"
                  width={46}
                  height={46}
                  className="size-full object-contain"
                />
              </span>
            </div>
          </div>
        </div>

        {/* Role subtitle */}
        <div className="text-sm sm:text-base font-semibold text-primary uppercase tracking-widest -mt-1 font-mono">
          <SplitTextReveal
            text="Full Stack Developer"
            delay={0.9}
            stagger={0.03}
            tag="span"
          />
        </div>

        {/* Subtitle description */}
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed font-normal">
          <SplitTextReveal
            text="Diseño, desarrollo e implemento aplicaciones web robustas — desde interfaces reactivas hasta APIs de alto rendimiento."
            delay={1.2}
            stagger={0.012}
            tag="span"
          />
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <AceternityButton href="#proyectos" size="lg" variant="primary">
            Ver proyectos
          </AceternityButton>
          <AceternityButton href="#contacto" size="lg" variant="outline">
            Contacto
          </AceternityButton>
        </div>
      </motion.div>
    </div>
  );
}
