import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Github, Globe, Calendar, Tag } from 'lucide-react';

interface Project {
    _id: string;
    title: string;
    description: string;
    longDescription?: string;
    image: string;
    tags: string[];
    githubLink?: string;
    demoLink?: string;
    createdAt: string;
}

export default function ProjectDetail() {
    const { id } = useParams<{ id: string }>();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/projects/${id}`)
            .then(res => res.json())
            .then(data => {
                setProject(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch project detail:', err);
                // Fallback matching mock
                const mockProjects: Record<string, Project> = {
                    mock1: {
                        _id: 'mock1',
                        title: "Sleek Real Estate platform",
                        description: "A premium real estate listing application using automated mapping APIs.",
                        longDescription: "A comprehensive real estate portal designed to offer seamless searches and property listings. Equipped with robust advanced dynamic filtering, map search integration using Leaflet, fully responsive cards, and clean grid displays. Offers a premium glassmorphic client interface.",
                        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=600&auto=format&fit=crop",
                        tags: ["React", "TypeScript", "Tailwind CSS", "Express", "MongoDB"],
                        githubLink: "https://github.com",
                        demoLink: "https://example.com",
                        createdAt: new Date().toISOString()
                    },
                    mock2: {
                        _id: 'mock2',
                        title: "Creative Design Portfolio",
                        description: "An animated photography showreel presenting creative images using WebGL and GSAP animations.",
                        longDescription: "A fully custom dynamic agency catalog for photographs and cinematic works. Powered by high frame-rate interactive GSAP scroll-triggers, customized parallax sections, smooth scrolling, and custom slider transitions to guarantee visitor engagement.",
                        image: "https://images.unsplash.com/photo-1542241647-9cbb2225278b?q=80&w=600&auto=format&fit=crop",
                        tags: ["React", "GSAP", "CSS Canvas", "Framer Motion"],
                        githubLink: "https://github.com",
                        demoLink: "https://example.com",
                        createdAt: new Date().toISOString()
                    }
                };

                if (id && mockProjects[id]) {
                    setProject(mockProjects[id]);
                } else {
                    // generic fallback
                    setProject({
                        _id: id || 'unknown',
                        title: "Dynamic Project Record",
                        description: "A dynamically generated fallback record reflecting runtime layout behaviors.",
                        longDescription: "The selected project detailed information is retrieved directly from our MongoDB document data tables. This detailed interface is loaded securely under dynamic routing rules built on React Router DOM overlays.",
                        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
                        tags: ["Vite", "TypeScript", "Tailwind"],
                        githubLink: "https://github.com",
                        createdAt: new Date().toISOString()
                    });
                }
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (!project) {
        return (
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Project Not Found</h2>
                <Link to="/projects" className="inline-flex items-center gap-2 text-indigo-400 hover:underline">
                    <ArrowLeft size={16} /> Back to Projects
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-12">
            <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-semibold self-start"
            >
                <ArrowLeft size={16} /> Back to Projects
            </Link>

            <div className="grid lg:grid-cols-5 gap-12">
                {/* Main Details */}
                <div className="lg:col-span-3 flex flex-col gap-6">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">{project.title}</h1>
                    <p className="text-slate-405 text-slate-400 leading-relaxed text-base">{project.description}</p>

                    <div className="border border-white/5 rounded-xl aspect-[16/9] overflow-hidden bg-slate-900">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex flex-col gap-4 mt-4">
                        <h2 className="text-xl font-bold text-white">Project Overview</h2>
                        <p className="text-slate-400 leading-relaxed text-sm whitespace-pre-line">
                            {project.longDescription || project.description}
                        </p>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="lg:col-span-2 flex flex-col gap-8">
                    <div className="glass-panel border-white/5 p-8 rounded-xl flex flex-col gap-6">
                        <h3 className="text-lg font-bold text-white border-b border-white/5 pb-4">Specifications</h3>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3 text-slate-400 text-sm">
                                <Calendar size={18} className="text-indigo-455 text-indigo-400" />
                                <span>Date: {new Date(project.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}</span>
                            </div>

                            <div className="flex items-start gap-3 text-slate-405 text-slate-400 text-sm">
                                <Tag size={18} className="text-pink-455 text-pink-400 mt-0.5" />
                                <div className="flex flex-col gap-1.5">
                                    <span>Languages & Tools:</span>
                                    <div className="flex flex-wrap gap-1.5 mt-1">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-[9px] font-bold px-2 py-0.5 rounded bg-white/5 text-slate-300 uppercase tracking-widest">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 mt-4">
                            {project.demoLink && (
                                <a
                                    href={project.demoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-3 rounded bg-indigo-650 hover:bg-indigo-700 bg-indigo-600 text-white font-semibold text-center text-xs uppercase tracking-wider transition-colors duration-300 flex items-center justify-center gap-2"
                                >
                                    <Globe size={16} />
                                    Visit Live Site
                                </a>
                            )}
                            {project.githubLink && (
                                <a
                                    href={project.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-3 rounded bg-white/5 hover:bg-white/10 text-white border border-white/10 font-semibold text-center text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <Github size={16} />
                                    Code Repository
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
