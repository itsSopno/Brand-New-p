import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Layout,
    Command,
    Code,
    Database,
    ArrowRight,
    ArrowUpRight,
    Twitter,
    ArrowDown,
    Instagram,
    Youtube
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
        <div ref={heroRef} className="w-full bg-[#0d130a]">
            {/* ─── HERO SECTION ─────────────────────────────────────────── */}
            <section className="pl-[16px] pr-[16px] pt-[16px]">
                <section className="relative h-screen w-full mt-[-5rem] flex flex-col justify-between overflow-hidden bg-[#caff21] rounded-3xl">

                    {/* Watermark background text */}
                    <div className="absolute inset-0 flex flex-col justify-center gap-10 select-none pointer-events-none z-0">
                        <div className="text-[13vw] font-black uppercase text-center tracking-tighter whitespace-nowrap leading-none text-[#0d130a] opacity-[0.04]">
                            SNAP MASTER SNAP MASTER
                        </div>
                        <div className="text-[13vw] font-black uppercase text-center tracking-tighter whitespace-nowrap leading-none text-[#0d130a] opacity-[0.04]">
                            SNAP MASTER SNAP MASTER
                        </div>
                        <div className="text-[13vw] font-black uppercase text-center tracking-tighter whitespace-nowrap leading-none text-[#0d130a] opacity-[0.04]">
                            SNAP MASTER SNAP MASTER
                        </div>
                    </div>

                    {/* Dot grid decoration – top right */}
                    <div className="absolute top-8 right-10 grid grid-cols-6 gap-[6px] opacity-20 pointer-events-none select-none z-0">
                        {Array.from({ length: 30 }).map((_, i) => (
                            <div key={i} className="w-[3px] h-[3px] rounded-full bg-[#0d130a]" />
                        ))}
                    </div>

                    {/* Dot grid decoration – bottom left */}
                    <div className="absolute bottom-12 left-10 grid grid-cols-5 gap-[6px] opacity-15 pointer-events-none select-none z-0">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div key={i} className="w-[3px] h-[3px] rounded-full bg-[#0d130a]" />
                        ))}
                    </div>

                    {/* ── Top bar: role badge + availability ── */}
                    <div
                        ref={cardRef}
                        className="relative z-10 flex items-center justify-between px-8 pt-28 md:pt-32 md:px-12"
                    >
                        {/* Role badge */}
                        <div className="hero-reveal-text flex items-center gap-2 bg-[#0d130a]/10 border border-[#0d130a]/20 rounded-full px-4 py-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0d130a]">Full-Stack Developer</span>
                            <span className="text-[10px] font-bold text-[#0d130a]/50">/ MERN Stack</span>
                        </div>

                        {/* Availability pill */}
                        <div className="hero-reveal-text flex items-center gap-2 bg-[#0d130a] rounded-full px-4 py-1.5">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#caff21] opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#caff21]" />
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#caff21]">Available for work</span>
                        </div>
                    </div>

                    {/* ── Main headline ── */}
                    <div className="relative z-10 px-8 md:px-12 text-center">
                        {/* Subtitle line above */}
                        <p className="hero-reveal-text text-xs font-bold uppercase tracking-[0.35em] text-[#0d130a]/50 mb-3">
                            Based in Bangladesh &nbsp;·&nbsp; Building for the Web
                        </p>
                        {/* Giant split title: solid + outline */}
                        <h1 className="hero-reveal-text font-black uppercase leading-[0.85] tracking-tighter m-0 select-none">
                            <span className="block text-[14vw] sm:text-[12vw] lg:text-[9vw] text-[#0d130a]">Nabil</span>
                            <span
                                className="block text-[14vw] sm:text-[12vw] lg:text-[9vw]"
                                style={{
                                    WebkitTextStroke: '2px #0d130a',
                                    color: 'transparent',
                                }}
                            >
                                Hasan
                            </span>
                        </h1>
                    </div>

                    {/* ── Bottom 3-column row ── */}
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end px-8 pb-8 md:px-12 md:pb-10">

                        {/* Left: intro + socials */}
                        <div className="lg:col-span-4 flex flex-col gap-5">
                            <p className="hero-reveal-text text-sm font-semibold leading-relaxed max-w-[300px] text-[#0d130a]/80">
                                I craft <span className="text-[#0d130a] font-black">scalable, high-performance</span> web products — from pixel-perfect UIs to rock-solid APIs.
                            </p>

                            {/* Social icons */}
                            <div className="hero-reveal-text flex items-center gap-2">
                                {[
                                    { href: 'https://instagram.com', icon: <Instagram size={15} />, label: 'Instagram' },
                                    { href: 'https://youtube.com', icon: <Youtube size={15} />, label: 'YouTube' },
                                    { href: 'https://twitter.com', icon: <Twitter size={14} />, label: 'Twitter' },
                                ].map((s) => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={s.label}
                                        className="w-9 h-9 rounded-full border-2 border-[#0d130a] flex items-center justify-center text-[#0d130a] hover:bg-[#0d130a] hover:text-[#caff21] transition-all duration-200"
                                    >
                                        {s.icon}
                                    </a>
                                ))}

                                {/* Separator + year badge */}
                                <span className="ml-2 text-[11px] font-bold text-[#0d130a]/40 tracking-wider">© 2025</span>
                            </div>
                        </div>

                        {/* Center: developer image */}
                        <div className="lg:col-span-4 flex items-end justify-center relative min-h-[200px] lg:min-h-0">
                            <div className="relative flex items-end justify-center h-full w-full max-w-[300px] mx-auto">
                                {/* Ghost trail 1 */}
                                <img src={DEV_IMAGE} alt="" aria-hidden
                                    className="absolute bottom-0 w-[160px] md:w-[200px] lg:w-[235px] opacity-10 grayscale -translate-x-[44px] scale-[0.93] pointer-events-none" />
                                {/* Ghost trail 2 */}
                                <img src={DEV_IMAGE} alt="" aria-hidden
                                    className="absolute bottom-0 w-[160px] md:w-[200px] lg:w-[235px] opacity-25 grayscale -translate-x-[22px] scale-[0.97] pointer-events-none" />
                                {/* Main portrait */}
                                <img
                                    src={DEV_IMAGE}
                                    alt="Nabil Hasan – Full-Stack Developer"
                                    className="hero-dev-image relative bottom-0 z-10 w-[160px] md:w-[200px] lg:w-[235px] object-contain object-bottom grayscale hover:grayscale-0 transition-all duration-700 hover:scale-[1.03]"
                                />

                                {/* Floating name card under portrait */}
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#0d130a] text-[#caff21] text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full whitespace-nowrap z-20">
                                    Nabil Hasan
                                </div>
                            </div>
                        </div>

                        {/* Right: bio + scroll CTA */}
                        <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-5">
                            <p className="hero-reveal-text text-sm font-semibold leading-relaxed max-w-[300px] text-[#0d130a]/80 text-left lg:text-right">
                                Currently building <span className="text-[#0d130a] font-black">modern digital experiences</span> with React, Node.js, MongoDB & Express.
                            </p>

                            {/* Scroll down CTA */}
                            <div className="hero-reveal-text flex items-center gap-2.5">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0d130a]/60 hidden lg:block">Scroll</span>
                                <a
                                    href="#tech-section"
                                    className="w-10 h-10 rounded-full bg-[#0d130a] text-[#caff21] flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg cursor-pointer"
                                    aria-label="Scroll Down"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById('tech-section')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    <ArrowDown size={16} className="animate-bounce" />
                                </a>
                            </div>
                        </div>

                    </div>
                </section>
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
