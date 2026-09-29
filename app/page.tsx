import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { TechStackSection } from "@/components/sections/tech-stack-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { AllProjectsSection } from "@/components/sections/all-projects-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { BlogSection } from "@/components/sections/blog-section";
import { InterestsSection } from "@/components/sections/interests-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Footer } from "@/components/sections/footer";
import TextOnPathScroll from "@/components/ui/TextOnPathScroll";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <HeroSection />

      {/* Compact & Subtle TextOnPathScroll Transition between Hero & About */}
      <div className="relative w-full overflow-hidden pointer-events-none -my-8 z-10 opacity-30 dark:opacity-20 text-primary">
        <TextOnPathScroll
          text="RAÚL ANTONIO • FULL STACK DEVELOPER • ARQUITECTURA HEXAGONAL • NUXT & DJANGO • FASTAPI & VUE • DDD & APIS • "
          className="h-[25vh] sm:h-[35vh] w-full"
          scrollOffsets={[200, -1400]}
          textProps={{
            fontSize: "28",
            fontWeight: "700",
            fill: "currentColor",
            className: "tracking-wider text-primary uppercase font-mono",
          }}
        />
      </div>

      <main className="flex flex-col w-full relative z-20">
        {/* About Section right after Head/Hero */}
        <div className="pt-8 pb-12 px-2 sm:px-6 max-w-7xl mx-auto w-full">
          <AboutSection />
        </div>

        {/* Full-screen immersive Tech Orbit Section */}
        <TechStackSection />

        {/* Contained main sections */}
        <div className="pb-20 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col gap-24 sm:gap-32 w-full pt-16">
          <ProjectsSection />
          <AllProjectsSection />
          <ExperienceSection />
          <BlogSection />
          <InterestsSection />
          <ContactSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
