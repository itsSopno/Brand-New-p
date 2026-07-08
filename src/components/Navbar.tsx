import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    const navLinks = [
        { title: 'Home', path: '/' },
        { title: 'About', path: '/about' },
        { title: 'Projects', path: '/projects' },
        { title: 'Contact', path: '/contact' },
    ];

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-nav-scrolled py-4 shadow-xl' : 'glass-nav py-6'}`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
                <Link to="/" className="text-xl font-bold flex items-center gap-2.5 group">
                    <span className="w-9 h-9 rounded bg-[#c6f135] flex items-center justify-center text-black text-base font-black transition-transform group-hover:rotate-12 duration-300">N</span>
                    <span className="tracking-tighter text-white font-extrabold text-lg uppercase select-none">Nabil<span className="text-[#c6f135]">.</span></span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`text-xs font-bold tracking-widest uppercase transition-colors duration-300 relative py-1 ${isActive(link.path) ? 'text-[#c6f135]' : 'text-slate-450 text-slate-400 hover:text-white'
                                }`}
                        >
                            {link.title}
                            {isActive(link.path) && (
                                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#c6f135] rounded-full" />
                            )}
                        </Link>
                    ))}

                    <Link
                        to="/contact"
                        className="ml-4 px-5 py-2.5 rounded bg-black hover:bg-[#c6f135] hover:text-black border border-[#c6f135]/30 hover:border-[#c6f135] text-white text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-lg shadow-black/20 flex items-center gap-1.5 neon-glow-btn group/btn"
                    >
                        Hire Me
                        <ArrowUpRight size={14} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </Link>
                </div>

                {/* Mobile menu trigger */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-slate-350 hover:text-[#c6f135] transition-colors focus:outline-none"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Links */}
            {isOpen && (
                <div className="md:hidden glass-panel absolute top-full left-0 w-full px-6 py-8 flex flex-col gap-6 border-b border-[#c6f135]/10 bg-[#0a0a0c]/90">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className={`text-lg font-bold uppercase tracking-wider transition-colors ${isActive(link.path) ? 'text-[#c6f135]' : 'text-slate-350 text-slate-300 hover:text-white'
                                }`}
                        >
                            {link.title}
                        </Link>
                    ))}
                    <Link
                        to="/contact"
                        onClick={() => setIsOpen(false)}
                        className="w-full text-center py-3.5 rounded bg-[#c6f135] text-black text-sm font-semibold tracking-wider uppercase transition duration-300"
                    >
                        Hire Me
                    </Link>
                </div>
            )}
        </nav>
    );
}
