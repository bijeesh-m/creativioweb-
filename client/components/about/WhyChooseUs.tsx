"use client";

import { RevealSection } from "@/components/RevealAnimation";

const reasons = [
    {
        number: "01",
        title: "Creative Innovation",
        description:
            "We bring fresh, out-of-the-box ideas that make your brand stand out.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2L16.5 9.5L24 7L19 14L24 21L16.5 18.5L14 26L11.5 18.5L4 21L9 14L4 7L11.5 9.5L14 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        number: "02",
        title: "Targeted Strategies",
        description:
            "Our campaigns are tailored to reach the right audience at the right time.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="14" cy="14" r="7" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="14" cy="14" r="2.5" fill="currentColor" />
            </svg>
        ),
    },
    {
        number: "03",
        title: "Results-Driven Approach",
        description:
            "We focus on measurable outcomes to ensure your success and growth.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 22L10 14L16 18L24 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 6H24V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        number: "04",
        title: "Experienced Team",
        description:
            "Our skilled professionals bring years of industry knowledge to every project.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="14" cy="9" r="5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M4 25C4 20.0294 8.47715 16 14 16C19.5228 16 24 20.0294 24 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
    },
];

export default function WhyChooseUs() {
    return (
        <section aria-label="Why choose Creativio digital marketing agency" className="relative py-24 lg:py-32 bg-[#0A0A0A] overflow-hidden">
            {/* Ambient background glow effects */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/[0.04] blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-teal/[0.06] blur-[100px]" />

            <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
                {/* Header */}
                <div className="mb-16 lg:mb-20">
                    <RevealSection>
                        <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-accent mb-5">
                            Why Choose Us
                        </p>
                    </RevealSection>
                    <RevealSection delay={100}>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-2xl">
                            What sets us{" "}
                            <span className="font-serif italic font-normal text-accent">
                                apart
                            </span>
                        </h2>
                    </RevealSection>
                    <RevealSection delay={200}>
                        <p className="mt-5 text-sm text-white/50 leading-relaxed max-w-xl">
                            Creativio stands apart as more than just an advertising and digital
                            marketing agency — it&apos;s a team driven by strategy, creativity,
                            and accountability. Here&apos;s what makes us different:
                        </p>
                    </RevealSection>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px]">
                    {reasons.map((reason, i) => (
                        <RevealSection key={reason.title} delay={i * 120}>
                            <div className="group relative h-full p-8 lg:p-10 bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:bg-white/[0.08] transition-all duration-500 cursor-default">
                                {/* Top accent line on hover */}
                                <div className="absolute top-0 left-0 w-0 h-[2px] bg-gradient-to-r from-accent to-accent-light group-hover:w-full transition-all duration-700 ease-out" />

                                {/* Number watermark */}
                                <span className="absolute top-6 right-8 text-[64px] font-bold text-white/[0.03] leading-none select-none group-hover:text-white/[0.06] transition-colors duration-500">
                                    {reason.number}
                                </span>

                                {/* Icon */}
                                <div className="relative w-14 h-14 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-accent mb-8 group-hover:bg-accent/10 group-hover:border-accent/20 transition-all duration-500">
                                    {reason.icon}
                                </div>

                                {/* Content */}
                                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-accent transition-colors duration-400">
                                    {reason.title}
                                </h3>
                                <p className="text-sm text-white/40 leading-relaxed group-hover:text-white/60 transition-colors duration-500">
                                    {reason.description}
                                </p>

                                {/* Bottom arrow */}
                                <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <span className="text-accent text-sm">→</span>
                                </div>
                            </div>
                        </RevealSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
