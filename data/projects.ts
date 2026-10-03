export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  github?: string;
  demo?: string;
  url?: string;
  description?: string;
}

export const ALL_PROJECTS: ProjectItem[] = [
  {
    id: "dynamic-filter-board",
    title: "Dynamic Filter Board",
    category: "Full Stack",
    github: "https://github.com/raulantodev",
    demo: "https://github.com/raulantodev",
    url: "https://dynamicfilterboard.vercel.app/",
  },
  {
    id: "iot-telemetry",
    title: "IoT Telemetry Platform",
    category: "Backend",
    github: "https://github.com/raulantodev",
    url: "https://proyecto-front-sensores.vercel.app/login",
  },
  {
    id: "sql-django-orm",
    title: "SQL → Django ORM Engine",
    category: "Tools",
    github: "https://github.com/raulantodev",
    url: "https://create-model-django-migrate.vercel.app",
  },
  {
    id: "Api Punto de Venta",
    title: "API Sistema POS",
    category: "Backend",
    github: "https://github.com/raulantodev",
    url: "https://github.com/raulanto/api-pos",
  },
  {
    id: "ApiBase",
    title: "ApiBase — Plantilla DRF",
    category: "Backend",
    github: "https://github.com/raulantodev",
    url: "https://github.com/raulanto/ApiBase",
  },
  {
    id: "api-file-upload",
    title: "API Carga de Archivos",
    category: "Backend",
    github: "https://github.com/raulantodev",
    url: "https://github.com/raulanto/ApiFiles",
  },
  {
    id: "GestionObras",
    title: "Sistema Gestión Obras",
    category: "Full Stack",
    github: "https://github.com/raulantodev",
    url: "https://github.com/raulanto/SistemaGestioncv",
  },
  {
    id: "interactive-dashboard",
    title: "Dashboard Interactivo",
    category: "Frontend",
    github: "https://github.com/raulantodev",
    url: "https://dashboard-interactivo-three.vercel.app/board",
  },
  {
    id: "Frontend Punto de Venta",
    title: "E-commerce",
    category: "Frontend",
    github: "https://github.com/raulantodev",
    url: "https://github.com/raulanto/app-sistemapos",
  },
  {
    id: "expense-tracker",
    title: "Gestor de Gastos",
    category: "Mobile",
    github: "https://github.com/raulanto/gestor_gastos",
    url: "https://github.com/raulanto/gestor_gastos",
  },
  {
    id: "calculadora-div-graf",
    title: "Calculadora División con Gráficos",
    category: "Full Stack",
    github: "https://github.com/raulantodev",
    url: "https://calculadora-div-graf.vercel.app",
  },
  {
    id: "Frontend Ordenes",
    title: "Herramienta de Mapa",
    category: "Full Stack",
    github: "https://github.com/raulantodev",
    url: "https://fro-corden.vercel.app/",
  },
  {
    id: "Algoritmos de Búsqueda de Caminos",
    title: "Algoritmos de Búsqueda de Caminos",
    category: "Frontend",
    github: "https://github.com/raulantodev",
    url: "https://shortpath-algorithm.vercel.app/",
  },
  {
    id: "Sistema de Arquitectura Hexagonal",
    title: "Calculadora de Divisiones",
    category: "Frontend",
    github: "https://github.com/raulantodev",
    url: "https://calculadora-div.vercel.app",
  },
  {
    id: "CLI Forja",
    title: "Forja Rust",
    category: "CLI",
    github: "https://github.com/raulantodev",
    url: "https://github.com/raulanto/forja-rust",
  },
  {
    id: "pdf-viewer",
    title: "PDF View",
    category: "GUI",
    github: "https://github.com/raulantodev",
    url: "https://github.com/raulanto/pdf-view",
  },
];
