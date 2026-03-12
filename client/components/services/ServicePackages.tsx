"use client";

import Link from "next/link";
import { RevealSection } from "@/components/RevealAnimation";

interface PackageProps {
    packages: {
        name: string;
        price: string;
        description: string;
        features: string[];
    }[];
}

export default function ServicePackages({ packages }: PackageProps) {
    return (
        <section className="py-24 lg:py-32 bg-[#0A0A0A] border-t border-white/10">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="text-center mb-16 lg:mb-24">
                    <RevealSection>
                        <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-accent mb-4">
                            Transparent Pricing
                        </p>
                    </RevealSection>
                    <RevealSection delay={150}>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#E6F0FF] leading-[1.05]">
                            Development{" "}
                            <span className="font-sans italic font-normal text-accent">
                                Packages
                            </span>
                        </h2>
                    </RevealSection>
                    <RevealSection delay={250}>
                        <p className="mt-6 text-base text-white/60 max-w-2xl mx-auto leading-relaxed">
                            Select the tier that aligns with your business goals. Need something custom? Let's talk.
                        </p>
                    </RevealSection>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {packages.map((pkg, i) => (
                        <RevealSection key={pkg.name} delay={i * 100}>
                            <div className="bg-white/5 p-8 lg:p-10 rounded-sm border border-white/10 h-full flex flex-col hover:border-[#E6F0FF] transition-colors duration-500 group relative overflow-hidden">

                                <div className="mb-8 relative z-10">
                                    <h3 className="text-xl font-bold text-[#E6F0FF] mb-4 leading-tight">{pkg.name}</h3>
                                    <div className="text-[13px] font-semibold tracking-wider text-accent uppercase mb-4">
                                        {pkg.price}
                                    </div>
                                    <p className="text-sm text-white/60 leading-relaxed line-clamp-3">
                                        {pkg.description}
                                    </p>
                                </div>

                                <div className="flex-grow relative z-10">
                                    <div className="h-[1px] w-full bg-white/10 mb-8" />
                                    <ul className="space-y-4 mb-8">
                                        {pkg.features.map((feat) => (
                                            <li key={feat} className="flex items-start gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                                                <span className="text-sm font-medium text-white/80">{feat}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-auto relative z-10">
                                    <Link
                                        href="/contact"
                                        className="inline-flex w-full items-center justify-center px-6 py-3.5 text-[12px] font-semibold tracking-wider uppercase border border-[#E6F0FF] text-[#E6F0FF] rounded-sm hover:bg-[#E6F0FF] hover:text-[#0A0A0A] transition-all duration-400"
                                    >
                                        Inquire Now
                                    </Link>
                                </div>
                            </div>
                        </RevealSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
