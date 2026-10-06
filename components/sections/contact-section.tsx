"use client";

import React, { useState } from "react";
import { ArrowUpRight, Phone, Mail, Copy, Check } from "lucide-react";
import { ScrollTextReveal } from "@/components/ui/scroll-text-reveal";
import { motion } from "motion/react";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = "raulantodev@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contacto"
      className="scroll-mt-24 sm:scroll-mt-28 relative overflow-hidden rounded-3xl sm:rounded-4xl p-6 sm:p-14 text-center flex flex-col items-center gap-6 sm:gap-8 backdrop-blur-xl border border-border/30 bg-card/30"
    >
      {/* Top Status Tag */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-background/60 dark:bg-background/40 backdrop-blur-md text-[11px] sm:text-xs font-semibold tracking-wide text-foreground border border-border/40"
      >
        <span className="relative flex size-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
        </span>
        <span className="text-muted-foreground">07 / Respuesta rápida &bull;</span>
        <span className="text-foreground">Disponible para nuevos proyectos</span>
      </motion.div>

      {/* Main Heading */}
      <div className="flex flex-col items-center gap-2.5 sm:gap-3 max-w-3xl px-2">
        <ScrollTextReveal tag="h2" className="text-2xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground leading-[1.12]">
          ¿Tienes una <span className="font-serif italic font-normal text-primary">idea o proyecto</span> en mente?
        </ScrollTextReveal>
        <p className="text-sm sm:text-xl text-muted-foreground font-serif italic max-w-xl leading-relaxed">
          Escríbeme para colaborar en proyectos desafiantes, arquitecturas escalables o desarrollo de software a medida.
        </p>
      </div>

      {/* Action Buttons Grid */}
      <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mt-2">
        {/* Email Card */}
        <div className="group relative flex flex-col justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-background/60 dark:bg-background/30 hover:bg-background/90 dark:hover:bg-background/50 border border-border/40 transition-colors duration-300 text-left backdrop-blur-md shadow-sm">
          <div className="flex items-center justify-between">
            <div className="p-2.5 sm:p-3 rounded-xl bg-primary/10 text-primary">
              <Mail className="size-5" />
            </div>
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/60 hover:bg-muted text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer min-h-[36px]"
              title="Copiar correo"
            >
              {copied ? (
                <>
                  <Check className="size-3.5 text-emerald-500" />
                  <span className="text-emerald-500 font-semibold">¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="size-3.5" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>
          <div>
            <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block mb-1">
              Correo Electrónico
            </span>
            <a
              href={`mailto:${email}`}
              className="text-sm sm:text-base font-semibold text-foreground hover:text-primary transition-colors flex items-center gap-1.5 break-all"
            >
              <span>{email}</span>
              <ArrowUpRight className="size-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
            </a>
          </div>
        </div>

        {/* WhatsApp Card */}
        <div className="group relative flex flex-col justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-background/60 dark:bg-background/30 hover:bg-background/90 dark:hover:bg-background/50 border border-border/40 transition-colors duration-300 text-left backdrop-blur-md shadow-sm">
          <div className="flex items-center justify-between">
            <div className="p-2.5 sm:p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Phone className="size-5" />
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-medium font-mono">
              WhatsApp Directo
            </span>
          </div>
          <div>
            <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block mb-1">
              Teléfono / WhatsApp
            </span>
            <a
              href="https://wa.me/529936719807"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm sm:text-base font-semibold text-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <span>+52 993 671 9807</span>
              <ArrowUpRight className="size-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


