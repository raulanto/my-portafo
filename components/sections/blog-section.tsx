import { BookOpen } from "lucide-react";

export function BlogSection() {
  return (
    <section id="blog" className="scroll-mt-28 flex flex-col gap-6">
      <div className="flex items-center gap-3 border-b border-border/40 pb-4">
        <div className="p-2.5 rounded-2xl bg-primary/10 text-primary border border-primary/20">
          <BookOpen className="size-5" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Blog & Artículos</h2>
          <p className="text-sm text-muted-foreground">Pensamientos sobre frontend, UI/UX y desarrollo web.</p>
        </div>
      </div>
      <div className="p-6 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm">
        <p className="text-sm text-muted-foreground">Sección en construcción: Publicaciones y reflexiones técnicas.</p>
      </div>
    </section>
  );
}
