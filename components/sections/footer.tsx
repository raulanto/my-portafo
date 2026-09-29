"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUp,
  Terminal,
  Copy,
  Check,
  Code2,
  Sparkles,
  Heart,
  Cpu,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Footer() {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Hora local de México (CDMX/CST)
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

  const copyEmail = () => {
    navigator.clipboard.writeText("raulantodev@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/raulantodev",
      icon: Github,
      tag: "@raulantodev",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/raulantodev",
      icon: Linkedin,
      tag: "in/raulantodev",
    },
    {
      name: "Email",
      href: "mailto:raulantodev@gmail.com",
      icon: Mail,
      tag: "raulantodev@gmail.com",
    },
  ];

  const quickNav = [
    { name: "Inicio", href: "#" },
    { name: "Sobre mí", href: "#sobre-mi" },
    { name: "Proyectos", href: "#proyectos" },
    { name: "Experiencia", href: "#experiencia" },
    { name: "Blog", href: "#blog" },
    { name: "Intereses", href: "#gustos" },
    { name: "Contacto", href: "#contacto" },
  ];

  return (
    <footer className="relative w-full border-t border-border/40 bg-background pt-16 pb-12 overflow-hidden select-none">
      {/* Dynamic Background Effects */}
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-primary/5 dark:bg-primary/10 blur-[140px] rounded-full pointer-events-none -z-10"
      />
      
      {/* Decorative Grid Line Accent */}
      <div 
        aria-hidden 
        className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col gap-12 sm:gap-16">
        
        {/* Top Callout Card / Email Action */}
        <div className="relative group overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-card/90 via-card/50 to-muted/20 p-8 sm:p-12 shadow-2xl shadow-black/5 dark:shadow-black/30 backdrop-blur-xl transition-all duration-500 hover:border-primary/40">
          <div 
            aria-hidden
            className="absolute -right-20 -bottom-20 size-80 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700 pointer-events-none" 
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-medium w-fit">
                <span className="relative flex size-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full size-2 bg-primary"></span>
                </span>
                Disponible para proyectos y colaboraciones
              </div>
              
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
                ¿Construimos algo <span className="font-serif italic font-normal text-primary">extraordinario</span>?
              </h3>
              
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Ya sea software de alta escala, arquitectura limpia o modelos de datos. Mi bandeja de entrada siempre está abierta.
              </p>
            </div>

            {/* Email pill & button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              <button
                onClick={copyEmail}
                className="group/copy flex items-center justify-between gap-4 px-5 py-4 rounded-2xl bg-muted/50 hover:bg-muted border border-border/60 text-sm font-mono transition-all duration-300 active:scale-[0.98]"
              >
                <span className="text-foreground font-medium truncate">raulantodev@gmail.com</span>
                <div className="flex items-center justify-center size-8 rounded-lg bg-background border border-border/80 text-muted-foreground group-hover/copy:text-primary transition-colors">
                  {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
                </div>
              </button>

              <a
                href="mailto:raulantodev@gmail.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <Mail className="size-4" />
                <span>Enviar correo</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 pt-4">
          
          {/* Brand & Status Column */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="relative size-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center p-1.5 shadow-md">
                <Image
                  src="/logo.svg"
                  alt="Logo Raúl Antón"
                  width={32}
                  height={32}
                  className="size-7 object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-foreground">
                  Raúl Antonio
                </span>
                <span className="text-xs font-mono text-muted-foreground">
                  Software Architect & Full Stack Engineer
                </span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              Especializado en Arquitectura Hexagonal, Domain-Driven Design y ciencia de datos. Construyendo productos digitales confiables desde México.
            </p>

            {/* Live Clock / Location Pill */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-muted/40 border border-border/50 text-xs font-mono w-fit mt-1">
              <div className="flex items-center gap-1.5 text-emerald-500">
                <span className="relative size-2 rounded-full bg-emerald-500" />
                <span>CDMX (UTC-6)</span>
              </div>
              <span className="text-border">|</span>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Terminal className="size-3.5" />
                <span>{time || "--:--:--"}</span>
              </div>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-bold">
              Navegación
            </h4>
            <ul className="flex flex-col gap-2.5">
              {quickNav.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 inline-flex items-center gap-2 transition-all duration-200"
                  >
                    <span className="size-1 rounded-full bg-primary/40" />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links Column */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-bold">
              Conecta conmigo
            </h4>
            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-3 rounded-2xl bg-muted/30 hover:bg-muted/70 border border-border/40 hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-xl bg-background flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors border border-border/50">
                        <Icon className="size-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                          {link.name}
                        </span>
                        <span className="text-xs font-mono text-muted-foreground">
                          {link.tag}
                        </span>
                      </div>
                    </div>
                    <Sparkles className="size-4 text-muted-foreground/30 group-hover:text-primary group-hover:rotate-12 transition-all" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar & Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-border/30 text-xs text-muted-foreground">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span>© {new Date().getFullYear()} Raúl Antonio.</span>
            <span className="hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1 font-mono">
              Hecho con <Heart className="size-3 text-red-500 fill-red-500 animate-pulse" /> y
              <Cpu className="size-3 text-primary" /> Arch Linux
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-muted-foreground/70">
              Next.js 15 • Tailwind • TypeScript
            </span>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground border border-border/60 transition-all duration-300 active:scale-95"
              aria-label="Volver arriba"
            >
              <span className="font-mono text-xs">Arriba</span>
              <ArrowUp className="size-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
