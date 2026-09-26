import { User, Mail, Globe, ExternalLink } from "lucide-react";

const SPECIALIZATIONS = [
  {
    area: "Frontend",
    description:
      "Interfaces dinámicas y accesibles con Vue.js, Angular y Nuxt — priorizando rendimiento y escalabilidad.",
  },
  {
    area: "Backend",
    description:
      "APIs RESTful con Django, Laravel y Go. Diseño de sistemas con integridad de datos y seguridad.",
  },
  {
    area: "Bases de datos",
    description:
      "Modelado relacional y optimización de consultas en PostgreSQL, MySQL y Supabase.",
  },
  {
    area: "DevOps & Tooling",
    description:
      "Flujos de trabajo con Git, Docker, Kubernetes y Postman para entornos productivos.",
  },
];

export function AboutSection() {
  return (
    <section id="sobre-mi" className="scroll-mt-28 flex flex-col gap-10">
      {/* Section Header */}
      <div className="flex items-center gap-3 border-b border-border/40 pb-4">
        <div className="p-2.5 rounded-2xl bg-primary/10 text-primary border border-primary/20">
          <User className="size-5" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Sobre Mí
          </h2>
          <p className="text-sm text-muted-foreground">
            Quién soy, mi stack y mis áreas de especialización.
          </p>
        </div>
      </div>

      {/* Bio */}
      <div className="p-6 sm:p-8 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm">
            RA
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm">Raúl Antonio</p>
            <p className="text-xs text-muted-foreground font-mono">Full Stack Developer</p>
          </div>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Desarrollador Full Stack con experiencia en el diseño, desarrollo e implementación de
          aplicaciones web robustas y escalables, desde el front-end hasta la infraestructura de
          despliegue. Especializado en arquitecturas modernas que integran interfaces reactivas{" "}
          <span className="text-foreground font-medium">
            (Angular con signals y componentes standalone)
          </span>{" "}
          con APIs de alto rendimiento{" "}
          <span className="text-foreground font-medium">
            (NestJS, ASP.NET Core, Go, Rust, FastAPI)
          </span>
          , aplicando principios de{" "}
          <span className="text-foreground font-medium">
            arquitectura hexagonal y diseño orientado al dominio (DDD)
          </span>
          . Enfoque constante en calidad de código, mantenibilidad, experiencia de usuario y
          entrega de soluciones orientadas a resultados de negocio.
        </p>

        {/* Contact links */}
        <div className="flex flex-wrap gap-3 pt-2 border-t border-border/30 mt-2">
          <a
            href="https://portafolio-rauantodev.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Globe className="size-3.5" />
            portafolio-rauantodev.vercel.app
            <ExternalLink className="size-3 opacity-60" />
          </a>
          <a
            href="mailto:raulantodev@gmail.com"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="size-3.5" />
            raulantodev@gmail.com
          </a>
        </div>
      </div>

      {/* Specialization Areas */}
      <div className="flex flex-col gap-4">
        <h3 className="text-base font-semibold text-foreground tracking-tight">
          Áreas de especialización
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SPECIALIZATIONS.map((spec) => (
            <div
              key={spec.area}
              className="p-5 rounded-2xl border border-border/50 bg-card/40 hover:bg-card/70 hover:border-border transition-all duration-200 flex flex-col gap-2"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                {spec.area}
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {spec.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
