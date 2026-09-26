"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowUpRight, Sun, Moon, Sparkles } from "lucide-react";
import { useCircularTheme } from "@/components/ui/CircularThemeProvider";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Proyectos", href: "#proyectos" },
  { label: "Experiencia", href: "#experiencia" },
  { label: "Blog", href: "#blog" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Gustos", href: "#gustos" },
];

function ThemeToggle() {
  const { triggerTransition, isAnimating, theme } = useCircularTheme();

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      disabled={isAnimating}
      onClick={(e) => triggerTransition(e)}
      className="rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 active:scale-90"
      aria-label="Cambiar tema de color"
    >
      {theme === "dark" ? (
        <Sun className="size-4 text-amber-400 animate-in fade-in zoom-in-75 duration-200" />
      ) : (
        <Moon className="size-4 text-slate-700 animate-in fade-in zoom-in-75 duration-200" />
      )}
    </Button>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string>("");

  React.useEffect(() => {
    const handleScroll = () => {
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
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-5 left-0 right-0 z-50 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto rounded-full bg-background/80 dark:bg-background/60 backdrop-blur-2xl border border-border/60 px-5 sm:px-6 py-2.5 shadow-lg shadow-black/5 dark:shadow-black/20 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full transition-opacity hover:opacity-90"
          aria-label="Ir al inicio"
        >
          <div className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary font-mono text-xs font-bold border border-primary/20 group-hover:scale-105 transition-transform">
            <Sparkles className="size-3.5 text-primary" />
          </div>
          <span className="font-semibold text-sm tracking-tight text-foreground group-hover:text-primary transition-colors">
            Raúl Antón
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-1 sm:gap-1.5"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 outline-none",
                  isActive
                    ? "text-foreground bg-muted font-semibold shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions, Theme Toggle & CTA Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          <Link href="#contacto">
            <Button
              size="sm"
              className="rounded-full font-semibold text-xs px-5 py-2 h-9 shadow-sm transition-all duration-200 active:scale-95"
            >
              Hablemos
            </Button>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden max-w-4xl mx-auto mt-3 rounded-3xl border border-border/60 bg-background/95 backdrop-blur-2xl p-5 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-200">
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/60 rounded-2xl transition-colors"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="size-4 text-muted-foreground" />
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between px-2">
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                Disponible para proyectos
              </span>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <Link href="#contacto" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="sm" className="rounded-full font-semibold text-xs px-4">
                    Contacto
                  </Button>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
