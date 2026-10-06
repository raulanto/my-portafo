import { ScrollTextReveal } from "@/components/ui/scroll-text-reveal";
import { TextReveal } from "@/components/ui/text-reveal";

export function InterestsSection() {
  return (
    <section id="gustos" className="scroll-mt-24 sm:scroll-mt-28 flex flex-col gap-6 sm:gap-10">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-border/20 pb-6 sm:pb-8">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase">
            <span>06 / GUSTOS &amp; INTERESES</span>
          </div>
          <span className="text-[11px] sm:text-xs font-mono text-muted-foreground">
            Lo que me define fuera del trabajo
          </span>
        </div>

        <ScrollTextReveal tag="h2" className="text-3xl sm:text-6xl md:text-7xl font-black tracking-tight text-foreground leading-[1.08]">
          Más allá del{" "}
          <span className="font-serif italic font-normal text-primary text-[0.95em]">
            código limpio.
          </span>
        </ScrollTextReveal>
      </div>

      {/* Editorial prose */}
      <div className="max-w-3xl flex flex-col gap-6 sm:gap-8 text-sm sm:text-lg text-muted-foreground leading-[1.85]">
        <TextReveal>
          Tengo una obsesión tranquila con la arquitectura de software. Prefiero la hexagonal, el DDD y la separación clara de capas — no como dogma, sino porque cuando el código tiene fronteras bien definidas, escala sin dolor. Lo aplico en Go con gRPC, y documento todo con READMEs estructurados y un CLAUDE.md por proyecto.
        </TextReveal>

        <TextReveal>
          No tengo un stack favorito — tengo criterio. Angular moderno con signals y zoneless para frontends reactivos, NestJS o ASP.NET Core para APIs robustas, Rust con Axum cuando necesito rendimiento sin concesiones, y FastAPI o Go cuando el tiempo importa más que la ceremonia. En móvil, Flutter para apps offline-first.
        </TextReveal>

        <TextReveal>
          Vengo de microcontroladores. PIC, Arduino, ensamblador AVR. Saber cómo funciona el hardware desde dentro cambia la forma en que escribes software — te enseña a tener respeto por los recursos. Sigo con interés ahí, aunque ahora compile para servidores en lugar de chips de 8 bits.
        </TextReveal>

        <TextReveal>
          Me apasiona el fintech mexicano: el ciclo de vida del crédito, el ecosistema regulatorio — CONDUSEF, CNBV. Hay algo particular en hacer software donde los errores tienen consecuencias reales para personas reales. Eso me mantiene honesto.
        </TextReveal>

        <TextReveal>
          Como pasatiempo técnico y de estudio me la paso aprendiendo sobre ciencia de datos y análisis, abarcando todo lo relacionado con procesos ETL / ELT para reconocer el origen exacto de los problemas.
        </TextReveal>

        <TextReveal>
          Mi sistema diario es Arch Linux con Hyprland/Wayland — lo que algunos llaman Omarchy.
        </TextReveal>
      </div>

      {/* Pull quote */}
      <blockquote className="border-l-2 border-primary/40 pl-4 sm:pl-6 mt-2">
        <TextReveal className="text-base sm:text-xl font-serif italic text-foreground/80 leading-relaxed">
          "No me enamoro de los frameworks: me apasiona entender las tripas del problema, limpiar el caos de los datos y construir arquitectura que perdure."
        </TextReveal>
      </blockquote>
    </section>
  );
}
