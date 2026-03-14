"use client";

import { RevealSection } from "@/components/RevealAnimation";

interface ServiceDetailHeroProps {
    title: string;
    description: string;
}

export default function ServiceDetailHero({ title, description }: ServiceDetailHeroProps) {
    return (
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-[#0A0A0A]">
            <div className="mx-auto px-6 lg:px-24">
                <div className="max-w-4xl">
                    <RevealSection>
                        <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-accent mb-6">
                            Expertise
                        </p>
                    </RevealSection>

                    <RevealSection delay={100}>
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-8">
                            {title}
                        </h1>
                    </RevealSection>

                    <RevealSection delay={200}>
                        <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl font-sans">
                            {description}
                        </p>
                    </RevealSection>
                </div>
            </div>
        </section>
    );
}
