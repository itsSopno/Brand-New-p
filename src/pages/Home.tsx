import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Twitter,
    ArrowDown,
    Instagram,
    Youtube
} from 'lucide-react';

// Import refactored sub-components
import TechStack from '../components/TechStack';
import ProjectsShowcase from '../components/ProjectsShowcase';
import CTASection from '../components/CTASection';

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

// NOTE: Replace this image URL with your own local file path when ready, e.g., "/src/assets/my-photo.png"
const DEV_IMAGE = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop";

export default function Home() {
    const heroRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch featured projects
    useEffect(() => {
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => {
                const featured = data.filter((p: Project) => p.featured);
                setProjects(featured.length > 0 ? featured : data.slice(0, 3));
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch from API:', err);
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
                    }
                ]);
                setLoading(false);
            });
    }, []);

    // Scroll trigger & entry animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Hero card entrance
            tl.fromTo(cardRef.current,
                { scale: 0.95, y: 60, opacity: 0 },
                { scale: 1, y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' }
            );

            // Text content and big title entrance
            tl.fromTo('.hero-reveal-text',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
                '-=0.8'
            );

            // Dev portrait slide up
            tl.fromTo('.hero-dev-image',
                { y: 150, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
                '-=1'
            );

            // Floating glow animations
            gsap.to('.hero-glow', {
                x: 'random(-30, 30)',
                y: 'random(-30, 30)',
                duration: 6,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }, heroRef);

        return () => ctx.revert();
    }, [loading]);

    return (
        <div ref={heroRef} className="w-full bg-[#0d130a]">
            {/* Hero Section Container (Offsets global app margins to start at top:0) */}
            <section className="pb-[1000px] pr-[10px] ">
                <section className="relative h-screen w-full mt-[-5rem] flex flex-col justify-center overflow-hidden bg-[#caff21] rounded-tr-3xl rounded-tl-3xl rounded-br-3xl rounded-bl-3xl ">
                    {/* Neo-brutalist Dribbble-style Main Hero Card (Stretched to cover full screen) */}
                    <div
                        ref={cardRef}
                        className="relative z-10 w-full h-full bg-[#caff21] text-[#0d130a] p-6 pt-24 pb-20 md:p-12 md:pt-28 md:pb-24 flex flex-col justify-between overflow-hidden shadow-none transition-all duration-300"
                    >
                        {/* Background Repeat Text Watermark Overlay */}
                        <div className="absolute inset-0 flex flex-col justify-center gap-12 select-none pointer-events-none opacity-[0.06] text-[#0d130a] z-0">
                            <div className="text-[12vw] font-black uppercase text-center tracking-tighter whitespace-nowrap leading-none">
                                SNAP MASTER SNAP MASTER
                            </div>
                            <div className="text-[12vw] font-black uppercase text-center tracking-tighter whitespace-nowrap leading-none">
                                SNAP MASTER SNAP MASTER
                            </div>
                        </div>

                        {/* Big Background / Main Header Title */}
                        <div className="w-full text-center select-none z-10 relative">
                            <h1 className="hero-reveal-text text-[12vw] sm:text-[11vw] lg:text-[7.8vw] font-black tracking-tighter uppercase leading-[0.75] text-[#0d130a] m-0">
                                SNAP MASTER
                            </h1>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative flex-grow z-10">
                            {/* Left Column: Intro & Socials */}
                            <div className="lg:col-span-4 flex flex-col justify-between py-2 z-20">
                                <div className="hero-reveal-text flex flex-col gap-4">
                                    <p className="text-sm md:text-base font-semibold leading-relaxed max-w-[280px] text-[#0d130a]">
                                        What makes my photography unique is the combination of technical expertise and a personal touch
                                    </p>
                                </div>

                                {/* Minimal Social Buttons */}
                                <div className="hero-reveal-text flex items-center gap-2 mt-6 lg:mt-0">
                                    <a
                                        href="https://instagram.com"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-10 h-10 rounded-full border border-[#0d130a] flex items-center justify-center text-[#0d130a] hover:bg-[#0d130a] hover:text-[#caff21] transition-all duration-300"
                                        aria-label="Instagram"
                                    >
                                        <Instagram size={16} />
                                    </a>
                                    <a
                                        href="https://youtube.com"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-10 h-10 rounded-full border border-[#0d130a] flex items-center justify-center text-[#0d130a] hover:bg-[#0d130a] hover:text-[#caff21] transition-all duration-300"
                                        aria-label="YouTube"
                                    >
                                        <Youtube size={16} />
                                    </a>
                                    <a
                                        href="https://twitter.com"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-10 h-10 rounded-full border border-[#0d130a] flex items-center justify-center text-[#0d130a] hover:bg-[#0d130a] hover:text-[#caff21] transition-all duration-300"
                                        aria-label="Twitter/X"
                                    >
                                        <Twitter size={15} />
                                    </a>
                                </div>
                            </div>

                            {/* Middle Column: Avatar Cutout Graphic with Horizontal ghost frames */}
                            <div className="lg:col-span-4 flex items-end justify-center relative min-h-[220px] lg:min-h-0 z-10">
                                <div className="relative flex items-end justify-center h-full w-full max-w-[320px] mx-auto">
                                    {/* Ghost portrait 1 */}
                                    <img
                                        src={DEV_IMAGE}
                                        alt="Developer portrait cutout duplicate 1"
                                        className="absolute bottom-0 w-[170px] md:w-[210px] lg:w-[245px] opacity-15 filter grayscale transform -translate-x-[40px] pointer-events-none scale-95"
                                    />
                                    {/* Ghost portrait 2 */}
                                    <img
                                        src={DEV_IMAGE}
                                        alt="Developer portrait cutout duplicate 2"
                                        className="absolute bottom-0 w-[170px] md:w-[210px] lg:w-[245px] opacity-35 filter grayscale transform -translate-x-[20px] pointer-events-none scale-[0.98]"
                                    />
                                    {/* Main Developer Portrait */}
                                    <img
                                        src={DEV_IMAGE}
                                        alt="Nabil Hasan"
                                        className="hero-dev-image relative bottom-0 z-10 w-[170px] md:w-[210px] lg:w-[245px] object-contain object-bottom hover:scale-103 transition-transform duration-500 filter grayscale hover:grayscale-0"
                                    />
                                </div>
                            </div>

                            {/* Right Column: Bio & Action */}
                            <div className="lg:col-span-4 flex flex-col justify-between items-start lg:items-end py-2 z-20 text-left lg:text-right">
                                <div className="hero-reveal-text flex flex-col gap-4 lg:items-end">
                                    <p className="text-sm md:text-base font-semibold leading-relaxed max-w-[280px] text-[#0d130a]">
                                        Immerse yourself in a world where each frame tells a tale, capturing the beauty of the ordinary and the extraordinary
                                    </p>
                                </div>

                                {/* Scrolling Prompt Trigger */}
                                <div className="hero-reveal-text w-full flex lg:justify-end mt-6 lg:mt-0">
                                    <a
                                        href="#tech-section"
                                        className="w-11 h-11 rounded-full bg-[#0d130a] text-[#caff21] flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-black/10 cursor-pointer"
                                        aria-label="Scroll Down"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document.getElementById('tech-section')?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                    >
                                        <ArrowDown size={18} className="animate-bounce" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>

            {/* Technical Stack Section */}
            <TechStack />

            {/* Selected Projects Showcase */}
            <ProjectsShowcase projects={projects} loading={loading} />

            {/* CTA Section */}
            <CTASection />
        </div>
    );
}
