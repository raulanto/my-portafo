"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Proyectos", href: "#proyectos" },
  { label: "Experiencia", href: "#experiencia" },
  { label: "Blog", href: "#blog" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Gustos", href: "#gustos" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string>("");

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 180 && rect.bottom >= 180;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 border-b border-border/40",
        scrolled
          ? "bg-background/85 dark:bg-background/80 backdrop-blur-2xl backdrop-saturate-150 shadow-md shadow-black/5 dark:shadow-black/20 border-border/60 py-3"
          : "bg-background/60 dark:bg-background/40 backdrop-blur-xl backdrop-saturate-150 py-4"
      )}
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg py-1 transition-opacity hover:opacity-90"
          aria-label="Ir al inicio"
        >
          <div className="flex items-center gap-2.5">
            <span className="font-extrabold text-base tracking-widest uppercase text-foreground group-hover:text-primary transition-colors">
              RAÚL ANTÓN
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold tracking-wide">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              AVAILABLE
            </span>
          </div>
        </Link>

        {/* Centered Floating Pill Navigation (Matching Design Screenshot) */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-1 bg-muted/60 dark:bg-muted/30 p-1.5 rounded-full border border-border/50 backdrop-blur-md shadow-xs"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring flex items-center gap-1",
                  isActive
                    ? "text-foreground bg-background shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/60"
                )}
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="size-3 opacity-60" />}
              </Link>
            );
          })}
        </nav>

        {/* Actions & Get Started Button */}
        <div className="flex items-center gap-3">
          <Link href="#contacto">
            <Button
              size="sm"
              className="rounded-full bg-foreground text-background hover:bg-foreground/90 font-medium text-xs px-5 py-2 h-9 shadow-sm transition-all duration-200 gap-1.5 active:scale-95"
            >
              Hablemos
              <ArrowUpRight className="size-3.5" />
            </Button>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden rounded-full text-muted-foreground hover:text-foreground"
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
        <div className="md:hidden w-full border-t border-border/40 bg-background/95 backdrop-blur-2xl px-6 py-5 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1.5 max-w-7xl mx-auto">
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
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                Disponible para proyectos
              </span>
              <Link href="#contacto" onClick={() => setMobileMenuOpen(false)}>
                <Button size="sm" variant="outline" className="rounded-full text-xs px-4">
                  Contacto
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
