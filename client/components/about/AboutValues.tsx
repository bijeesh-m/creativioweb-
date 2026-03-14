"use client";

import { RevealSection } from "@/components/RevealAnimation";
import SectionHeader from "@/components/SectionHeader";

const values = [
    {
        icon: "◆",
        title: "Innovation First",
        description:
            "We constantly challenge the status quo, exploring new technologies and creative methodologies to keep our clients ahead of the curve.",
    },
    {
        icon: "⊞",
        title: "Strategic Depth",
        description:
            "Design without strategy is just art. We ground every creative decision in robust data and consumer psychology.",
    },
    {
        icon: "◉",
        title: "Radical Accountability",
        description:
            "We take full ownership of our work and results. Transparency is the backbone of our client relationships.",
    },
];

export default function AboutValues() {
    return (
        <section className="py-20 lg:py-28 bg-transparent">
            <div className="mx-auto px-6 lg:px-24">
                <div className="grid lg:grid-cols-[300px_1fr] gap-16">
                    <SectionHeader title="Our Core" titleAccent="Values" light />

                    <div className="space-y-12">
                        {values.map((value, i) => (
                            <RevealSection key={value.title} delay={i * 150}>
                                <div className="flex gap-6 items-start group">
                                    <div className="shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#E6F0FF] group-hover:bg-accent group-hover:text-black transition-all duration-300 shadow-sm">
                                        <span className="text-sm">{value.icon}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-[#E6F0FF] mb-2">
                                            {value.title}
                                        </h3>
                                        <p className="text-sm text-white/60 leading-relaxed max-w-lg">
                                            {value.description}
                                        </p>
                                    </div>
                                </div>
                            </RevealSection>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
