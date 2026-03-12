"use client";

import Link from "next/link";
import { RevealSection } from "@/components/RevealAnimation";

export default function AboutCTA() {
    return (
        <section className="relative py-28 lg:py-36 bg-[#0A0A0A] overflow-hidden">
            <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
            <div className="absolute -left-20 -bottom-20 w-72 h-72 rounded-full bg-teal/5 blur-3xl" />

            <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
                <RevealSection>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05]">
                        Ready to shape
                        <br />
                        <span className="font-sans italic font-normal text-accent">
                            the future?
                        </span>
                    </h2>
                </RevealSection>

                <RevealSection delay={100}>
                    <p className="mt-6 text-base text-white/60 max-w-md mx-auto leading-relaxed">
                        Join us on our journey or let us help you start yours. We are always
                        looking for the next big challenge.
                    </p>
                </RevealSection>

                <RevealSection delay={200} className="mt-10 flex flex-wrap items-center justify-center gap-4">
                    <Link
                        href="/contact"
                        id="about-cta-project"
                        className="inline-flex items-center px-8 py-3.5 text-[13px] font-semibold tracking-wider uppercase border-2 border-white text-white rounded-sm hover:bg-white hover:text-[#0A0A0A] transition-all duration-300"
                    >
                        Start a Project
                    </Link>
                    <Link
                        href="/about"
                        className="inline-flex items-center px-8 py-3.5 text-[13px] font-semibold tracking-wider uppercase border-2 border-white/30 text-white/70 rounded-sm hover:border-white hover:text-white transition-all duration-300"
                    >
                        Join the Team
                    </Link>
                </RevealSection>
            </div>
        </section>
    );
}
