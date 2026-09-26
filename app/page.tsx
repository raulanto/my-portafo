import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { BlogSection } from "@/components/sections/blog-section";
import { AboutSection } from "@/components/sections/about-section";
import { InterestsSection } from "@/components/sections/interests-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <HeroSection />

      <main className="pb-20 px-4 sm:px-6 max-w-5xl mx-auto flex flex-col gap-24 sm:gap-32 w-full pt-16 relative z-20">
        <ProjectsSection />
        <ExperienceSection />
        <BlogSection />
        <AboutSection />
        <InterestsSection />
        <ContactSection />
      </main>
    </div>
  );
}
