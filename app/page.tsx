import { Button } from "@/components/ui/button";
import { ArrowDown, Code2, Briefcase, BookOpen, User, Heart, Sparkles, Send } from "lucide-react";

export default function Home() {
  return (
    <main className="pt-28 sm:pt-36 pb-20 px-4 sm:px-6 max-w-5xl mx-auto flex flex-col gap-24 sm:gap-32">
      {/* Hero Section */}
      <section className="flex flex-col items-start gap-6 py-8 sm:py-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/80 border border-border/50 text-xs font-medium text-muted-foreground">
          <Sparkles className="size-3.5 text-primary" />
          Software Engineer & Frontend Specialist
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground max-w-3xl leading-[1.1]">
          Construyendo experiencias digitales <span className="text-muted-foreground font-normal">fluidas, elegantes y de alto rendimiento.</span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Diseño e implemento aplicaciones web modernas combinando principios de animación limpia, arquitectura sólida e interfaces intuitivas.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a href="#proyectos">
            <Button size="lg" className="rounded-full gap-2">
              Ver Proyectos
              <ArrowDown className="size-4" />
            </Button>
          </a>
          <a href="#sobre-mi">
            <Button variant="outline" size="lg" className="rounded-full">
              Sobre mí
            </Button>
          </a>
        </div>
      </section>

      {/* Proyectos Section Placeholder */}
      <section id="proyectos" className="scroll-mt-28 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <Code2 className="size-5" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Proyectos Destacados</h2>
            <p className="text-sm text-muted-foreground">Una selección de mis trabajos y experimentos recientes.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="p-6 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-border transition-colors">
            <span className="text-xs font-mono text-muted-foreground">01 / Featured</span>
            <h3 className="text-xl font-semibold mt-2">Plataforma Web Interactiva</h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              Próximamente: Detalle del proyecto, tecnologías usadas y demostración visual.
            </p>
          </div>
          <div className="p-6 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-border transition-colors">
            <span className="text-xs font-mono text-muted-foreground">02 / Open Source</span>
            <h3 className="text-xl font-semibold mt-2">Design System & Component Library</h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              Próximamente: Biblioteca de componentes accesibles creados con Tailwind y React.
            </p>
          </div>
        </div>
      </section>

      {/* Experiencia Section Placeholder */}
      <section id="experiencia" className="scroll-mt-28 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <Briefcase className="size-5" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Experiencia Profesional</h2>
            <p className="text-sm text-muted-foreground">Trayectoria en desarrollo de software y producto.</p>
          </div>
        </div>
        <div className="p-6 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm">
          <p className="text-sm text-muted-foreground">Sección en construcción: Historial laboral, roles e impacto.</p>
        </div>
      </section>

      {/* Blog Section Placeholder */}
      <section id="blog" className="scroll-mt-28 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <BookOpen className="size-5" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Blog & Artículos</h2>
            <p className="text-sm text-muted-foreground">Pensamientos sobre frontend, UI/UX y desarrollo web.</p>
          </div>
        </div>
        <div className="p-6 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm">
          <p className="text-sm text-muted-foreground">Sección en construcción: Publicaciones y reflexiones técnicas.</p>
        </div>
      </section>

      {/* Sobre mí Section Placeholder */}
      <section id="sobre-mi" className="scroll-mt-28 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <User className="size-5" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Sobre Mí</h2>
            <p className="text-sm text-muted-foreground">Quién soy, mi filosofía de trabajo y valores.</p>
          </div>
        </div>
        <div className="p-6 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm">
          <p className="text-sm text-muted-foreground">Sección en construcción: Biografía personal y trasfondo.</p>
        </div>
      </section>

      {/* Gustos Section Placeholder */}
      <section id="gustos" className="scroll-mt-28 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <Heart className="size-5" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Intereses & Gustos</h2>
            <p className="text-sm text-muted-foreground">Tecnologías preferidas, pasatiempos e inspiraciones.</p>
          </div>
        </div>
        <div className="p-6 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm">
          <p className="text-sm text-muted-foreground">Sección en construcción: Stack favorito, música, herramientas y pasatiempos.</p>
        </div>
      </section>

      {/* Contacto Section */}
      <section id="contacto" className="scroll-mt-28 flex flex-col gap-6 py-8 rounded-3xl bg-muted/30 border border-border/50 p-8 sm:p-12 text-center items-center">
        <div className="p-3 rounded-2xl bg-primary/10 text-primary mb-2">
          <Send className="size-6" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight">¿Tienes una idea o proyecto en mente?</h2>
        <p className="text-muted-foreground max-w-md">
          Estoy disponible para colaborar en proyectos desafiantes y crear interfaces excepcionales.
        </p>
        <Button size="lg" className="rounded-full gap-2 mt-2">
          Enviar Mensaje
          <Send className="size-4" />
        </Button>
      </section>
    </main>
  );
}
