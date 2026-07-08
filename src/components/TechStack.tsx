import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layout, Command, Code, Database } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function TechStack() {
    const techRef = useRef<HTMLDivElement>(null);

    const techStack = [
        { name: 'Frontend Architecture', desc: 'React, TS, Tailwind CSS, High-end Micro-interactions.', icon: <Layout className="text-[#c6f135]" size={24} /> },
        { name: 'Creative Animations', desc: 'Fluid movement, GSAP, SVG morphs, WebGL & Canvas.', icon: <Command className="text-pink-400" size={24} /> },
        { name: 'Robust Backends', desc: 'Secure APIs, JWT, Middleware, Express.js & Node.', icon: <Code className="text-violet-400" size={24} /> },
        { name: 'Data Pipeline', desc: 'Databases, Mongoose mappings, Redis caching levels.', icon: <Database className="text-sky-400" size={24} /> }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
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
        }, techRef);

        return () => ctx.revert();
    }, []);

    return (
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
    );
}
