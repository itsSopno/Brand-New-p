import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Zap, Code, Shield } from 'lucide-react';

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.reveal-item',
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const coreSkills = [
        { title: 'Frontend Technologies', skills: ['React', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit', 'GSAP', 'Next.js'] },
        { title: 'Backend & Database', skills: ['Node.js', 'Express', 'Mongoose', 'MongoDB', 'RESTful APIs', 'GraphQL'] },
        { title: 'Tools & DevOps', skills: ['Git', 'Docker', 'Vite', 'Postman', 'ESLint', 'CI/CD'] }
    ];

    const experience = [
        { year: '2024 - Present', role: 'Lead Frontend Developer', company: 'Digital Agency Inc.', desc: 'Spearheaded modern UI overhaul using NextJS and GSAP, improving performance benchmarks.' },
        { year: '2022 - 2024', role: 'Full Stack Engineer', company: 'Cloud solutions LLC', desc: 'Maintained and architected node rest APIs and reactive interfaces backed by MongoDB logs.' },
        { year: '2020 - 2022', role: 'Associate Software Engineer', company: 'Nexus Tech', desc: 'Assisted in building custom CRM dashboards and responsive HTML email systems.' }
    ];

    return (
        <div ref={containerRef} className="max-w-7xl mx-auto px-6 lg:px-12 py-12 flex flex-col gap-24">
            {/* Intro section */}
            <section className="grid md:grid-cols-5 gap-12 items-center">
                <div className="md:col-span-3 flex flex-col gap-6">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight reveal-item">
                        Who is <span className="text-gradient">BrandNewDay</span>?
                    </h1>
                    <p className="text-slate-400 leading-relaxed reveal-item text-lg">
                        I am Nabail, a passionate software developer specializing in crafting premium web interfaces and backends. I focus on creating high-performance applications that marry clean code design with sophisticated user interactions.
                    </p>
                    <p className="text-slate-405 text-slate-400 leading-relaxed reveal-item">
                        With solid expertise in both standard client architectures (React, GSAP, Tailwind) and full-stack services (Node, Express, MongoDB), I help bridge the gap between creative visual designs and high-fidelity code bases.
                    </p>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-6 reveal-item">
                        <div className="p-4 bg-white/5 border border-white/5 rounded-lg text-center">
                            <span className="block text-3xl font-black text-indigo-400">5+</span>
                            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1 block">Years Experience</span>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/5 rounded-lg text-center">
                            <span className="block text-3xl font-black text-pink-400">40+</span>
                            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1 block">Sites Launched</span>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/5 rounded-lg text-center">
                            <span className="block text-3xl font-black text-emerald-400">99%</span>
                            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1 block">Client Smiles</span>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/5 rounded-lg text-center">
                            <span className="block text-3xl font-black text-amber-400">24/7</span>
                            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1 block">Prompt Support</span>
                        </div>
                    </div>
                </div>

                {/* Profile Side Image block */}
                <div className="md:col-span-2 reveal-item relative group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-pink-500 rounded-2xl blur-[20px] opacity-25 group-hover:opacity-40 transition-opacity duration-500" />
                    <div className="relative border border-white/10 rounded-2xl aspect-[3/4] overflow-hidden bg-slate-900/60">
                        <img
                            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop"
                            alt="Nabail Developer portrait"
                            className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 ease-out"
                        />
                    </div>
                </div>
            </section>

            {/* Core skills */}
            <section className="flex flex-col gap-12 border-t border-white/5 pt-20">
                <div>
                    <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-2 reveal-item">Technical Expertise</h2>
                    <p className="text-slate-400 reveal-item">Selected technologies I work with regularly to build full-scale apps.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {coreSkills.map((category, idx) => (
                        <div key={idx} className="glass-panel border-white/5 p-8 rounded-xl flex flex-col gap-6 reveal-item">
                            <h3 className="text-lg font-bold text-white border-b border-white/5 pb-3 flex items-center gap-2">
                                {idx === 0 && <Zap size={18} className="text-indigo-400" />}
                                {idx === 1 && <Code size={18} className="text-pink-400" />}
                                {idx === 2 && <Shield size={18} className="text-emerald-400" />}
                                {category.title}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="text-xs px-3 py-1.5 rounded bg-white/5 border border-white/5 hover:border-white/15 text-slate-300 hover:text-white transition-all cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Experience history */}
            <section className="flex flex-col gap-12 border-t border-white/5 pt-20">
                <div>
                    <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-2 reveal-item">Career Pathway</h2>
                    <p className="text-slate-400 reveal-item">My professional development timeline and corporate achievements.</p>
                </div>

                <div className="flex flex-col gap-8 max-w-4xl">
                    {experience.map((item, idx) => (
                        <div key={idx} className="flex gap-6 reveal-item group">
                            <div className="flex flex-col items-center">
                                <div className="w-4 h-4 rounded-full border-2 border-indigo-500 bg-slate-900 group-hover:scale-125 transition-transform" />
                                <div className="w-0.5 h-full bg-white/5 mt-2" />
                            </div>
                            <div className="flex flex-col gap-2 pb-8">
                                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">{item.year}</span>
                                <h3 className="text-xl font-bold text-white">{item.role} <span className="text-slate-500 font-normal">at</span> {item.company}</h3>
                                <p className="text-sm text-slate-400 leading-relaxed mt-1">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
