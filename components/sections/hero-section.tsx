"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import GradientWaves from "@/components/GradientWaves";
import AceternityButton from "@/components/ui/AceternityButton";
import Image from "next/image";
import { SplitTextReveal } from "@/components/ui/split-text-reveal";
import { BlueprintFrame } from "@/components/ui/blueprint-frame";

import TechText from "@/components/ui/tech-text";

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
        className="relative z-30 w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center gap-5 sm:gap-6 pt-24 sm:pt-32 pb-14 sm:pb-16 will-change-transform overflow-visible"
      >
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-background/80 dark:bg-background/60 backdrop-blur-xl border border-border/60 text-[11px] sm:text-xs font-medium text-foreground shadow-lg transition-transform hover:scale-105">
          <span className="relative flex size-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
          </span>
          <span>Disponible para proyectos</span>
        </div>

        {/* Brand Headline (raulantodev Portafolio+) */}
        <div className="relative flex flex-col items-center justify-center select-none py-1 sm:py-2 w-full z-40 overflow-visible">
          <div className="inline-flex flex-col items-center w-full gap-1 overflow-visible">
            {/* TechText from React Bits for raulantodev with entrance animation */}
            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
              className="w-full h-28 sm:h-44 md:h-52 relative flex items-center justify-center max-w-5xl z-50 overflow-visible"
            >
              <TechText
                text="raulantodev"
                fontWeight={900}
                fontSize={140}
                reveal="letter"
                dashLength={4}
                dashGap={2}
                specks={15}
                color="hsl(var(--foreground))"
                accentColor="hsl(var(--primary))"
              />
            </motion.div>

            <div className="flex items-center gap-2.5 sm:gap-3 text-xl sm:text-3xl md:text-4xl font-serif italic font-normal text-foreground/90 tracking-wide">
              <SplitTextReveal
                text="Portafolio"
                delay={0.6}
                stagger={0.04}
                tag="span"
              />
              <span className="inline-flex items-center justify-center size-7 sm:size-9 md:size-10 hover:rotate-12 hover:scale-110 transition-transform duration-300">
                <Image
                  src="/logo.svg"
                  alt="Logo Raúl Antón"
                  width={46}
                  height={46}
                  className="size-full object-contain"
                  priority
                />
              </span>
            </div>
          </div>
        </div>

        {/* Role subtitle */}
        <div className="text-xs sm:text-base font-semibold text-primary uppercase tracking-widest -mt-1 font-mono">
          <SplitTextReveal
            text="Full Stack Developer"
            delay={0.9}
            stagger={0.03}
            tag="span"
          />
        </div>

        {/* Subtitle description */}
        <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl leading-relaxed font-normal px-2">
          <SplitTextReveal
            text="Diseño, desarrollo e implemento aplicaciones web robustas — desde interfaces reactivas hasta APIs de alto rendimiento."
            delay={1.2}
            stagger={0.012}
            tag="span"
          />
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 w-full max-w-xs sm:max-w-none">
          <AceternityButton
            href="#proyectos"
            size="lg"
            variant="primary"
            className="w-full sm:w-auto min-h-[48px] justify-center text-sm"
          >
            Ver proyectos
          </AceternityButton>
          <AceternityButton
            href="#contacto"
            size="lg"
            variant="outline"
            className="w-full sm:w-auto min-h-[48px] justify-center text-sm"
          >
            Contacto
          </AceternityButton>
        </div>
      </motion.div>
    </div>
  );
}
