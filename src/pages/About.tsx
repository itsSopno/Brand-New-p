import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.reveal-card',
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen pt-32 pb-12 px-6 flex flex-col items-center justify-center relative overflow-hidden bg-[#161616]">

            {/* Background Pattern - Rounded Rectangles to match reference */}
            <div className="absolute inset-0 z-0 flex flex-wrap gap-4 opacity-[0.03] scale-150 rotate-[-10deg]">
                {Array.from({ length: 400 }).map((_, i) => (
                    <div key={i} className="w-24 h-24 bg-white rounded-3xl" />
                ))}
            </div>

            <div className="absolute top-0 left-0 w-full h-[80vh] bg-gradient-to-b from-red-600/20 to-transparent pointer-events-none hidden" />

            <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row items-stretch justify-center -space-y-4 md:space-y-0 md:-space-x-12">

                {/* Left White Card */}
                <div className="reveal-card bg-white rounded-3xl p-10 md:p-14 w-full md:w-3/5 text-slate-900 shadow-2xl relative z-10 border border-slate-100 flex flex-col justify-between min-h-[460px]">
                    <div className="flex flex-col gap-10">
                        <div>
                            <h2 className="text-2xl font-black mb-3 text-[#1f2022] tracking-wide">BRIEF</h2>
                            <p className="text-[#3b3c3f] leading-relaxed text-[15px] md:text-base font-medium">
                                The project required a bleeding-edge frontend interface that perfectly balances aesthetic appeal with high-octane performance.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-black mb-3 text-[#1f2022] tracking-wide">APPROACH</h2>
                            <p className="text-[#3b3c3f] leading-relaxed text-[15px] md:text-base font-medium">
                                The foundation relies on modern web architectural patterns, including React, TypeScript, and fluid animations. By merging creative web design with robust engineering, we deliver digital experiences that captivate users and scale effortlessly.
                            </p>
                        </div>
                    </div>
                    <div className="mt-12 flex flex-col items-start max-w-full">
                        <span className="text-[#646669] font-semibold text-xl tracking-wide mb-1">Creative Engineering &</span>
                        <span className="text-[3.5rem] md:text-[4.5rem] font-black text-[#1b1c1e] tracking-tighter leading-none hover:text-[#250d68] transition-colors duration-300">DEVELOPMENT</span>
                    </div>
                </div>

                {/* Right Purple Card */}
                <div className="reveal-card bg-[#250d68] rounded-3xl p-10 md:p-14 w-full md:w-2/5 md:mt-24 shadow-[0_30px_60px_rgba(37,13,104,0.6)] relative z-20 md:border-l-0 border border-white/5 self-start hover:-translate-y-2 transition-transform duration-500 min-h-[300px]">
                    <h2 className="text-xl font-bold text-white mb-4 tracking-wider uppercase">OBJECTIVE</h2>
                    <p className="text-indigo-100/90 leading-relaxed text-[15px] md:text-base font-medium">
                        To architect a robust, scalable frontend ecosystem that prioritizes fluid user experience, lightning-fast performance, and seamlessly integrates complex backend services into a unified immersive web interface.
                    </p>
                </div>
            </div>

            {/* Bottom Bar attached to White Card layout */}
            <div className="reveal-card relative z-30 w-full md:w-auto md:max-w-4xl mx-auto md:ml-auto md:mr-auto -mt-4 md:-mt-[4.5rem] md:self-end md:pr-12 lg:pr-32 flex justify-center bg-white rounded-[2rem] px-8 py-8 shadow-2xl overflow-hidden md:translate-x-12 border-t border-slate-100/50">
                <div className="grid grid-cols-2 md:flex md:flex-row gap-6 md:gap-8 justify-between w-full">

                    <div className="flex flex-col md:px-4 md:border-r border-slate-200 w-full">
                        <span className="text-[11px] font-black text-[#1f2022] tracking-widest uppercase mb-2">VISION</span>
                        <span className="text-[#3b3c3f] text-[13px] font-semibold leading-tight">Build<br />interfaces<br />that scale</span>
                    </div>

                    <div className="flex flex-col md:px-4 md:border-r border-slate-200 w-full">
                        <span className="text-[11px] font-black text-[#1f2022] tracking-widest uppercase mb-2">MISSION</span>
                        <span className="text-[#3b3c3f] text-[13px] font-semibold leading-tight">Deliver<br />performance<br />through<br />code</span>
                    </div>

                    <div className="flex flex-col md:px-4 md:border-r border-slate-200 w-full">
                        <span className="text-[11px] font-black text-[#1f2022] tracking-widest uppercase mb-2">FOCUS</span>
                        <span className="text-[#3b3c3f] text-[13px] font-semibold leading-tight">Interactive<br />immersive web<br />design</span>
                    </div>

                    <div className="flex flex-col md:px-4 w-full">
                        <span className="text-[11px] font-black text-[#1f2022] tracking-widest uppercase mb-2">OUTCOME</span>
                        <span className="text-[#3b3c3f] text-[13px] font-semibold leading-tight">High-converting<br />user<br />experiences</span>
                    </div>

                </div>
            </div>

            {/* Ambient glows */}
            <div className="absolute top-1/2 right-[10%] w-[300px] h-[300px] bg-[#3f198f] rounded-full blur-[120px] opacity-40 mix-blend-screen pointer-events-none" />
        </div>
    );
}
