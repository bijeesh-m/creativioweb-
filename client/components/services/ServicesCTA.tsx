"use client";

import Link from "next/link";
import { RevealSection } from "@/components/RevealAnimation";

export default function ServicesCTA() {
    return (
        <section className="relative py-28 lg:py-36 bg-[#0A0A0A] overflow-hidden">
            <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-teal/5 blur-3xl" />
            <div className="absolute -left-20 -bottom-20 w-72 h-72 rounded-full bg-accent/5 blur-3xl" />

            <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
                <RevealSection>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05]">
                        Start Your{" "}
                        <span className="font-sans italic font-normal text-accent">
                            Project
                        </span>{" "}
                        Today
                    </h2>
                </RevealSection>

                <RevealSection delay={100}>
                    <p className="mt-6 text-base text-white/60 max-w-md mx-auto">
                        Ready to elevate your brand with our premium services? Let&apos;s
                        discuss how we can bring your vision to life.
                    </p>
                </RevealSection>

                <RevealSection delay={200} className="mt-10 flex flex-wrap items-center justify-center gap-4">
                    <Link
                        href="/contact"
                        id="services-cta"
                        className="inline-flex items-center px-8 py-3.5 text-[13px] font-semibold tracking-wider uppercase bg-teal text-white rounded-sm hover:bg-teal-dark transition-all duration-300"
                    >
                        Get in Touch
                    </Link>
                    <a
                        href="mailto:hello@creativio.in"
                        className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors group"
                    >
                        hello@creativio.in
                        <span className="inline-block transition-transform group-hover:translate-x-1">
                            →
                        </span>
                    </a>
                </RevealSection>
            </div>
        </section>
    );
}
