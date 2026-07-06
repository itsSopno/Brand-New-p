import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
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

    return (
        <nav className="fixed top-0 left-0 w-full z-50 glass-nav">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
                <Link to="/" className="text-xl font-bold flex items-center gap-2 group">
                    <span className="w-8 h-8 rounded bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white text-sm font-black transition-transform group-hover:rotate-12 duration-300">B</span>
                    <span className="tracking-tight text-white font-semibold">BrandNewDay</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`text-sm font-medium tracking-wide transition-colors duration-300 relative py-1 ${isActive(link.path) ? 'text-white' : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            {link.title}
                            {isActive(link.path) && (
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full" />
                            )}
                        </Link>
                    ))}

                    <Link
                        to="/contact"
                        className="ml-4 px-5 py-2.5 rounded bg-indigo-650 hover:bg-indigo-700 bg-indigo-600 text-white text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 flex items-center gap-1.5"
                    >
                        Hire Me
                        <ArrowUpRight size={14} />
                    </Link>
                </div>

                {/* Mobile menu trigger */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-slate-300 hover:text-white focus:outline-none"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Links */}
            {isOpen && (
                <div className="md:hidden glass-panel absolute top-20 left-0 w-full px-6 py-8 flex flex-col gap-6 border-b border-white/5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className={`text-lg font-medium transition-colors ${isActive(link.path) ? 'text-indigo-400' : 'text-slate-300 hover:text-white'
                                }`}
                        >
                            {link.title}
                        </Link>
                    ))}
                    <Link
                        to="/contact"
                        onClick={() => setIsOpen(false)}
                        className="w-full text-center py-3 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition duration-300"
                    >
                        Hire Me
                    </Link>
                </div>
            )}
        </nav>
    );
}
