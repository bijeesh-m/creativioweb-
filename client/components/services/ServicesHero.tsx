"use client";

import { RevealSection } from "@/components/RevealAnimation";

export default function ServicesHero() {
    return (
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-[#0A0A0A]">
            <div className="mx-auto px-6 lg:px-24 text-center">
                <RevealSection>
                    <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-white/60 mb-6">
                        Our Capabilities
                    </p>
                </RevealSection>
                <RevealSection delay={100}>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-none tracking-tight max-w-3xl mx-auto">
                        Strategic Solutions for{" "}
                        <span className="font-sans text-accent italic  font-normal">Modern Brands</span>
                    </h1>
                </RevealSection>
                <RevealSection delay={200}>
                    <p className="mt-8 text-base text-white/70 leading-relaxed max-w-xl mx-auto">
                        We offer a comprehensive suite of digital services designed to
                        elevate your brand&apos;s presence and drive measurable growth in an
                        ever-evolving landscape.
                    </p>
                </RevealSection>
            </div>
        </section>
    );
}
