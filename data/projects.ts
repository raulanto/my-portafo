export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  github?: string;
  demo?: string;
  url?: string;
  description: string;
  tech: string[];
  highlight?: string;
  featured?: boolean;
  accent?: string;
}

export const ALL_PROJECTS: ProjectItem[] = [
  {
    id: "dynamic-filter-board",
    title: "Dynamic Filter Board",
    category: "Full Stack",
    description:
      "Tablero interactivo y reactivo con filtrado multifacético, debounce adaptativo y persistencia de estado en tiempo real.",
    tech: ["Vue 3", "TypeScript", "TailwindCSS", "Pinia"],
    highlight: "Filtros en Vivo",
    featured: true,
    github: "https://github.com/raulantodev",
    demo: "https://dynamicfilterboard.vercel.app/",
    url: "https://dynamicfilterboard.vercel.app/",
    accent: "blue",
  },
  {
    id: "iot-telemetry",
    title: "IoT Telemetry Platform",
    category: "Backend",
    description:
      "Plataforma de alta concurrencia diseñada para ingesta masiva y análisis de flujos de sensores industriales con alertas automatizadas.",
    tech: ["Go", "FastAPI", "TimescaleDB", "Docker"],
    highlight: "Alta Concurrencia",
    featured: true,
    github: "https://github.com/raulantodev",
    url: "https://proyecto-front-sensores.vercel.app/login",
    demo: "https://proyecto-front-sensores.vercel.app/login",
    accent: "emerald",
  },
  {
    id: "sql-django-orm",
    title: "SQL → Django ORM Engine",
    category: "Tools",
    description:
      "Motor inteligente de análisis AST que transquila consultas SQL complejas (JOINs, Window Functions) a modelos y queries optimizados en Django.",
    tech: ["Python", "AST Parser", "Django", "React"],
    highlight: "AST Transpiler",
    featured: true,
    github: "https://github.com/raulantodev",
    url: "https://create-model-django-migrate.vercel.app",
    demo: "https://create-model-django-migrate.vercel.app",
    accent: "amber",
  },
  {
    id: "api-pos",
    title: "API Sistema POS",
    category: "Backend",
    description:
      "Backend transaccional robusto para terminales de punto de venta con control de stock, corte de caja y facturación con transacciones ACID.",
    tech: ["Django REST", "PostgreSQL", "JWT", "Docker"],
    highlight: "Transacciones ACID",
    github: "https://github.com/raulantodev",
    url: "https://github.com/raulanto/api-pos",
    accent: "purple",
  },
  {
    id: "api-base",
    title: "ApiBase — Plantilla DRF",
    category: "Backend",
    description:
      "Starter-kit de grado empresarial para Django REST Framework con autenticación JWT, roles granulares, Docker y suites de pruebas automatizadas.",
    tech: ["Python", "Django REST", "PostgreSQL", "Pytest"],
    highlight: "Enterprise Starter",
    github: "https://github.com/raulantodev",
    url: "https://github.com/raulanto/ApiBase",
    accent: "cyan",
  },
  {
    id: "api-file-upload",
    title: "API Carga de Archivos",
    category: "Backend",
    description:
      "Microservicio optimizado para streaming de subida, validación de contenido, conversión asíncrona de formatos y gestión de almacenamiento.",
    tech: ["FastAPI", "AsyncIO", "Celery", "Redis"],
    highlight: "Async Streaming",
    github: "https://github.com/raulantodev",
    url: "https://github.com/raulanto/ApiFiles",
    accent: "indigo",
  },
  {
    id: "gestion-obras",
    title: "Sistema Gestión de Obras",
    category: "Full Stack",
    description:
      "Plataforma integral para seguimiento presupuestario de obra civil, cubicaciones, control de inventario de materiales y control de avance.",
    tech: ["Django", "PostgreSQL", "Alpine.js", "TailwindCSS"],
    highlight: "Auditoría & Costos",
    github: "https://github.com/raulantodev",
    url: "https://github.com/raulanto/SistemaGestioncv",
    accent: "orange",
  },
  {
    id: "interactive-dashboard",
    title: "Dashboard Interactivo",
    category: "Frontend",
    description:
      "Panel de control analítico con visualizaciones gráficas interactivas, métricas en vivo y diseño adaptativo con modo oscuro nativo.",
    tech: ["React", "TypeScript", "TailwindCSS", "Recharts"],
    highlight: "Data Viz",
    github: "https://github.com/raulantodev",
    url: "https://dashboard-interactivo-three.vercel.app/board",
    demo: "https://dashboard-interactivo-three.vercel.app/board",
    accent: "sky",
  },
  {
    id: "frontend-pos",
    title: "E-commerce & POS Web",
    category: "Frontend",
    description:
      "Experiencia fluida para terminal de ventas web y catálogo digital con carrito reactivo, búsqueda instantánea y compatibilidad offline.",
    tech: ["Vue 3", "Pinia", "TailwindCSS", "Vite"],
    highlight: "Offline-first Store",
    github: "https://github.com/raulantodev",
    url: "https://github.com/raulanto/app-sistemapos",
    accent: "rose",
  },
  {
    id: "expense-tracker",
    title: "Gestor de Gastos Móvil",
    category: "Mobile",
    description:
      "Aplicación móvil para control de finanzas personales con categorización automática, metas de ahorro y gráficas de consumo mensual.",
    tech: ["Flutter", "Dart", "SQLite", "Riverpod"],
    highlight: "Mobile App",
    github: "https://github.com/raulanto/gestor_gastos",
    url: "https://github.com/raulanto/gestor_gastos",
    accent: "emerald",
  },
  {
    id: "calculadora-div-graf",
    title: "Calculadora Visual con Gráficos",
    category: "Full Stack",
    description:
      "Herramienta interactiva para resolución de operaciones aritméticas y visualización geométrica del desglose paso a paso.",
    tech: ["Next.js", "TypeScript", "Canvas API", "Math Engine"],
    highlight: "Visual Math",
    github: "https://github.com/raulantodev",
    url: "https://calculadora-div-graf.vercel.app",
    demo: "https://calculadora-div-graf.vercel.app",
    accent: "blue",
  },
  {
    id: "frontend-ordenes",
    title: "Herramienta de Mapa & Rutas",
    category: "Full Stack",
    description:
      "Visualizador cartográfico para trazado interactivo de rutas de distribución, geocodificación de pedidos y cálculo de distancias óptimas.",
    tech: ["Vue.js", "Leaflet", "OpenStreetMap", "Python"],
    highlight: "Geospatial Routing",
    github: "https://github.com/raulantodev",
    url: "https://fro-corden.vercel.app/",
    demo: "https://fro-corden.vercel.app/",
    accent: "teal",
  },
  {
    id: "pathfinding-algorithms",
    title: "Algoritmos de Búsqueda de Caminos",
    category: "Frontend",
    description:
      "Simulador visual en tiempo real de algoritmos de grafos como A*, Dijkstra y Breadth-First Search con generación de laberintos dinámicos.",
    tech: ["TypeScript", "Canvas API", "A* & Dijkstra", "Algorithms"],
    highlight: "Pathfinding Visualizer",
    featured: true,
    github: "https://github.com/raulantodev",
    url: "https://shortpath-algorithm.vercel.app/",
    demo: "https://shortpath-algorithm.vercel.app/",
    accent: "violet",
  },
  {
    id: "arquitectura-hexagonal",
    title: "Calculadora Arquitectura Hexagonal",
    category: "Frontend",
    description:
      "Implementación de referencia de Arquitectura Hexagonal (Puertos y Adaptadores) y Domain-Driven Design con desacoplamiento total del framework.",
    tech: ["TypeScript", "Hexagonal DDD", "Clean Code", "Jest"],
    highlight: "Clean Architecture",
    github: "https://github.com/raulantodev",
    url: "https://calculadora-div.vercel.app",
    demo: "https://calculadora-div.vercel.app",
    accent: "amber",
  },
  {
    id: "forja-rust",
    title: "Forja Rust CLI",
    category: "CLI",
    description:
      "Herramienta de línea de comandos de alto rendimiento en Rust para generación instantánea de scaffolding, plantillas y proyectos modulares.",
    tech: ["Rust", "Clap CLI", "Tokio Async", "File Engine"],
    highlight: "Native Rust CLI",
    github: "https://github.com/raulantodev",
    url: "https://github.com/raulanto/forja-rust",
    accent: "orange",
  },
  {
    id: "pdf-viewer",
    title: "PDF View Desktop",
    category: "GUI",
    description:
      "Aplicación de escritorio ligera para lectura, indexación y extracción de documentos PDF con herramientas de marcado de texto.",
    tech: ["Python", "PyQt / PySide", "PDFium", "Desktop GUI"],
    highlight: "Desktop GUI",
    github: "https://github.com/raulantodev",
    url: "https://github.com/raulanto/pdf-view",
    accent: "rose",
  },
];
