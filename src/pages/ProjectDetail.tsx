import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Github, Globe, CheckCircle2, ShieldCheck, Lock } from 'lucide-react';
import { PROJECTS_DATA, ProjectItem } from '../data/projectsData';

export default function ProjectDetail() {
    const { id } = useParams<{ id: string }>();
    const [project, setProject] = useState<ProjectItem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/projects/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data && data.title) {
                    setProject(data);
                } else {
                    const fallback = PROJECTS_DATA.find(p => p._id === id) || PROJECTS_DATA[0];
                    setProject(fallback);
                }
                setLoading(false);
            })
            .catch(() => {
                const fallback = PROJECTS_DATA.find(p => p._id === id) || PROJECTS_DATA[0];
                setProject(fallback);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
                <div className="w-12 h-12 border-4 border-[#c6f135]/20 border-t-[#c6f135] rounded-full animate-spin" />
                <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">Loading Case Study...</p>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-24 text-center">
                <h2 className="text-3xl font-black text-white mb-4">Project Not Found</h2>
                <p className="text-slate-400 mb-6">The requested case study could not be located in the current archive.</p>
                <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#c6f135] text-black font-bold text-xs uppercase tracking-widest hover:bg-white transition-all"
                >
                    <ArrowLeft size={16} /> Back to Projects Archive
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-12 flex flex-col gap-10">
            {/* Top Navigation */}
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
                <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 hover:text-[#c6f135] transition-colors group"
                >
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Projects Archive</span>
                </Link>

                <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-[#c6f135] font-semibold tracking-wider">
                        {project.index} // 04
                    </span>
                    <span className="text-white/20">|</span>
                    <span className="text-[11px] font-mono text-slate-400 uppercase">
                        {project.category}
                    </span>
                </div>
            </div>

            {/* Title & Metadata Header */}
            <div className="space-y-4 max-w-4xl">
                <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold bg-[#c6f135]/10 text-[#c6f135] border border-[#c6f135]/30">
                        ● {project.status}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 tracking-wider">
                        {project.role}
                    </span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-none">
                    {project.title}
                </h1>

                <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
                    {project.subtitle || project.description}
                </p>
            </div>

            {/* Showcase Mockup Frame with Chrome Bar */}
            <div className="rounded-2xl border border-white/10 bg-[#0e0e12] overflow-hidden shadow-2xl">
                {/* Browser bar */}
                <div className="px-5 py-3 border-b border-white/5 bg-[#0a0a0d] flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded bg-white/[0.03] border border-white/5 text-[11px] text-slate-400 ml-3">
                            <Lock size={10} className="text-[#c6f135]" />
                            <span>https://{project.domainPreview}</span>
                        </div>
                    </div>
                    <span className="text-[10px] text-slate-500 uppercase">{project.metricBadge}</span>
                </div>

                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-center"
                    />
                </div>
            </div>

            {/* Grid: Overview & Specifications */}
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-12 pt-4">
                {/* Main Overview */}
                <div className="lg:col-span-3 flex flex-col gap-8">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-4 flex items-center gap-2">
                            <ShieldCheck className="text-[#c6f135]" size={20} />
                            Architectural Overview
                        </h2>
                        <p className="text-slate-300 leading-relaxed text-sm sm:text-base font-normal whitespace-pre-line">
                            {project.longDescription || project.description}
                        </p>
                    </div>

                    {project.highlights && project.highlights.length > 0 && (
                        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 space-y-4">
                            <h3 className="text-sm font-mono uppercase tracking-widest text-[#c6f135] font-bold">
                                Key Engineering Milestones
                            </h3>
                            <div className="space-y-3">
                                {project.highlights.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                                        <CheckCircle2 size={16} className="text-[#c6f135] shrink-0 mt-0.5" />
                                        <span className="leading-relaxed">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar Specifications */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="glass-panel border-white/10 p-7 rounded-2xl flex flex-col gap-6">
                        <h3 className="text-base font-bold text-white border-b border-white/5 pb-4 uppercase tracking-wider font-mono">
                            Technical Data
                        </h3>

                        <div className="space-y-5 text-sm">
                            <div className="flex items-center justify-between py-1 border-b border-white/5">
                                <span className="text-slate-400 font-mono text-xs uppercase">Release Year</span>
                                <span className="text-white font-mono text-xs">{project.year}</span>
                            </div>

                            <div className="flex items-center justify-between py-1 border-b border-white/5">
                                <span className="text-slate-400 font-mono text-xs uppercase">Category</span>
                                <span className="text-[#c6f135] font-mono text-xs">{project.category}</span>
                            </div>

                            <div className="flex items-center justify-between py-1 border-b border-white/5">
                                <span className="text-slate-400 font-mono text-xs uppercase">Role</span>
                                <span className="text-white font-mono text-xs">{project.role}</span>
                            </div>

                            <div className="flex flex-col gap-2 pt-1">
                                <span className="text-slate-400 font-mono text-xs uppercase">Tech Stack & Tools</span>
                                <div className="flex flex-wrap gap-1.5 mt-1">
                                    {project.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-white/[0.04] text-slate-300 border border-white/10"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-col gap-3 pt-4 border-t border-white/5">
                            {project.demoLink && (
                                <a
                                    href={project.demoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-3.5 rounded-xl bg-[#c6f135] hover:bg-white text-black font-extrabold text-center text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#c6f135]/15"
                                >
                                    <Globe size={15} />
                                    Launch Live Application
                                </a>
                            )}
                            {project.githubLink && (
                                <a
                                    href={project.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-3.5 rounded-xl bg-white/[0.03] hover:bg-white/10 text-white border border-white/10 font-bold text-center text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <Github size={15} />
                                    Inspect Source Code
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
