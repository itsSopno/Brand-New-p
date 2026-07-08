import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

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

interface ProjectsShowcaseProps {
    projects: Project[];
    loading: boolean;
}

export default function ProjectsShowcase({ projects, loading }: ProjectsShowcaseProps) {
    const projectsSectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (loading || projects.length === 0) return;

        const ctx = gsap.context(() => {
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
        }, projectsSectionRef);

        return () => ctx.revert();
    }, [loading, projects]);

    return (
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
    );
}
