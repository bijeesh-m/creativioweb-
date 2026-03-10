"use client";

import { RevealSection } from "@/components/RevealAnimation";

export default function AboutHero() {
    return (
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-[#0A0A0A]">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <RevealSection>
                    <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-accent mb-6">
                        Our Essence
                    </p>
                </RevealSection>
                <RevealSection delay={150} duration={1100}>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold text-[#E6F0FF] leading-[0.95] tracking-tight max-w-4xl">
                        Redefining the
                        <br />
                        <span className="font-serif italic font-normal text-white/80">
                            Digital
                        </span>
                        <br />
                        <span className="font-serif italic font-normal text-white/80">
                            Landscape
                        </span>
                    </h1>
                </RevealSection>
            </div>
        </section>
    );
}
