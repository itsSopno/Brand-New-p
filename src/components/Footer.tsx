import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-white/5 py-12 px-6 mt-20 bg-[#0f0f13]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col items-center md:items-start gap-2">
                    <Link to="/" className="text-lg font-bold text-white flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white text-xs font-black">B</span>
                        <span>BrandNewDay</span>
                    </Link>
                    <p className="text-xs text-slate-500 mt-1">© {new Date().getFullYear()} BrandNewDay. All rights reserved.</p>
                </div>

                <div className="flex gap-6">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                        <Github size={20} />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                        <Linkedin size={20} />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                        <Twitter size={20} />
                    </a>
                    <a href="mailto:contact@example.com" className="text-slate-400 hover:text-white transition-colors">
                        <Mail size={20} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
