"use client";

import Link from "next/link";
import { RevealSection } from "@/components/RevealAnimation";

export default function CTASection() {
    return (
        <section
            id="cta"
            className="relative py-24 lg:py-32 bg-[#0A0A0A] overflow-hidden border-t border-white/5"
        >
            <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-[#FF5A00]/10 blur-3xl mix-blend-screen" />
            <div className="absolute -left-20 -bottom-20 w-72 h-72 rounded-full bg-[#E6F0FF]/5 blur-3xl mix-blend-screen" />

            <div className="relative mx-auto px-6 lg:px-24">
                <RevealSection duration={1100}>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#E6F0FF] leading-[1.05]">
                        Ready to make
                        <br />
                        <span className="font-sans italic font-normal text-accent">
                            history?
                        </span>
                    </h2>
                </RevealSection>

                <RevealSection delay={250}>
                    <div className="mt-10 flex flex-wrap items-center gap-6">
                        <Link
                            href="/contact"
                            id="cta-start-project"
                            className="inline-flex items-center px-8 py-3.5 text-[13px] font-semibold tracking-wider uppercase border-2 border-[#E6F0FF] text-[#E6F0FF] rounded-sm hover:bg-[#E6F0FF] hover:text-[#0A0A0A] transition-all duration-400 hover:-translate-y-0.5"
                        >
                            Start a Project
                        </Link>
                        <a
                            href="mailto:hello@creativio.in"
                            className="inline-flex items-center gap-2 text-sm text-[#E6F0FF]/60 hover:text-[#E6F0FF] transition-colors duration-400 group"
                        >
                            hello@creativio.in
                            <span className="inline-block transition-transform duration-400 group-hover:translate-x-1 text-accent">
                                →
                            </span>
                        </a>
                    </div>
                </RevealSection>
            </div>
        </section>
    );
}
