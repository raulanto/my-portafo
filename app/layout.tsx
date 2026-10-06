import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0d" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://rauantodev.vercel.app"),
  title: {
    default: "Raúl Antón — Software Engineer & Full Stack Developer",
    template: "%s | Raúl Antón",
  },
  description:
    "Portafolio profesional de Raúl Antón (raulantodev), Ingeniero de Software y Desarrollador Full Stack en México. Especialista en Angular, NestJS, FastAPI, Go, Rust, Django, arquitecturas de datos e IoT.",
  keywords: [
    "Raúl Antón",
    "raulantodev",
    "Software Engineer",
    "Full Stack Developer",
    "Ingeniero de Software México",
    "Villahermosa Tabasco",
    "Angular",
    "NestJS",
    "FastAPI",
    "Go",
    "Golang",
    "Rust",
    "Django",
    "PostgreSQL",
    "WebSockets",
    "Fintech",
    "IoT",
    "Arquitectura de Software",
  ],
  authors: [{ name: "Raúl Antón", url: "https://x.com/raulantodev" }],
  creator: "Raúl Antón (raulantodev)",
  publisher: "Raúl Antón",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://raulantodev.com",
    title: "Raúl Antón — Software Engineer & Full Stack Developer",
    description:
      "Portafolio profesional de Raúl Antón (raulantodev). Proyectos de ingeniería de software, arquitectura de datos, microservicios y soluciones web de alta escala.",
    siteName: "Raúl Antón Portafolio",
    images: [
      {
        url: "/index.png",
        width: 1200,
        height: 630,
        alt: "Raúl Antón — Software Engineer Portafolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raúl Antón — Software Engineer & Full Stack Developer",
    description:
      "Portafolio profesional de Raúl Antón (raulantodev). Proyectos de ingeniería de software, arquitectura de datos y sistemas en tiempo real.",
    creator: "@raulantodev",
    images: ["/index.png"],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  alternates: {
    canonical: "https://raulantodev.com",
  },
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




