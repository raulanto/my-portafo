"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Terminal, Heart, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("fill-current", className)} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("fill-current", className)} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("fill-current", className)} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

import WarpText from "@/components/ui/warp-text";

export function Footer() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "America/Mexico_City",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat("es-MX", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-background text-foreground pt-16 pb-0 overflow-hidden select-none border-t border-border/30">
      
      {/* Container principal de enlaces e información */}
      <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-12 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 items-start">
          
          {/* Marca + Breve descripción */}
          <div className="lg:col-span-4 flex flex-col gap-3 sm:gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="Logo Raúl Antón"
                width={32}
                height={32}
                className="size-8 object-contain shrink-0"
              />
              <div className="w-40 sm:w-44 h-10 relative flex items-center">
                <WarpText
                  text="raulantodev"
                  color="hsl(var(--foreground))"
                  warpStrength={0.08}
                  warpScale={1.7}
                  speed={0.55}
                  pointerInfluence={0.42}
                  pointerStrength={0.38}
                  refraction={0.018}
                  ripple={true}
                  fontSize="1.35rem"
                  fontWeight={800}
                />
              </div>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm">
              Software Architect & Full Stack Engineer especializado en arquitectura hexagonal, DDD y desarrollo de alta escala.
            </p>
          </div>

          {/* Columnas de navegación estilo limpio */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
            {/* Navegación */}
            <div className="flex flex-col gap-2.5 sm:gap-3">
              <h4 className="text-xs sm:text-sm font-semibold text-foreground uppercase tracking-wider font-mono">Navegación</h4>
              <ul className="flex flex-col gap-2 text-xs sm:text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors py-0.5 inline-block">Inicio</a></li>
                <li><a href="#sobre-mi" className="hover:text-foreground transition-colors py-0.5 inline-block">Sobre mí</a></li>
                <li><a href="#tecnologias" className="hover:text-foreground transition-colors py-0.5 inline-block">Tecnologías</a></li>
                <li><a href="#proyectos" className="hover:text-foreground transition-colors py-0.5 inline-block">Proyectos</a></li>
              </ul>
            </div>

            {/* Recursos / Secciones */}
            <div className="flex flex-col gap-2.5 sm:gap-3">
              <h4 className="text-xs sm:text-sm font-semibold text-foreground uppercase tracking-wider font-mono">Explorar</h4>
              <ul className="flex flex-col gap-2 text-xs sm:text-sm text-muted-foreground">
                <li><a href="#experiencia" className="hover:text-foreground transition-colors py-0.5 inline-block">Experiencia</a></li>
                <li><a href="#blog" className="hover:text-foreground transition-colors py-0.5 inline-block">Blog</a></li>
                <li><a href="#gustos" className="hover:text-foreground transition-colors py-0.5 inline-block">Intereses</a></li>
                <li><a href="#contacto" className="hover:text-foreground transition-colors py-0.5 inline-block">Contacto</a></li>
              </ul>
            </div>

            {/* Info / Status */}
            <div className="flex flex-col gap-2.5 sm:gap-3 col-span-2 sm:col-span-1">
              <h4 className="text-xs sm:text-sm font-semibold text-foreground uppercase tracking-wider font-mono">Ubicación</h4>
              <div className="flex flex-col gap-1 text-xs sm:text-sm text-muted-foreground font-mono">
                <span>México (UTC-6)</span>
                <span className="text-xs text-primary font-bold">{time || "--:--:--"}</span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">● Disponible</span>
              </div>
            </div>
          </div>

          {/* Social Icons con hit areas accesibles */}
          <div className="lg:col-span-2 flex items-center lg:justify-end gap-3 text-muted-foreground">
            <a
              href="https://github.com/raulanto"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="size-10 sm:size-9 rounded-full bg-muted/50 hover:bg-muted hover:text-foreground transition-all flex items-center justify-center active:scale-90"
            >
              <GithubIcon className="size-4 sm:size-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/rauantodev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="size-10 sm:size-9 rounded-full bg-muted/50 hover:bg-muted hover:text-foreground transition-all flex items-center justify-center active:scale-90"
            >
              <LinkedinIcon className="size-4 sm:size-5" />
            </a>
            <a
              href="https://x.com/raulantodev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="size-10 sm:size-9 rounded-full bg-muted/50 hover:bg-muted hover:text-foreground transition-all flex items-center justify-center active:scale-90"
            >
              <XIcon className="size-4 sm:size-5" />
            </a>
          </div>

        </div>

        {/* Copyright sutil antes del watermark gigante */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 sm:pt-12 text-xs text-muted-foreground border-t border-border/20 mt-8">
          <span className="text-center sm:text-left">© {new Date().getFullYear()} Raúl Antón. Todos los derechos reservados.</span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-foreground transition-colors p-2 rounded-lg bg-muted/30 hover:bg-muted/60 min-h-[36px] cursor-pointer"
            aria-label="Volver arriba"
          >
            <span>Ir arriba</span>
            <ArrowUp className="size-3.5" />
          </button>
        </div>
      </div>

      {/* WATERMARK TEXT STYLED ACCURAIL TYPE EMBOSSED / SOFT GRADIENT LIGHT BACKGROUND */}
      <div className="relative w-full overflow-hidden select-none pointer-events-none border-t border-border/10 pt-4 sm:pt-6 pb-4 sm:pb-6 mt-2 sm:mt-4">
        {/* Soft Grid Dot Background overlay */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.12] dark:opacity-[0.06] bg-[radial-gradient(#888_1px,transparent_1px)] [background-size:16px_16px]"
        />

        {/* Dynamic Glow from bottom */}
        <div
          aria-hidden
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[70%] h-[160px] bg-primary/10 dark:bg-primary/15 blur-[90px] rounded-full"
        />

        <div className="relative w-full px-2 sm:px-8 flex items-center justify-center">
          <h1 className="text-[12vw] sm:text-[10.5vw] lg:text-[11.5vw] font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-b from-foreground/20 via-foreground/5 to-transparent dark:from-foreground/25 dark:via-foreground/5 dark:to-transparent drop-shadow-[0_1px_2px_rgba(0,0,0,0.03)] uppercase whitespace-nowrap">
            raulantodev
          </h1>
        </div>
      </div>

    </footer>
  );
}
