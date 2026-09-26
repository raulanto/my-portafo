import { User } from "lucide-react";

export function AboutSection() {
  return (
    <section id="sobre-mi" className="scroll-mt-28 flex flex-col gap-6">
      <div className="flex items-center gap-3 border-b border-border/40 pb-4">
        <div className="p-2.5 rounded-2xl bg-primary/10 text-primary border border-primary/20">
          <User className="size-5" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Sobre Mí</h2>
          <p className="text-sm text-muted-foreground">Quién soy, mi filosofía de trabajo y valores.</p>
        </div>
      </div>
      <div className="p-6 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm">
        <p className="text-sm text-muted-foreground">Sección en construcción: Biografía personal y trasfondo.</p>
      </div>
    </section>
  );
}
