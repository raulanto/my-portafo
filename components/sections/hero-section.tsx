import GradientWaves from "@/components/GradientWaves";
import AceternityButton from "@/components/ui/AceternityButton";

export function HeroSection() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">
      {/* GradientWaves as absolute full-screen background */}
      <div className="absolute inset-0">
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
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Disponible para proyectos</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground max-w-3xl leading-[1.1]">
          Raúl Antonio{" "}
          <span className="block text-primary text-3xl sm:text-4xl font-semibold mt-2 tracking-wide">
            Full Stack Developer
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Diseño, desarrollo e implemento aplicaciones web robustas — desde interfaces reactivas hasta APIs de alto rendimiento. Arquitectura hexagonal, DDD y entrega orientada a resultados.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <AceternityButton href="#proyectos" size="lg" variant="primary">
            Ver proyectos
          </AceternityButton>
          <AceternityButton href="#contacto" size="lg" variant="outline">
            Contacto
          </AceternityButton>
        </div>
      </div>

      {/* Bottom Fade Mask */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background/60 to-transparent pointer-events-none z-10" />
    </div>
  );
}
