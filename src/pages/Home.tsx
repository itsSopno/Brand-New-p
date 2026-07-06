import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Code, Database, Layout, Command, ArrowUpRight } from 'lucide-react';

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

export default function Home() {
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const techRef = useRef<HTMLDivElement>(null);
    const projectsSectionRef = useRef<HTMLDivElement>(null);

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch featured projects
    useEffect(() => {
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => {
                // filter featured
                const featured = data.filter((p: Project) => p.featured);
                setProjects(featured.length > 0 ? featured : data.slice(0, 3));
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch from API:', err);
                // Fallback local mock projects
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

    // Enter animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero stagger entrance
            const tl = gsap.timeline();
            tl.fromTo('.hero-reveal',
                { y: 80, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power4.out' }
            );

            // Floating particles
            gsap.to('.hero-glow', {
                x: 'random(-45, 45)',
                y: 'random(-45, 45)',
                duration: 8,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });

            // Scroll triggered scroll animations
            gsap.fromTo('.tech-card',
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: techRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            );

            gsap.fromTo('.project-anim-card',
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: projectsSectionRef.current,
                        start: 'top 75%'
                    }
                }
            );
        }, heroRef);

        return () => ctx.revert();
    }, [loading]);

    const techStack = [
        { name: 'Frontend Engineering', desc: 'Crafting UI layouts with React, TS, and Tailwind CSS.', icon: <Layout className="text-violet-400" size={24} /> },
        { name: 'Creative Animation', desc: 'Developing fluid movements with GSAP and WebGL wrappers.', icon: <Command className="text-pink-400" size={24} /> },
        { name: 'Backend & APIs', desc: 'Authoring secure, type-safe API servers using Node and Express.', icon: <Code className="text-indigo-400" size={24} /> },
        { name: 'Databases & Ops', desc: 'Hosting structured document stores with MongoDB Compass & Atlas.', icon: <Database className="text-sky-400" size={24} /> }
    ];

    return (
        <div ref={heroRef} className="w-full">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex flex-col justify-center px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
                {/* Glow Effects */}
                <div className="hero-glow absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none z-0" />
                <div className="hero-glow absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-pink-500/10 blur-[130px] pointer-events-none z-0" />

                <div className="relative z-10 max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border-white/10 text-xs font-semibold uppercase tracking-wider text-indigo-300 hero-reveal mb-6 animate-pulse-slow">
                        <span className="w-2 h-2 rounded-full bg-green-405 bg-green-500 animate-ping" />
                        Open for freelance projects
                    </div>

                    <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-6 hero-reveal leading-[1.05]">
                        Designing <span className="text-gradient">digital days</span> with fine code
                    </h1>

                    <p ref={subtitleRef} className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 hero-reveal leading-relaxed">
                        I build responsive, high-performance web applications using modern web tech including React, TypeScript, Tailwind, and Express, driven by premium interactive user experience.
                    </p>

                    <div ref={ctaRef} className="flex flex-wrap gap-4 hero-reveal">
                        <Link
                            to="/projects"
                            className="px-8 py-4 rounded bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-medium shadow-xl hover:shadow-indigo-500/20 transition-all flex items-center gap-2 group"
                        >
                            Explore My Work
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            to="/contact"
                            className="px-8 py-4 rounded glass-panel hover:bg-white/5 border-white/10 text-white font-medium transition-all"
                        >
                            Let's Talk
                        </Link>
                    </div>
                </div>
            </section>

            {/* Tech Capabilities Section */}
            <section ref={techRef} className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-t border-white/5">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {techStack.map((tech, i) => (
                        <div key={i} className="tech-card glass-panel hover:border-white/10 p-8 rounded-xl flex flex-col gap-4 group hover:-translate-y-1 transition-all duration-300">
                            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                {tech.icon}
                            </div>
                            <h3 className="text-lg font-bold text-white mt-2">{tech.name}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">{tech.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Projects Showcase Summary */}
            <section ref={projectsSectionRef} className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-t border-white/5">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Selected Projects</h2>
                        <p className="text-slate-400 max-w-lg">A handpicked selection of production sites showcasing development and dynamic frontend interactions.</p>
                    </div>
                    <Link
                        to="/projects"
                        className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold group py-1 border-b border-indigo-400/20 hover:border-indigo-400 transition-all text-sm tracking-wide"
                    >
                        ALL PROJECTS
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-8">
                        {projects.map((project) => (
                            <div key={project._id} className="project-anim-card group flex flex-col rounded-xl overflow-hidden glass-panel border-white/5 hover:border-white/10 transition-all duration-500">
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
                                                <span key={tag} className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 text-slate-350 select-none">{tag}</span>
                                            ))}
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors duration-300 mt-1">{project.title}</h3>
                                        <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">{project.description}</p>
                                    </div>

                                    <Link
                                        to={`/projects/${project._id}`}
                                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white hover:text-indigo-400 group/link transition-colors self-start"
                                    >
                                        View Details
                                        <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* CTA Wrap */}
            <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-t border-white/5 text-center relative overflow-hidden rounded-2xl bg-gradient-to-tr from-indigo-950/20 to-pink-950/20 border border-white/5">
                <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-indigo-500/5 blur-[80px]" />
                <div className="relative z-10 max-w-2xl mx-auto py-8">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Have a project idea?</h2>
                    <p className="text-slate-450 text-slate-450 text-slate-450 text-slate-400 text-sm md:text-base mb-8 leading-relaxed">
                        I am currently taking on new clients and project challenges. Let's arrange a brief discovery session to work out details.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center px-8 py-4 rounded bg-white hover:bg-slate-100 text-slate-900 font-semibold transition duration-300"
                    >
                        Start a Conversation
                    </Link>
                </div>
            </section>
        </div>
    );
}
