import { Link } from 'react-router-dom';

export default function CTASection() {
    return (
        <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-t border-white/5 text-center relative overflow-hidden rounded-3xl bg-gradient-to-tr from-indigo-950/10 to-[#c6f135]/5 border border-white/5 shadow-inner">
            <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-[#c6f135]/5 blur-[80px]" />
            <div className="relative z-10 max-w-2xl mx-auto py-8">
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">Have a project idea?</h2>
                <p className="text-slate-400 text-sm md:text-base mb-8 leading-relaxed max-w-lg mx-auto">
                    I am currently taking on new clients and project challenges. Let's arrange a brief discovery session to work out details.
                </p>
                <Link
                    to="/contact"
                    className="inline-flex items-center px-8 py-4 rounded bg-[#c6f135] hover:bg-[#b8f135] text-black font-bold uppercase tracking-widest text-xs transition duration-300 shadow-lg shadow-[#c6f135]/10"
                >
                    Start a Conversation
                </Link>
            </div>
        </section>
    );
}
