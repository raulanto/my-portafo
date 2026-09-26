import { Button } from "@/components/ui/button";
import { Code2, Briefcase, BookOpen, User, Heart, Send, ArrowUpRight } from "lucide-react";
import GradientWaves from "@/components/GradientWaves";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Full-Screen Hero Section with GradientWaves Background */}
      <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">
        {/* GradientWaves as absolute full-screen background */}
        <div className="absolute inset-0" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
          <GradientWaves
            horizonColor="#5227FF"
            waveColor="#FF9FFC"
            crestColor="#FFFFFF"
            speed={0.4}
            amplitude={2.5}
            waveScale={0.6}
            waveRatio={0.9}
            swell={35}
            turbulence={20}
            tilt={1.11}
            zoom={1.0}
            height={5.5}
            fogDepth={15}
            detail="medium"
            brightness={1.0}
            opacity={1.0}
            mouseInteraction={true}
            parallaxStrength={0.5}
            grain={true}
            grainIntensity={0.05}
          />
        </div>

        {/* Hero Content — centered on top of the background */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center text-center gap-7 pt-28 sm:pt-32 pb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-background/80 dark:bg-background/60 backdrop-blur-xl border border-border/60 text-xs font-medium text-foreground shadow-lg">
            <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground font-bold text-[10px] uppercase tracking-wider">
              NEW
            </span>
            <span>Creative Software & Frontend Systems</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground max-w-3xl leading-[1.1]">
            Soft rolling gradient waves fading into haze.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Desarrollo interfaces modernas, interactivas y fluidas combinando WebGL, sistemas de diseño y arquitectura de software.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a href="#proyectos">
              <Button size="lg" className="rounded-2xl font-semibold px-7 py-6 text-sm shadow-xl active:scale-95 transition-transform">
                Ver proyectos
              </Button>
            </a>
            <a href="#contacto">
              <Button size="lg" variant="outline" className="rounded-2xl bg-background/60 hover:bg-muted border-border/60 backdrop-blur-md font-semibold px-7 py-6 text-sm active:scale-95 transition-transform">
                Contacto
              </Button>
            </a>
          </div>
        </div>

        {/* Bottom Fade Mask */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background/60 to-transparent pointer-events-none z-10" />
      </div>

      {/* Main Portfolio Content */}
      <main className="pb-20 px-4 sm:px-6 max-w-5xl mx-auto flex flex-col gap-24 sm:gap-32 w-full pt-16 relative z-20">
        {/* Proyectos Section */}
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

        {/* Experiencia Section */}
        <section id="experiencia" className="scroll-mt-28 flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-border/40 pb-4">
            <div className="p-2.5 rounded-2xl bg-primary/10 text-primary border border-primary/20">
              <Briefcase className="size-5" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Experiencia Profesional</h2>
              <p className="text-sm text-muted-foreground">Trayectoria en desarrollo de software y producto.</p>
            </div>
          </div>
          <div className="p-6 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm">
            <p className="text-sm text-muted-foreground">Sección en construcción: Historial laboral, roles e impacto.</p>
          </div>
        </section>

        {/* Blog Section */}
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

        {/* Sobre mí Section */}
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

        {/* Gustos Section */}
        <section id="gustos" className="scroll-mt-28 flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-border/40 pb-4">
            <div className="p-2.5 rounded-2xl bg-primary/10 text-primary border border-primary/20">
              <Heart className="size-5" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Intereses & Gustos</h2>
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
          <h2 className="text-3xl font-bold tracking-tight text-foreground">¿Tienes una idea o proyecto en mente?</h2>
          <p className="text-muted-foreground max-w-md">
            Estoy disponible para colaborar en proyectos desafiantes y crear interfaces excepcionales.
          </p>
          <Button size="lg" className="rounded-2xl font-semibold gap-2 mt-2">
            Enviar Mensaje
            <ArrowUpRight className="size-4" />
          </Button>
        </section>
      </main>
    </div>
  );
}
