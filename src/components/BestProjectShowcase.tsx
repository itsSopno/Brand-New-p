import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import sinnersImg from './apple.png';

gsap.registerPlugin(ScrollTrigger);

export default function BestProjectShowcase() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.editorial-reveal',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 1, stagger: 0.12,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%'
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full border-t border-white/5 relative z-10 flex flex-col lg:flex-row overflow-hidden min-h-[90vh]">

            {/* Left Side: Data Sheet */}
            <div className="w-full lg:w-[42%] flex flex-col justify-between p-8 md:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-white/5 relative gap-16">

                {/* Top label + title */}
                <div className="editorial-reveal flex flex-col gap-10 relative z-10">
                    <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#c6f135] animate-pulse" />
                        <span className="text-[9px] font-black text-[#c6f135] uppercase tracking-[0.25em]">
                            Flagship Project
                        </span>
                    </div>

                    <div>
                        <h2 className="text-[4.5rem] sm:text-[5.5rem] lg:text-[7rem] font-black text-white uppercase tracking-tighter leading-[0.82]">
                            <span className="block">Sinners</span>
                            <span className="block text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.25)' }}>
                                Tech
                            </span>
                        </h2>
                    </div>
                </div>

                {/* Data Rows */}
                <div className="editorial-reveal flex flex-col gap-0 relative z-10">
                    {[
                        { label: 'Year', value: '2024' },
                        { label: 'Services', value: 'Full-Stack Dev\nSystem Architecture' },
                        { label: 'Stack', value: 'Next.js / Node\nSocket.io / MongoDB', accent: true },
                        { label: 'Features', value: 'E-Commerce\nReal-time Uplink\nCMS Dashboard' },
                    ].map(({ label, value, accent }) => (
                        <div key={label} className="grid grid-cols-[100px_1fr] gap-6 border-t border-white/5 py-5">
                            <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-[0.18em] pt-0.5">{label}</span>
                            <span className={`text-[10px] font-semibold uppercase tracking-widest leading-loose whitespace-pre-line ${accent ? 'text-[#c6f135]' : 'text-white'}`}>
                                {value}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Bottom paragraph + CTA */}
                <div className="editorial-reveal flex flex-col gap-8 relative z-10">
                    <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed max-w-xs">
                        A next-generation community platform and e-commerce storefront engineered for custom keyboard and premium tech enthusiasts.
                    </p>
                    <button className="self-start flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#c6f135] text-black font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white transition-colors duration-300 group shadow-[0_0_30px_rgba(198,241,53,0.25)]">
                        Explore Case Study
                        <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Right Side: Full-bleed image */}
            <div className="w-full lg:w-[58%] relative min-h-[60vw] lg:min-h-full group overflow-hidden">

                <img
                    src={sinnersImg}
                    alt="Sinners Tech — flat lay"
                    className="w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-1000 ease-out"
                />

                {/* Left blend so it merges into the dark left panel seam */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#161616]/60 via-transparent to-transparent pointer-events-none" />

                {/* Bottom label strip */}
                <div className="absolute bottom-8 left-8 editorial-reveal flex gap-6 pointer-events-none">
                    {['Storefront', 'Social', 'Studio'].map(tag => (
                        <span key={tag} className="text-[9px] font-bold text-white/50 uppercase tracking-[0.2em]">{tag}</span>
                    ))}
                </div>
            </div>

        </section>
    );
}
