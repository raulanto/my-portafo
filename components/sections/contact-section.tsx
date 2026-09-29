import AceternityButton from "@/components/ui/AceternityButton";
import { Send, ArrowUpRight } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contacto" className="scroll-mt-28 flex flex-col gap-6 rounded-3xl bg-muted/30 border border-border/50 p-8 sm:p-12 text-center items-center">
      <div className="p-3 rounded-2xl bg-primary/10 text-primary mb-2">
        <Send className="size-6" />
      </div>
      <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
        ¿Tienes una <span className="font-serif italic font-normal text-primary">idea o proyecto</span> en mente?
      </h2>
      <p className="text-base sm:text-xl text-muted-foreground font-serif italic max-w-lg leading-relaxed">
        Estoy disponible para colaborar en proyectos desafiantes y crear interfaces excepcionales.
      </p>
      <AceternityButton size="lg" variant="primary" className="mt-2 gap-2">
        Enviar Mensaje
        <ArrowUpRight className="size-4" />
      </AceternityButton>
    </section>
  );
}
