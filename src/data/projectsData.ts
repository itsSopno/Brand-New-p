export interface ProjectItem {
    _id: string;
    index: string;
    title: string;
    subtitle: string;
    description: string;
    longDescription?: string;
    image: string;
    category: string;
    tags: string[];
    status: string;
    statusType: 'live' | 'client' | 'beta' | 'award';
    year: string;
    role: string;
    metricBadge: string;
    domainPreview: string;
    githubLink?: string;
    demoLink?: string;
    featured: boolean;
    createdAt?: string;
    highlights?: string[];
}

export const PROJECTS_DATA: ProjectItem[] = [
    {
        _id: 'mock1',
        index: '01',
        title: "Aura Estates",
        subtitle: "Spatial Real Estate & Architectural Catalog",
        description: "A luxury architectural property portal with real-time vector map search, dynamic filter matrices, and 3D virtual walkthroughs.",
        longDescription: "A comprehensive real estate portal designed to offer seamless searches and property listings. Equipped with robust advanced dynamic filtering, map search integration using Leaflet and Mapbox, fully responsive cards, and clean grid displays. Offers a premium glassmorphic client interface optimized for ultra-fast load times.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
        category: "Full Stack",
        tags: ["React", "TypeScript", "Node.js", "Express", "Tailwind CSS", "MongoDB"],
        status: "Live Production",
        statusType: "live",
        year: "2024",
        role: "Full-Stack Architect",
        metricBadge: "⚡ Sub-60ms Query Latency",
        domainPreview: "auraestates.architecture.io",
        githubLink: "https://github.com",
        demoLink: "https://aura-estates.example.com",
        featured: true,
        createdAt: "2024-08-15T00:00:00.000Z",
        highlights: [
            "Spatial map navigation with dynamic viewport cluster caching",
            "SSR-ready architecture achieving 98/100 Mobile Lighthouse scores",
            "Integrated inquiries CRM pipeline with instant webhook triggers"
        ]
    },
    {
        _id: 'mock2',
        index: '02',
        title: "Kroma Studio",
        subtitle: "WebGL Agency Showreel & Kinetic Typography",
        description: "An experimental visual studio experience combining fluid GLSL shaders, micro-magnetic typography, and smooth cinematic scene transitions.",
        longDescription: "A fully custom dynamic agency catalog for photographs and cinematic works. Powered by high frame-rate interactive GSAP scroll-triggers, customized parallax sections, smooth scrolling with Lenis, and WebGL canvas shader transitions to guarantee visitor engagement.",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
        category: "Creative Web",
        tags: ["React", "Three.js", "GSAP", "GLSL Shaders", "Lenis", "Tailwind CSS"],
        status: "Awwwards Nominee",
        statusType: "award",
        year: "2024",
        role: "Creative Technologist",
        metricBadge: "✦ 60 FPS Fluid Canvas",
        domainPreview: "kromastudio.creative.design",
        githubLink: "https://github.com",
        demoLink: "https://kroma-studio.example.com",
        featured: true,
        createdAt: "2024-06-10T00:00:00.000Z",
        highlights: [
            "Hardware-accelerated shader passes with adaptive pixel density fallback",
            "Smooth kinetic scroll orchestration paired with GSAP timeline curves",
            "Zero render lag across modern mobile and desktop web viewports"
        ]
    },
    {
        _id: 'mock3',
        index: '03',
        title: "Nexus Terminal",
        subtitle: "High-Frequency Crypto Analytics & Telemetry",
        description: "Institutional-grade financial intelligence dashboard featuring streaming tick data, multi-layer candlestick overlays, and risk models.",
        longDescription: "Real-time analytics engine tracking crypto indices with robust charting overlays. Includes sub-second WebSocket pipelines, custom order book aggregators, multi-timeframe backtesting calculators, and encrypted notification webhooks.",
        image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1200&auto=format&fit=crop",
        category: "FinTech / SaaS",
        tags: ["Next.js", "TypeScript", "WebSockets", "Recharts", "Tailwind CSS", "Redis"],
        status: "Client Release",
        statusType: "client",
        year: "2024",
        role: "Lead Frontend Engineer",
        metricBadge: "⚡ <20ms WebSocket Stream",
        domainPreview: "terminal.nexuscapital.fi",
        githubLink: "https://github.com",
        demoLink: "https://nexus-terminal.example.com",
        featured: true,
        createdAt: "2024-03-22T00:00:00.000Z",
        highlights: [
            "High-throughput WebSocket feed parsing up to 10k messages/sec without jank",
            "Virtual scrolling table engine supporting tens of thousands of active ticks",
            "Custom dark-mode high-contrast HUD for institutional traders"
        ]
    },
    {
        _id: 'mock4',
        index: '04',
        title: "DevPulse Cloud",
        subtitle: "Distributed Microservice Tracing & Health HUD",
        description: "An ultra-lean observability platform delivering container heatmaps, zero-overhead tracing pipelines, and instant latency diagnosis.",
        longDescription: "A developer-first monitoring system designed to provide real-time visibility into Kubernetes clusters and microservices. Features zero-config telemetry exporters, distributed trace graph visualization, and lightning-fast log aggregations.",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
        category: "Cloud / DevOps",
        tags: ["TypeScript", "React", "Go", "Docker", "Tailwind CSS", "PostgreSQL"],
        status: "Open Source Beta",
        statusType: "beta",
        year: "2023",
        role: "Full-Stack Engineer",
        metricBadge: "⚡ 99.99% Uptime Monitored",
        domainPreview: "devpulse.telemetry.cloud",
        githubLink: "https://github.com",
        demoLink: "https://devpulse.example.com",
        featured: true,
        createdAt: "2023-11-04T00:00:00.000Z",
        highlights: [
            "Distributed tracing analyzer tracking end-to-end request latency across nodes",
            "Dynamic node topology graph rendered via canvas with interactive pinch-zoom",
            "Multi-channel webhook alerting for Slack, Telegram, and Discord"
        ]
    }
];

export const CATEGORIES = ["All Works", "Full Stack", "Creative Web", "FinTech / SaaS", "Cloud / DevOps"] as const;
