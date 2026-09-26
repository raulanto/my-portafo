import { Code2 } from "lucide-react";

export function ProjectsSection() {
  return (
    <section id="proyectos" className="scroll-mt-28 flex flex-col gap-6">
      <div className="flex items-center gap-3 border-b border-border/40 pb-4">
        <div className="p-2.5 rounded-2xl bg-primary/10 text-primary border border-primary/20">
          <Code2 className="size-5" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Proyectos Destacados</h2>
          <p className="text-sm text-muted-foreground">Una selección de mis trabajos y experimentos recientes.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        <div className="p-6 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-border transition-colors">
          <span className="text-xs font-mono text-muted-foreground">01 / Featured</span>
          <h3 className="text-xl font-semibold mt-2 text-foreground">Plataforma Web Interactiva</h3>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            Próximamente: Detalle del proyecto, tecnologías usadas y demostración visual.
          </p>
        </div>
        <div className="p-6 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-border transition-colors">
          <span className="text-xs font-mono text-muted-foreground">02 / Open Source</span>
          <h3 className="text-xl font-semibold mt-2 text-foreground">Design System & Component Library</h3>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            Próximamente: Biblioteca de componentes accesibles creados con Tailwind y React.
          </p>
        </div>
      </div>
    </section>
  );
}
