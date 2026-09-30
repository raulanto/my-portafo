import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navigation } from "@/components/navigation";
import CircularThemeProvider from "@/components/ui/CircularThemeProvider";
import { LocomotiveScrollProvider } from "@/components/providers/locomotive-scroll-provider";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Raúl Antón | Software Engineer Portfolio",
  description: "Portafolio personal de Raúl Antón: proyectos, experiencia, blog y tecnología.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={cn(
        "scroll-smooth antialiased",
        geist.variable,
        geistMono.variable,
        inter.variable,
        playfair.variable,
        "font-sans"
      )}
    >
      <body className="bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        <CircularThemeProvider>
          <LocomotiveScrollProvider>
            <Navigation />
            <div className="w-full">{children}</div>
          </LocomotiveScrollProvider>
        </CircularThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}




