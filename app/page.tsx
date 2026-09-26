import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { TechStackSection } from "@/components/sections/tech-stack-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { BlogSection } from "@/components/sections/blog-section";
import { InterestsSection } from "@/components/sections/interests-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <HeroSection />

      <main className="flex flex-col w-full relative z-20">
        {/* About Section right after Head/Hero */}
        <div className="pt-16 pb-12 px-4 sm:px-6 max-w-5xl mx-auto w-full">
          <AboutSection />
        </div>

        {/* Full-screen immersive Tech Orbit Section */}
        <TechStackSection />

        {/* Contained main sections */}
        <div className="pb-20 px-4 sm:px-6 max-w-5xl mx-auto flex flex-col gap-24 sm:gap-32 w-full pt-16">
          <ProjectsSection />
          <ExperienceSection />
          <BlogSection />
          <InterestsSection />
          <ContactSection />
        </div>
      </main>
    </div>
  );
}

