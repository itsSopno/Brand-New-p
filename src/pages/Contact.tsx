import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [responseMsg, setResponseMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            setResponseMsg({ type: 'error', text: 'Please fill in all blanks.' });
            return;
        }

        setSubmitting(true);
        setResponseMsg(null);

        try {
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setResponseMsg({ type: 'success', text: data.message || 'Message sent! I will respond promptly.' });
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setResponseMsg({ type: 'error', text: data.message || 'Something went wrong. Please check again.' });
            }
        } catch (error) {
            setResponseMsg({ type: 'error', text: 'Unable to reach the server. Please try again later.' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 flex flex-col gap-12">
            <div className="max-w-xl">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-none mb-4">
                    Contact Me
                </h1>
                <p className="text-slate-400">
                    Have an exciting project layout or employment query? Drop a message below and I will check back shortly.
                </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-12 mt-4">
                {/* Contact Info */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="glass-panel border-white/5 p-8 rounded-xl flex flex-col gap-6">
                        <h3 className="text-lg font-bold text-white border-b border-white/5 pb-4">Reach Details</h3>

                        <div className="flex flex-col gap-6">
                            <div className="flex gap-4 items-start">
                                <div className="w-10 h-10 rounded-lg bg-indigo-505 bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-white">Email Address</h4>
                                    <p className="text-xs text-slate-400 mt-1">contact@example.com</p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="w-10 h-10 rounded-lg bg-pink-505 bg-pink-500/10 flex items-center justify-center text-pink-400 shrink-0">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-white">Phone Support</h4>
                                    <p className="text-xs text-slate-400 mt-1">+1 (555) 0199-234</p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="w-10 h-10 rounded-lg bg-emerald-505 bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-white">Work Base</h4>
                                    <p className="text-xs text-slate-400 mt-1">San Francisco, California</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-3">
                    <form onSubmit={handleSubmit} className="glass-panel border-white/5 p-8 rounded-xl flex flex-col gap-6">
                        <h3 className="text-lg font-bold text-white border-b border-white/5 pb-4">Send Message</h3>

                        {responseMsg && (
                            <div className={`p-4 rounded-lg flex items-start gap-3 border ${responseMsg.type === 'success'
                                    ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                                    : 'bg-red-950/20 border-red-500/30 text-red-300'
                                }`}>
                                {responseMsg.type === 'success' ? <CheckCircle2 size={18} className="shrink-0 mt-0.5" /> : <AlertCircle size={18} className="shrink-0 mt-0.5" />}
                                <span className="text-xs font-medium">{responseMsg.text}</span>
                            </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name" className="text-xs font-semibold text-slate-405 text-slate-400 uppercase tracking-widest">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. John Doe"
                                    className="px-4 py-3 rounded bg-white/5 border border-white/5 hover:border-white/10 focus:border-indigo-500 focus:outline-none text-sm text-white transition-colors"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="text-xs font-semibold text-slate-405 text-slate-400 uppercase tracking-widest">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="e.g. john@example.com"
                                    className="px-4 py-3 rounded bg-white/5 border border-white/5 hover:border-white/10 focus:border-indigo-500 focus:outline-none text-sm text-white transition-colors"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="subject" className="text-xs font-semibold text-slate-405 text-slate-400 uppercase tracking-widest">Subject Line</label>
                            <input
                                type="text"
                                name="subject"
                                id="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="How can I help you?"
                                className="px-4 py-3 rounded bg-white/5 border border-white/5 hover:border-white/10 focus:border-indigo-500 focus:outline-none text-sm text-white transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="message" className="text-xs font-semibold text-slate-405 text-slate-400 uppercase tracking-widest">Detailed Message</label>
                            <textarea
                                name="message"
                                id="message"
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell me more about your project needs..."
                                className="px-4 py-3 rounded bg-white/5 border border-white/5 hover:border-white/10 focus:border-indigo-500 focus:outline-none text-sm text-white resize-none transition-colors"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="mt-2 py-3.5 px-6 rounded bg-indigo-650 hover:bg-indigo-750 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs tracking-wider uppercase transition-colors duration-300 w-full md:w-auto self-start shadow-xl shadow-indigo-600/10 hover:shadow-indigo-600/25 flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {submitting ? 'Sending Request...' : 'Send Message'}
                            <Send size={14} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
