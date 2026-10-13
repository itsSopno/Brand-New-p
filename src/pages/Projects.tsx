import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Sparkles, Filter } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import { PROJECTS_DATA, CATEGORIES, ProjectItem } from '../data/projectsData';

export default function Projects() {
    const [projects, setProjects] = useState<ProjectItem[]>(PROJECTS_DATA);
    const [loading, setLoading] = useState(false);
    const [activeFilter, setActiveFilter] = useState<string>('All Works');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setProjects(data);
                } else {
                    setProjects(PROJECTS_DATA);
                }
                setLoading(false);
            })
            .catch(() => {
                setProjects(PROJECTS_DATA);
                setLoading(false);
            });
    }, []);

    const filteredProjects = useMemo(() => {
        return projects.filter(p => {
            const matchesCategory = activeFilter === 'All Works' || p.category === activeFilter;
            const matchesSearch = searchQuery.trim() === '' ||
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesCategory && matchesSearch;
        });
    }, [projects, activeFilter, searchQuery]);

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 flex flex-col gap-10">
            {/* Top Back navigation */}
            <div className="flex items-center justify-between">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 hover:text-[#c6f135] transition-colors group"
                >
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Home</span>
                </Link>

                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#c6f135] animate-pulse" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#c6f135]">
                        Archive Directory • {projects.length} Entries
                    </span>
                </div>
            </div>

            {/* Header */}
            <div className="max-w-3xl">
                <div className="flex items-center gap-2.5 mb-3">
                    <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#c6f135] font-semibold">
                        [ SYSTEM ARCHIVE ]
                    </span>
                </div>
                <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-none mb-4">
                    Engineering{' '}
                    <span className="text-stroke-heavy text-white hover:text-[#c6f135] transition-colors">
                        Archive
                    </span>
                </h1>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                    Explore the complete collection of full-stack platforms, WebGL experiments, distributed microservices, and design systems.
                </p>
            </div>

            {/* Filter & Search Toolbar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/5">
                {/* Category Pills */}
                <div className="flex flex-wrap gap-2 items-center">
                    <div className="hidden sm:flex items-center gap-1.5 mr-1 text-slate-400 text-xs font-mono uppercase">
                        <Filter size={12} className="text-[#c6f135]" />
                        <span>Filter:</span>
                    </div>

                    {CATEGORIES.map((cat) => {
                        const count = cat === "All Works"
                            ? projects.length
                            : projects.filter(p => p.category === cat).length;
                        const isActive = activeFilter === cat;

                        return (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all duration-300 flex items-center gap-2 ${
                                    isActive
                                        ? 'bg-[#c6f135] text-black font-bold shadow-[0_0_15px_rgba(198,241,53,0.3)]'
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

                {/* Search Input */}
                <div className="relative min-w-[260px]">
                    <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by tech, keyword..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#121216] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#c6f135]/50 transition-colors font-mono"
                    />
                </div>
            </div>

            {/* Projects Grid */}
            {loading ? (
                <div className="flex flex-col justify-center items-center py-24 gap-4">
                    <div className="w-12 h-12 border-4 border-[#c6f135]/20 border-t-[#c6f135] rounded-full animate-spin" />
                    <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">Loading Archive...</p>
                </div>
            ) : filteredProjects.length === 0 ? (
                <div className="py-24 text-center glass-panel rounded-2xl border border-white/5 max-w-md mx-auto p-8">
                    <Sparkles className="w-8 h-8 text-[#c6f135] mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-white mb-1">No Projects Found</h3>
                    <p className="text-xs text-slate-400 mb-4">No records match your selected category or search keyword.</p>
                    <button
                        onClick={() => { setActiveFilter('All Works'); setSearchQuery(''); }}
                        className="px-5 py-2 rounded-full bg-[#c6f135] text-black text-xs font-mono font-bold hover:bg-white transition-all"
                    >
                        Reset All Filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project._id} project={project} />
                    ))}
                </div>
            )}
        </div>
    );
}
