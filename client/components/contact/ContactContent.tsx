"use client";

import { useState } from "react";
import { RevealSection } from "@/components/RevealAnimation";

export default function ContactContent() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
        agreed: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Thank you for your message! We'll get back to you shortly.");
    };

    return (
        <>
            {/* Hero */}
            <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-[#0A0A0A]">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <RevealSection>
                        <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-accent mb-6">
                            Contact
                        </p>
                    </RevealSection>
                    <RevealSection delay={150} duration={1100}>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold text-[#E6F0FF] leading-[0.95]">
                            Start a{" "}
                            <span className="font-sans italic font-normal text-white/80">
                                Conversation
                            </span>
                        </h1>
                    </RevealSection>
                </div>
            </section>

            {/* Contact Info + Form */}
            <section className="pb-20 lg:pb-28 bg-[#0A0A0A] overflow-hidden">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <div className="grid lg:grid-cols-[380px_1fr] gap-16 lg:gap-24">
                        {/* Left - Contact Info */}
                        <div>
                            <RevealSection animation="slide-left" duration={900}>
                                <h2 className="font-sans italic text-2xl lg:text-3xl text-[#E6F0FF] mb-6">
                                    Get in Touch
                                </h2>
                                <p className="text-sm text-muted leading-relaxed mb-10">
                                    We are always open to discussing new projects, creative ideas,
                                    or opportunities to be part of your visions.
                                </p>

                                <div className="space-y-8">
                                    <div>
                                        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent mb-2">
                                            Email
                                        </p>
                                        <a
                                            href="mailto:mail@creativio.in"
                                            className="text-base font-sans italic text-slate-200 hover:text-accent transition-colors duration-300"
                                        >
                                            mail@creativio.in
                                        </a>
                                    </div>

                                    <div>
                                        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent mb-2">
                                            Phone
                                        </p>
                                        <a
                                            href="tel:+919876543210"
                                            className="text-base font-sans italic text-slate-200 hover:text-accent transition-colors duration-300"
                                        >
                                            +91 987 654 3210
                                        </a>
                                    </div>

                                    <div>
                                        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent mb-2">
                                            Address
                                        </p>
                                        <address className="text-sm text-slate-200 not-italic leading-relaxed">
                                            Near Calicut Airport, Kinfra Park Road, Vennayoor, Ayikkarapadi P.O, Malappuram Dt - 673637
                                        </address>
                                    </div>
                                </div>
                            </RevealSection>

                            {/* Google Maps Embed */}
                            <RevealSection delay={250} className="mt-12">
                                <div className="aspect-[4/3] rounded-sm overflow-hidden border border-border">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3853.098946552763!2d75.8978264749756!3d11.168430889005165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ccd6c9df56f637%3A0xe66c08c62cabfffc!2sCreativio%20Media%20and%20Advertising%20LLP!5e1!3m2!1sen!2sin!4v1773041416940!5m2!1sen!2sin"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Creativio Studio Location"
                                        className="w-full h-full"
                                    />
                                </div>
                            </RevealSection>
                        </div>

                        {/* Right - Form */}
                        <RevealSection animation="slide-right" delay={150} duration={900}>
                            <div className="bg-white/5 rounded-sm p-8 lg:p-12">
                                <h3 className="font-sans text-2xl lg:text-3xl text-[#E6F0FF] mb-10">
                                    Send an Inquiry
                                </h3>

                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                        <div>
                                            <label
                                                htmlFor="contact-name"
                                                className="block text-[11px] font-semibold tracking-[0.2em] uppercase text-muted mb-3"
                                            >
                                                Your Name
                                            </label>
                                            <input
                                                type="text"
                                                id="contact-name"
                                                value={formData.name}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, name: e.target.value })
                                                }
                                                className="w-full px-0 py-3 text-sm bg-transparent border-b border-white/10 focus:border-[#E6F0FF] outline-none transition-colors duration-300 text-white placeholder:text-white/40"
                                                placeholder="John Doe"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="contact-email"
                                                className="block text-[11px] font-semibold tracking-[0.2em] uppercase text-muted mb-3"
                                            >
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                id="contact-email"
                                                value={formData.email}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, email: e.target.value })
                                                }
                                                className="w-full px-0 py-3 text-sm bg-transparent border-b border-border focus:border-navy outline-none transition-colors duration-300 text-charcoal placeholder:text-muted/40"
                                                placeholder="john@company.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="contact-subject"
                                            className="block text-[11px] font-semibold tracking-[0.2em] uppercase text-muted mb-3"
                                        >
                                            Subject / Interest
                                        </label>
                                        <input
                                            type="text"
                                            id="contact-subject"
                                            value={formData.subject}
                                            onChange={(e) =>
                                                setFormData({ ...formData, subject: e.target.value })
                                            }
                                            className="w-full px-0 py-3 text-sm bg-transparent border-b border-border focus:border-navy outline-none transition-colors duration-300 text-charcoal placeholder:text-muted/40"
                                            placeholder="Branding, Web Development, etc."
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="contact-message"
                                            className="block text-[11px] font-semibold tracking-[0.2em] uppercase text-muted mb-3"
                                        >
                                            Tell Us About Your Project
                                        </label>
                                        <textarea
                                            id="contact-message"
                                            rows={4}
                                            value={formData.message}
                                            onChange={(e) =>
                                                setFormData({ ...formData, message: e.target.value })
                                            }
                                            className="w-full px-0 py-3 text-sm bg-transparent border-b border-border focus:border-navy outline-none transition-colors duration-300 text-charcoal resize-none placeholder:text-muted/40"
                                            placeholder="Tell us about your project, goals, and timeline..."
                                            required
                                        />
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-4">
                                        <label className="flex items-start gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.agreed}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, agreed: e.target.checked })
                                                }
                                                className="mt-0.5 accent-navy"
                                                id="contact-agree"
                                            />
                                            <span className="text-[12px] text-muted leading-relaxed">
                                                I agree to the processing of my personal data according
                                                to the privacy policy.
                                            </span>
                                        </label>

                                        <button
                                            type="submit"
                                            id="contact-submit"
                                            className="flex items-center gap-3 group whitespace-nowrap"
                                        >
                                            <span className="font-sans italic text-xl text-[#E6F0FF] group-hover:text-accent transition-colors duration-300">
                                                Send Message
                                            </span>
                                            <span className="inline-block text-[#E6F0FF] group-hover:text-accent group-hover:translate-x-1 transition-all duration-400">
                                                →
                                            </span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </RevealSection>
                    </div>
                </div>
            </section>
        </>
    );
}
