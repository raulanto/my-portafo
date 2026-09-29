"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import AceternityButton from "@/components/ui/AceternityButton";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowUpRight, Sun, Moon } from "lucide-react";
import { useCircularTheme } from "@/components/ui/CircularThemeProvider";

interface NavItem {
  label: string;
  href: string;
  index: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Sobre mí",    href: "#sobre-mi",   index: "01" },
  { label: "Tecnologías", href: "#tecnologias", index: "02" },
  { label: "Proyectos",   href: "#proyectos",   index: "03" },
  { label: "Experiencia", href: "#experiencia", index: "04" },
  { label: "Blog",        href: "#blog",        index: "05" },
  { label: "Gustos",      href: "#gustos",      index: "06" },
];

function ThemeToggle() {
  const { triggerTransition, isAnimating, theme } = useCircularTheme();
  return (
    <button
      disabled={isAnimating}
      onClick={(e) => triggerTransition(e)}
      className="inline-flex items-center justify-center size-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 active:scale-90 outline-none cursor-pointer"
      aria-label="Cambiar tema de color"
    >
      {theme === "dark" ? (
        <Sun className="size-4 text-amber-400 animate-in fade-in zoom-in-75 duration-200" />
      ) : (
        <Moon className="size-4 text-slate-600 animate-in fade-in zoom-in-75 duration-200" />
      )}
    </button>
  );
}

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string>("");
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [scrolled, setScrolled] = React.useState(false);

  // Refs for the sliding pill
  const navRef = React.useRef<HTMLElement>(null);
  const linkRefs = React.useRef<(HTMLAnchorElement | null)[]>([]);
  const [pillStyle, setPillStyle] = React.useState<React.CSSProperties>({});

  React.useEffect(() => {
    const handleScroll = () => {
      // Active section detection
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });
      if (current) setActiveSection(current);

      // Scrolled past hero threshold
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 80);

      // Scroll progress
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update sliding pill position
  React.useEffect(() => {
    const targetIndex =
      hoveredIndex !== null
        ? hoveredIndex
        : NAV_ITEMS.findIndex((item) => item.href.substring(1) === activeSection);

    const el = linkRefs.current[targetIndex];
    const nav = navRef.current;

    if (el && nav && targetIndex >= 0) {
      const navRect = nav.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setPillStyle({
        left: elRect.left - navRect.left,
        width: elRect.width,
        opacity: 1,
      });
    } else {
      setPillStyle({ opacity: 0 });
    }
  }, [hoveredIndex, activeSection]);

  return (
    <header className="fixed top-6 inset-x-0 z-50 flex flex-col items-center justify-center px-4 sm:px-6 pointer-events-none">
      <div
        className={cn(
          "pointer-events-auto w-full max-w-5xl px-5 sm:px-6 py-2.5 flex items-center justify-between gap-4 relative overflow-hidden transition-all duration-500",
          scrolled
            ? "rounded-full bg-background/80 dark:bg-background/70 backdrop-blur-2xl border border-border/60 shadow-xl shadow-black/5 dark:shadow-black/20"
            : "rounded-full bg-transparent border border-transparent shadow-none"
        )}
      >

        {/* Scroll progress bar — only visible after scrolling */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 h-[2px] bg-primary/40 rounded-full transition-all duration-150"
          style={{ width: `${scrollProgress * 100}%`, opacity: scrolled ? 1 : 0 }}
        />

        {/* Brand / Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full transition-opacity hover:opacity-90 shrink-0"
          aria-label="Ir al inicio"
        >
          <div className="relative size-7 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
            <Image
              src="/logo.svg"
              alt="Logo Raúl Antón"
              width={28}
              height={28}
              className="size-7 object-contain"
              priority
            />
          </div>
          <span className="font-semibold text-sm tracking-tight text-foreground group-hover:text-primary transition-colors">
            Raúl Antón
          </span>

          {/* Availability dot — only on large screens */}
          <span className="hidden lg:flex items-center gap-1 ml-0.5">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">disponible</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          ref={navRef}
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-0.5 relative"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Sliding pill — only visible when nav has background */}
          <div
            aria-hidden
            className="absolute top-0 bottom-0 rounded-full bg-muted transition-all duration-200 ease-out pointer-events-none"
            style={{ ...pillStyle, opacity: scrolled ? (pillStyle.opacity as number ?? 1) : 0 }}
          />

          {NAV_ITEMS.map((item, i) => {
            const isActive = activeSection === item.href.substring(1);
            const isHovered = hoveredIndex === i;
            return (
              <Link
                key={item.href}
                href={item.href}
                ref={(el) => { linkRefs.current[i] = el; }}
                onMouseEnter={() => setHoveredIndex(i)}
                className={cn(
                  "relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors duration-150 outline-none flex items-center gap-1.5 select-none",
                  isActive || isHovered
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {/* Index number revealed on hover/active */}
                <span
                  className="font-mono text-[9px] tabular-nums text-primary/60 leading-none transition-all duration-200"
                  style={{
                    opacity: isHovered || isActive ? 1 : 0,
                    width: isHovered || isActive ? "1.5ch" : "0",
                    overflow: "hidden",
                  }}
                >
                  {item.index}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <ThemeToggle />

          <AceternityButton
            href="#contacto"
            size="sm"
            variant="primary"
            className="rounded-full"
          >
            Hablemos
          </AceternityButton>

          <button
            className="md:hidden inline-flex items-center justify-center size-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 active:scale-90 outline-none cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileMenuOpen ? (
              <X className="size-5 animate-in spin-in-90 duration-150" />
            ) : (
              <Menu className="size-5 animate-in fade-in duration-150" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto w-full max-w-4xl mt-3 rounded-3xl border border-border/60 bg-background/95 backdrop-blur-2xl p-5 shadow-2xl animate-in fade-in-0 slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="group flex items-center justify-between px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/60 rounded-2xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-muted-foreground tabular-nums">{item.index}</span>
                  <span>{item.label}</span>
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between px-2">
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                Disponible para proyectos
              </span>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <AceternityButton
                  href="#contacto"
                  size="sm"
                  variant="primary"
                  className="rounded-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contacto
                </AceternityButton>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
