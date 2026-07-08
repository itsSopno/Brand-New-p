import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    ArrowRight,
    Code,
    Database,
    Layout,
    Command,
    ArrowUpRight,
    Github,
    Linkedin,
    Twitter,
    ArrowDown,
    Cpu,
    Layers,
    Sparkles
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
    _id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    githubLink?: string;
    demoLink?: string;
    featured: boolean;
}

// NOTE: Replace this image URL with your own local file path when ready, e.g., "/src/assets/my-photo.png"
const DEV_IMAGE = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop";

export default function Home() {
    const heroRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const techRef = useRef<HTMLDivElement>(null);
    const projectsSectionRef = useRef<HTMLDivElement>(null);

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch featured projects
    useEffect(() => {
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => {
                const featured = data.filter((p: Project) => p.featured);
                setProjects(featured.length > 0 ? featured : data.slice(0, 3));
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch from API:', err);
                setProjects([
                    {
                        _id: 'mock1',
                        title: "Sleek Real Estate platform",
                        description: "A premium real estate listing application using automated mapping APIs.",
                        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=600&auto=format&fit=crop",
                        tags: ["React", "TypeScript", "Tailwind CSS", "Express", "MongoDB"],
                        featured: true
                    },
                    {
                        _id: 'mock2',
                        title: "Creative Design Portfolio",
                        description: "An animated photography showreel presenting creative images using WebGL and GSAP animations.",
                        image: "https://images.unsplash.com/photo-1542241647-9cbb2225278b?q=80&w=600&auto=format&fit=crop",
                        tags: ["React", "GSAP", "CSS Canvas", "Framer Motion"],
                        featured: true
                    }
                ]);
                setLoading(false);
            });
    }, []);

    // Scroll trigger & entry animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Hero card entrance
            tl.fromTo(cardRef.current,
                { scale: 0.95, y: 60, opacity: 0 },
                { scale: 1, y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' }
            );

            // Text content and big title entrance
            tl.fromTo('.hero-reveal-text',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
                '-=0.8'
            );

            // Dev portrait slide up
            tl.fromTo('.hero-dev-image',
                { y: 150, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
                '-=1'
            );

            // Floating glow animations
            gsap.to('.hero-glow', {
                x: 'random(-30, 30)',
                y: 'random(-30, 30)',
                duration: 6,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });

            // Tech card reveals
            gsap.fromTo('.tech-card',
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: techRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );

            // Project card reveals
            gsap.fromTo('.project-anim-card',
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: projectsSectionRef.current,
                        start: 'top 80%'
                    }
                }
            );
        }, heroRef);

        return () => ctx.revert();
    }, [loading]);

    const techStack = [
        { name: 'Frontend Architecture', desc: 'React, TS, Tailwind CSS, High-end Micro-interactions.', icon: <Layout className="text-[#c6f135]" size={24} /> },
        { name: 'Creative Animations', desc: 'Fluid movement, GSAP, SVG morphs, WebGL & Canvas.', icon: <Command className="text-pink-400" size={24} /> },
        { name: 'Robust Backends', desc: 'Secure APIs, JWT, Middleware, Express.js & Node.', icon: <Code className="text-violet-400" size={24} /> },
        { name: 'Data Pipeline', desc: 'Databases, Mongoose mappings, Redis caching levels.', icon: <Database className="text-sky-400" size={24} /> }
    ];

    return (
        <div ref={heroRef} className="w-full bg-[#0a0a0c]">
            {/* Hero Section Container */}
            <section className="relative min-h-screen pt-28 pb-12 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col justify-center overflow-hidden">
                {/* Subtle Ambient BG Glows */}
                <div className="hero-glow absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-[#c6f135]/5 blur-[120px] pointer-events-none z-0" />
                <div className="hero-glow absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-indigo-500/5 blur-[140px] pointer-events-none z-0" />

                {/* Neo-brutalist Dribbble-style Main Hero Card */}
                <div
                    ref={cardRef}
                    className="relative z-10 w-full rounded-[24px] md:rounded-[40px] bg-[#c6f135] text-[#080d07] p-8 md:p-14 border-[3px] border-[#080d07] shadow-[10px_10px_0px_0px_#080d07] overflow-hidden"
                >
                    {/* Background Grid Pattern Overlay */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#080d07_1px,transparent_1px)] [background-size:16px_16px]" />

                    {/* Big Background / Main Header Title */}
                    <div className="w-full text-center select-none mb-4 md:mb-6 z-10 relative">
                        <h1 className="hero-reveal-text text-[11vw] sm:text-[10vw] lg:text-[7.5vw] font-black tracking-tighter uppercase leading-[0.8] text-[#080d07] m-0">
                            MERN DEV
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative min-h-[350px] lg:min-h-[400px]">
                        {/* Left Column: Intro & Socials */}
                        <div className="lg:col-span-4 flex flex-col justify-between py-2 z-20">
                            <div className="hero-reveal-text flex flex-col gap-4">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#080d07]/15 bg-[#080d07]/5 text-xs font-bold uppercase tracking-widest text-[#080d07] w-fit">
                                    <span className="w-2 h-2 rounded-full bg-green-600 animate-ping" />
                                    NABIL HASAN
                                </span>
                                <h3 className="text-xl md:text-2xl font-bold tracking-tight leading-snug">
                                    What makes my code unique is the combination of technical expertise & design details.
                                </h3>
                            </div>

                            {/* Minimal Social Buttons */}
                            <div className="hero-reveal-text flex items-center gap-3 mt-6 lg:mt-0">
                                <a
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-11 h-11 rounded-full border-2 border-[#080d07] flex items-center justify-center bg-[#080d07] text-[#c6f135] hover:bg-[#c6f135] hover:text-[#080d07] transition-all duration-300 shadow-[3px_3px_0px_0px_#080d07]"
                                    aria-label="GitHub"
                                >
                                    <Github size={18} />
                                </a>
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-11 h-11 rounded-full border-2 border-[#080d07] flex items-center justify-center bg-transparent text-[#080d07] hover:bg-[#080d07] hover:text-[#c6f135] transition-all duration-300"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin size={18} />
                                </a>
                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-11 h-11 rounded-full border-2 border-[#080d07] flex items-center justify-center bg-transparent text-[#080d07] hover:bg-[#080d07] hover:text-[#c6f135] transition-all duration-300"
                                    aria-label="Twitter"
                                >
                                    <Twitter size={18} />
                                </a>
                            </div>
                        </div>

                        {/* Middle Column: Avatar Cutout Graphic */}
                        <div className="lg:col-span-4 flex items-end justify-center relative min-h-[300px] lg:min-h-0 z-10">
                            {/* Round Graphic Backing Ring */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-2 border-dashed border-[#080d07]/20 pointer-events-none" />

                            {/* Developer Portrait */}
                            <img
                                src={DEV_IMAGE}
                                alt="Nabil Hasan"
                                className="hero-dev-image w-[240px] md:w-[280px] lg:w-[325px] h-[320px] md:h-[360px] object-cover object-center rounded-3xl border-[3px] border-[#080d07] shadow-[6px_6px_0px_0px_#080d07] filter grayscale hover:grayscale-0 transition-all duration-700 ease-out"
                            />
                        </div>

                        {/* Right Column: Bio & Action */}
                        <div className="lg:col-span-4 flex flex-col justify-between items-start lg:items-end py-2 z-20 text-left lg:text-right">
                            <div className="hero-reveal-text flex flex-col gap-4 lg:items-end">
                                <span className="text-xs font-bold uppercase tracking-wider text-[#080d07]/60">BIOGRAPHY</span>
                                <p className="text-base font-semibold leading-relaxed max-w-xs">
                                    I stack MongoDB, Express.js, React, Node.js, and clean visual assets. Building functional interfaces styled to the pixel.
                                </p>
                            </div>

                            {/* Scrolling Prompt Trigger */}
                            <div className="hero-reveal-text w-full flex lg:justify-end mt-6 lg:mt-0">
                                <a
                                    href="#tech-section"
                                    className="w-12 h-12 rounded-full border-2 border-[#080d07] flex items-center justify-center bg-transparent text-[#080d07] hover:bg-[#080d07] hover:text-[#c6f135] transition-all duration-300"
                                    aria-label="Scroll Down"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById('tech-section')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    <ArrowDown size={18} className="animate-bounce" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Mini Navigation Links */}
                    <div className="w-full border-t border-[#080d07]/15 mt-8 pt-6 flex flex-wrap justify-between md:justify-center items-center gap-6 md:gap-16 text-xs font-extrabold uppercase tracking-widest text-[#080d07]/80">
                        <Link to="/about" className="hover:text-[#080d07] hover:underline underline-offset-4 transition-all">About Profile</Link>
                        <span className="hidden md:inline w-1.5 h-1.5 bg-[#080d07] rounded-full" />
                        <Link to="/projects" className="hover:text-[#080d07] hover:underline underline-offset-4 transition-all">View Works</Link>
                        <span className="hidden md:inline w-1.5 h-1.5 bg-[#080d07] rounded-full" />
                        <Link to="/contact" className="hover:text-[#080d07] hover:underline underline-offset-4 transition-all">Get in Touch</Link>
                    </div>
                </div>
            </section>

            {/* Tech Capabilities Section */}
            <section id="tech-section" ref={techRef} className="py-28 px-6 lg:px-12 max-w-7xl mx-auto border-t border-white/5 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">Technical stack</h2>
                    <p className="text-slate-400 text-sm mt-3">Advanced full-stack components and layouts optimized for peak performance.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {techStack.map((tech, i) => (
                        <div
                            key={i}
                            className="tech-card neo-card glass-panel p-8 rounded-xl flex flex-col gap-4 group"
                        >
                            <div className="w-12 h-12 rounded-lg bg-[#c6f135]/10 border border-[#c6f135]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                {tech.icon}
                            </div>
                            <h3 className="text-lg font-bold text-white mt-2">{tech.name}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">{tech.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Projects Showcase Summary */}
            <section ref={projectsSectionRef} className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-t border-white/5 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">Selected Projects</h2>
                        <p className="text-slate-400 text-sm mt-3">A handpicked selection of production sites showcasing development and dynamic frontend interactions.</p>
                    </div>
                    <Link
                        to="/projects"
                        className="inline-flex items-center gap-2 text-[#c6f135] hover:text-[#b8f135] font-bold group py-1 border-b border-[#c6f135]/20 hover:border-[#c6f135] transition-all text-xs tracking-widest uppercase"
                    >
                        ALL PROJECTS
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-10 h-10 border-4 border-[#c6f135]/20 border-t-[#c6f135] rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-8">
                        {projects.map((project) => (
                            <div key={project._id} className="project-anim-card group flex flex-col rounded-2xl overflow-hidden glass-panel border-white/5 hover:border-[#c6f135]/20 transition-all duration-500 shadow-lg">
                                <div className="relative overflow-hidden aspect-video">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/20 to-transparent opacity-60" />
                                </div>

                                <div className="p-8 flex flex-col flex-grow justify-between gap-6">
                                    <div className="flex flex-col gap-3">
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag) => (
                                                <span key={tag} className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 text-slate-350 select-none border border-white/10">{tag}</span>
                                            ))}
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#c6f135] transition-colors duration-300 mt-1">{project.title}</h3>
                                        <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">{project.description}</p>
                                    </div>

                                    <Link
                                        to={`/projects/${project._id}`}
                                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white hover:text-[#c6f135] group/link transition-colors self-start"
                                    >
                                        View Details
                                        <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* CTA Wrap */}
            <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-t border-white/5 text-center relative overflow-hidden rounded-3xl bg-gradient-to-tr from-indigo-950/10 to-[#c6f135]/5 border border-white/5 shadow-inner">
                <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-[#c6f135]/5 blur-[80px]" />
                <div className="relative z-10 max-w-2xl mx-auto py-8">
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">Have a project idea?</h2>
                    <p className="text-slate-400 text-sm md:text-base mb-8 leading-relaxed max-w-lg mx-auto">
                        I am currently taking on new clients and project challenges. Let's arrange a brief discovery session to work out details.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center px-8 py-4 rounded bg-[#c6f135] hover:bg-[#b8f135] text-black font-bold uppercase tracking-widest text-xs transition duration-300 shadow-lg shadow-[#c6f135]/10"
                    >
                        Start a Conversation
                    </Link>
                </div>
            </section>
        </div>
    );
}
