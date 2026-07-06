import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

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

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('All');

    useEffect(() => {
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => {
                setProjects(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch projects:', err);
                // Local fallback data
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
                    },
                    {
                        _id: 'mock3',
                        title: "Modern FinTech Analytics Dashboard",
                        description: "Real-time analytics engine tracking crypto indices with robust charting overlays.",
                        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
                        tags: ["TypeScript", "React", "Recharts", "Tailwind CSS", "Node.js"],
                        featured: false
                    }
                ]);
                setLoading(false);
            });
    }, []);

    const allTags = ['All', ...new Set(projects.flatMap(p => p.tags))];

    const filteredProjects = activeFilter === 'All'
        ? projects
        : projects.filter(p => p.tags.includes(activeFilter));

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 flex flex-col gap-12">
            <div className="max-w-xl">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-none mb-4">
                    All Projects
                </h1>
                <p className="text-slate-400">
                    Explore complete collection of custom development work, web designs, and API frameworks.
                </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-white/5 pb-6">
                {allTags.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => setActiveFilter(tag)}
                        className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${activeFilter === tag
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10'
                            : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => (
                        <div key={project._id} className="group border border-white/5 hover:border-white/10 bg-slate-900/30 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-500 hover:-translate-y-1">
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                            </div>

                            <div className="p-6 flex flex-col flex-grow justify-between gap-6">
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.tags.map((tag) => (
                                            <span key={tag} className="text-[9px] font-bold px-2 py-0.5 rounded bg-white/5 text-slate-400 select-none uppercase tracking-wider">{tag}</span>
                                        ))}
                                    </div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors mt-2">{project.title}</h3>
                                    <p className="text-xs text-slate-400 leading-relaxed mt-1">{project.description}</p>
                                </div>

                                <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/5">
                                    <Link
                                        to={`/projects/${project._id}`}
                                        className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-indigo-455 text-indigo-400 hover:text-white transition-colors"
                                    >
                                        Details
                                        <ArrowUpRight size={12} />
                                    </Link>

                                    <div className="flex gap-4">
                                        {project.githubLink && (
                                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white text-xs">
                                                GitHub
                                            </a>
                                        )}
                                        {project.demoLink && (
                                            <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-400 text-xs">
                                                Live Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
