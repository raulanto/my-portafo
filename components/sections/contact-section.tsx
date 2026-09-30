import AceternityButton from "@/components/ui/AceternityButton";
import { Send, ArrowUpRight, Phone, Mail } from "lucide-react";
import { ScrollTextReveal } from "@/components/ui/scroll-text-reveal";

export function ContactSection() {
  return (
    <section id="contacto" className="scroll-mt-28 flex flex-col gap-6 rounded-3xl bg-muted/30 border border-border/50 p-8 sm:p-12 text-center items-center">
      <div className="p-3 rounded-2xl bg-primary/10 text-primary mb-2">
        <Send className="size-6" />
      </div>
      <ScrollTextReveal tag="h2" className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
        ¿Tienes una <span className="font-serif italic font-normal text-primary">idea o proyecto</span> en mente?
      </ScrollTextReveal>
      <p className="text-base sm:text-xl text-muted-foreground font-serif italic max-w-lg leading-relaxed">
        Estoy disponible para colaborar en proyectos desafiantes y crear interfaces excepcionales.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
        <AceternityButton
          href="mailto:raulantodev@gmail.com"
          size="lg"
          variant="primary"
          className="gap-2"
        >
          <Mail className="size-4" />
          <span>Enviar Correo</span>
          <ArrowUpRight className="size-4" />
        </AceternityButton>

        <a
          href="https://wa.me/529936719807"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/30 text-sm transition-all hover:scale-105 active:scale-95"
        >
          <Phone className="size-4" />
          <span>+52 993 671 9807</span>
        </a>
      </div>
    </section>
  );
}
