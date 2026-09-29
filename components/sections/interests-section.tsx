export function InterestsSection() {
  return (
    <section id="gustos" className="scroll-mt-28 flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-border/20 pb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold tracking-wider uppercase">
            <span>05 / GUSTOS &amp; INTERESES</span>
          </div>
          <span className="text-xs font-mono text-muted-foreground">
            Lo que me define fuera del trabajo
          </span>
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-foreground leading-[1.05]">
          Más allá del{" "}
          <span className="font-serif italic font-normal text-primary text-[0.95em]">
            código limpio.
          </span>
        </h2>
      </div>

      {/* Editorial prose */}
      <div className="max-w-3xl flex flex-col gap-6 text-base sm:text-lg text-muted-foreground leading-[1.85]">
        <p>
          Tengo una obsesión tranquila con la{" "}
          <strong className="text-foreground font-semibold">arquitectura de software</strong>. Prefiero
          la hexagonal, el DDD y la separación clara de capas — no como dogma, sino porque cuando el
          código tiene fronteras bien definidas, escala sin dolor. Lo aplico en Go con gRPC, y documento
          todo con READMEs estructurados y un{" "}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded bg-muted text-foreground">CLAUDE.md</code>{" "}
          por proyecto.
        </p>

        <p>
          No tengo un stack favorito — tengo criterio. Angular moderno con signals y zoneless para
          frontends reactivos, NestJS o ASP.NET Core para APIs robustas,{" "}
          <strong className="text-foreground font-semibold">Rust con Axum</strong> cuando necesito
          rendimiento sin concesiones, y FastAPI o Go cuando el tiempo importa más que la ceremonia.
          En móvil, Flutter para apps offline-first.
        </p>

        <p>
          Vengo de microcontroladores. PIC, Arduino, ensamblador AVR. Saber cómo funciona el hardware
          desde dentro cambia la forma en que escribes software — te enseña a tener{" "}
          <em className="text-foreground">respeto por los recursos</em>. Sigo con interés ahí,
          aunque ahora compile para servidores en lugar de chips de 8 bits.
        </p>

        <p>
          Me apasiona el{" "}
          <strong className="text-foreground font-semibold">fintech mexicano</strong>: el ciclo de vida
          del crédito, el ecosistema regulatorio — CONDUSEF, CNBV. Hay algo particular en hacer
          software donde los errores tienen consecuencias reales para personas reales. Eso me mantiene
          honesto.
        </p>

        <p>
          Como pasatiempo técnico y de estudio me la paso aprendiendo sobre{" "}
          <strong className="text-foreground font-semibold">ciencia de datos y análisis</strong>, abarcando
          todo lo relacionado con procesos <strong className="text-foreground font-semibold">ETL / ELT</strong> para
          reconocer el origen exacto de los problemas.
        </p>

        <p>
          Mi sistema diario es{" "}
          <strong className="text-foreground font-semibold">Arch Linux con Hyprland/Wayland</strong>{" "}
          — lo que algunos llaman Omarchy. 
        </p>
      </div>

      {/* Pull quote */}
      <blockquote className="border-l-2 border-primary/40 pl-6 mt-2">
        <p className="text-lg sm:text-xl font-serif italic text-foreground/80 leading-relaxed">
          "No me enamoro de los frameworks: me apasiona entender las tripas del problema, limpiar el caos de los datos y construir arquitectura que perdure."
        </p>
      </blockquote>
    </section>
  );
}
