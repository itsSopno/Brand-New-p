import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Globe, Github, Lock, Sparkles, CheckCircle2 } from 'lucide-react';
import { ProjectItem } from '../data/projectsData';

interface ProjectCardProps {
    project: ProjectItem;
    priority?: boolean;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cardRef.current.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    const getStatusBadge = () => {
        switch (project.statusType) {
            case 'live':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold bg-[#c6f135]/10 text-[#c6f135] border border-[#c6f135]/30 badge-glow-lime">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c6f135] animate-pulse" />
                        {project.status}
                    </span>
                );
            case 'award':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 badge-glow-amber">
                        <Sparkles size={10} className="text-amber-400" />
                        {project.status}
                    </span>
                );
            case 'client':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold bg-blue-500/10 text-blue-300 border border-blue-500/30 badge-glow-blue">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        {project.status}
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold bg-purple-500/10 text-purple-300 border border-purple-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        {project.status}
                    </span>
                );
        }
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className="project-anim-card spotlight-card group rounded-2xl border border-white/10 hover:border-[#c6f135]/30 overflow-hidden flex flex-col justify-between transition-all duration-500 shadow-xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:-translate-y-1.5"
        >
            {/* Top Browser / System Chrome Bar */}
            <div className="px-5 py-3.5 border-b border-white/5 bg-[#0e0e12]/90 flex items-center justify-between text-xs backdrop-blur-md select-none">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80 group-hover:bg-[#ff5f56] transition-colors" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80 group-hover:bg-[#ffbd2e] transition-colors" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80 group-hover:bg-[#27c93f] transition-colors" />
                    </div>
                    <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/5 text-[11px] text-slate-400 font-mono tracking-tight ml-2">
                        <Lock size={10} className="text-[#c6f135]/80" />
                        <span>https://{project.domainPreview}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-[#c6f135] font-semibold tracking-wider">
                        {project.index}
                    </span>
                    <span className="text-white/20">|</span>
                    <span className="text-[11px] font-mono text-slate-400 font-medium">
                        {project.year}
                    </span>
                </div>
            </div>

            {/* Media & Interactive Preview */}
            <div className="relative aspect-[16/10] overflow-hidden bg-[#0c0c10]">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.92] group-hover:brightness-100"
                    loading="lazy"
                />

                {/* Ambient dynamic gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12] via-[#0e0e12]/20 to-transparent opacity-80 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e12]/40 via-transparent to-transparent pointer-events-none" />

                {/* Floating Meta Badges on Image */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10 gap-2">
                    {getStatusBadge()}

                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-[#0e0e12]/80 text-slate-200 border border-white/10 backdrop-blur-md shadow-sm">
                        {project.metricBadge}
                    </span>
                </div>

                {/* Hover Quick Action Overlay */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#0a0a0c]/40 backdrop-blur-sm z-20">
                    <Link
                        to={`/projects/${project._id}`}
                        className="px-4 py-2 rounded-full bg-[#c6f135] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-[#c6f135]/20 hover:scale-105 transition-all"
                    >
                        <span>Case Study</span>
                        <ArrowUpRight size={14} />
                    </Link>

                    {project.demoLink && (
                        <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 rounded-full bg-white/10 text-white font-medium text-xs hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center gap-1.5 transition-all"
                        >
                            <Globe size={13} />
                            <span>Live Preview</span>
                        </a>
                    )}
                </div>
            </div>

            {/* Content & Details Section */}
            <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between gap-6 bg-[#0e0e12]/50">
                <div className="flex flex-col gap-3">
                    {/* Role & Category */}
                    <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-slate-400">
                        <span className="text-[#c6f135] font-semibold">{project.category}</span>
                        <span>{project.role}</span>
                    </div>

                    {/* Title with Arrow Link */}
                    <Link
                        to={`/projects/${project._id}`}
                        className="group/title flex items-start justify-between gap-4 mt-1"
                    >
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover/title:text-[#c6f135] transition-colors duration-300 tracking-tight leading-tight">
                            {project.title}
                        </h3>
                        <div className="w-8 h-8 rounded-full border border-white/10 group-hover/title:border-[#c6f135] group-hover/title:bg-[#c6f135] group-hover/title:text-black flex items-center justify-center shrink-0 transition-all duration-300">
                            <ArrowUpRight size={16} className="group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-transform" />
                        </div>
                    </Link>

                    {/* Subtitle */}
                    <p className="text-xs text-slate-400 font-medium -mt-1 text-slate-350">
                        {project.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-slate-300/80 leading-relaxed line-clamp-2 mt-1">
                        {project.description}
                    </p>

                    {/* Highlights bullets */}
                    {project.highlights && project.highlights.length > 0 && (
                        <div className="mt-2 space-y-1.5 pt-2 border-t border-white/5">
                            {project.highlights.slice(0, 2).map((highlight, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                                    <CheckCircle2 size={13} className="text-[#c6f135] shrink-0 mt-0.5" />
                                    <span className="line-clamp-1">{highlight}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer: Tags and External Action links */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-white/[0.03] text-slate-300 border border-white/10 hover:border-[#c6f135]/40 hover:text-[#c6f135] transition-all select-none"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Card Actions Strip */}
                    <div className="flex items-center justify-between pt-2">
                        <Link
                            to={`/projects/${project._id}`}
                            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#c6f135] hover:text-white transition-colors"
                        >
                            <span>Explore Details</span>
                            <ArrowUpRight size={13} />
                        </Link>

                        <div className="flex items-center gap-2">
                            {project.githubLink && (
                                <a
                                    href={project.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="View Github repository"
                                    className="w-8 h-8 rounded-lg border border-white/10 hover:border-white/30 bg-white/[0.02] hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all"
                                >
                                    <Github size={14} />
                                </a>
                            )}
                            {project.demoLink && (
                                <a
                                    href={project.demoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="View Live site"
                                    className="w-8 h-8 rounded-lg border border-white/10 hover:border-[#c6f135]/40 bg-white/[0.02] hover:bg-[#c6f135]/10 flex items-center justify-center text-slate-300 hover:text-[#c6f135] transition-all"
                                >
                                    <Globe size={14} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
