import { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles, Filter, Code2, Layers, Cpu } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { PROJECTS_DATA, CATEGORIES, ProjectItem } from '../data/projectsData';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsShowcaseProps {
    projects?: ProjectItem[];
    loading?: boolean;
    showFilters?: boolean;
    limit?: number;
}

export default function ProjectsShowcase({
    projects = PROJECTS_DATA,
    loading = false,
    showFilters = true,
    limit
}: ProjectsShowcaseProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeCategory, setActiveCategory] = useState<string>("All Works");

    // Filter projects based on active tab
    const filteredProjects = useMemo(() => {
        let result = projects;
        if (activeCategory !== "All Works") {
            result = projects.filter(p => p.category === activeCategory);
        }
        if (limit && limit > 0) {
            result = result.slice(0, limit);
        }
        return result;
    }, [projects, activeCategory, limit]);

    // GSAP scroll trigger animation
    useEffect(() => {
        if (loading || filteredProjects.length === 0) return;

        const ctx = gsap.context(() => {
            gsap.fromTo('.project-section-header',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 85%'
                    }
                }
            );

            gsap.fromTo('.project-anim-card',
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%'
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, [loading, activeCategory]);

    return (
        <section
            id="projects-section"
            ref={sectionRef}
            className="py-24 sm:py-32 px-6 lg:px-12 max-w-7xl mx-auto border-t border-white/5 relative z-10"
        >
            {/* Ambient background glow accents */}
            <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-[#c6f135]/[0.03] blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full bg-indigo-500/[0.03] blur-[120px] pointer-events-none" />

            {/* Section Header */}
            <div className="project-section-header flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 relative z-10">
                <div className="max-w-2xl">
                    {/* Monospace Badge */}
                    <div className="flex items-center gap-3 mb-4">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c6f135] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#c6f135]"></span>
                        </span>
                        <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#c6f135] font-semibold">
                            [ 03 // SELECTED WORKS ]
                        </span>
                    </div>

                    {/* Headline */}
                    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-[0.95]">
                        Featured{' '}
                        <span className="text-stroke-heavy text-white hover:text-[#c6f135] transition-colors cursor-default">
                            Projects
                        </span>
                    </h2>

                    {/* Subtitle */}
                    <p className="text-slate-400 text-sm sm:text-base mt-4 font-normal leading-relaxed max-w-xl">
                        A handpicked collection of scalable web applications, creative WebGL showreels, and high-concurrency systems engineered with modern architecture.
                    </p>
                </div>

                {/* Right Action: All Projects link */}
                <div className="flex items-center gap-4 shrink-0">
                    <Link
                        to="/projects"
                        className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.03] hover:bg-[#c6f135] text-white hover:text-black border border-white/10 hover:border-[#c6f135] font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 shadow-lg shadow-black/50 hover:shadow-[0_0_25px_rgba(198,241,53,0.3)]"
                    >
                        <span>VIEW ALL ARCHIVE</span>
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/10 group-hover:bg-black/20 text-slate-300 group-hover:text-black transition-colors">
                            {projects.length}
                        </span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* Interactive Category Filter Pills */}
            {showFilters && (
                <div className="mb-12 flex flex-wrap items-center gap-2.5 pb-2 border-b border-white/5">
                    <div className="hidden sm:flex items-center gap-2 mr-2 text-slate-400 text-xs font-mono uppercase tracking-wider">
                        <Filter size={13} className="text-[#c6f135]" />
                        <span>Filter:</span>
                    </div>

                    {CATEGORIES.map((cat) => {
                        const count = cat === "All Works"
                            ? projects.length
                            : projects.filter(p => p.category === cat).length;
                        const isActive = activeCategory === cat;

                        return (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all duration-300 flex items-center gap-2 ${
                                    isActive
                                        ? 'bg-[#c6f135] text-black font-bold shadow-[0_0_20px_rgba(198,241,53,0.25)] scale-[1.02]'
                                        : 'bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/5'
                                }`}
                            >
                                <span>{cat}</span>
                                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                                    isActive ? 'bg-black/20 text-black font-extrabold' : 'bg-white/10 text-slate-400'
                                }`}>
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Projects Grid */}
            {loading ? (
                <div className="flex flex-col justify-center items-center py-24 gap-4">
                    <div className="w-12 h-12 border-4 border-[#c6f135]/20 border-t-[#c6f135] rounded-full animate-spin" />
                    <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">Loading Projects Showcase...</p>
                </div>
            ) : filteredProjects.length === 0 ? (
                <div className="py-20 text-center glass-panel rounded-2xl border border-white/5 max-w-md mx-auto p-8">
                    <Sparkles className="w-8 h-8 text-[#c6f135] mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-white mb-1">No Projects In This Category</h3>
                    <p className="text-xs text-slate-400 mb-4">Try selecting another filter to view other production works.</p>
                    <button
                        onClick={() => setActiveCategory("All Works")}
                        className="px-4 py-2 rounded-full bg-white/10 text-xs font-mono text-white hover:bg-white/20 transition-all"
                    >
                        Reset Filter
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project._id} project={project} />
                    ))}
                </div>
            )}

            {/* Bottom Engineering Highlights Banner */}
            <div className="mt-16 sm:mt-24 pt-10 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
                <div className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col gap-2 group hover:border-[#c6f135]/20 transition-all">
                    <div className="w-9 h-9 rounded-lg bg-[#c6f135]/10 border border-[#c6f135]/20 flex items-center justify-center text-[#c6f135] mb-1">
                        <Code2 size={18} />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Stack Quality</span>
                    <h4 className="text-white font-bold text-base">100% Type-Safe & Modular</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">Built with React, TypeScript, Next.js, and strict ESLint / testing standards.</p>
                </div>

                <div className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col gap-2 group hover:border-[#c6f135]/20 transition-all">
                    <div className="w-9 h-9 rounded-lg bg-[#c6f135]/10 border border-[#c6f135]/20 flex items-center justify-center text-[#c6f135] mb-1">
                        <Layers size={18} />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Interaction Design</span>
                    <h4 className="text-white font-bold text-base">Fluid 60 FPS GSAP Motion</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">Kinetic scroll triggers, smooth Lenis interpolation, and hardware acceleration.</p>
                </div>

                <div className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col gap-2 group hover:border-[#c6f135]/20 transition-all">
                    <div className="w-9 h-9 rounded-lg bg-[#c6f135]/10 border border-[#c6f135]/20 flex items-center justify-center text-[#c6f135] mb-1">
                        <Cpu size={18} />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Performance</span>
                    <h4 className="text-white font-bold text-base">High-Performance Telemetry</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">Optimized bundle size, sub-second TTFB, and minimal DOM layout reflows.</p>
                </div>
            </div>
        </section>
    );
}
