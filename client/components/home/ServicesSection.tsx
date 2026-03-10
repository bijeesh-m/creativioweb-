"use client";

import Link from "next/link";
import { RevealSection } from "@/components/RevealAnimation";
import { servicesData } from "@/data/services";

export default function ServicesSection() {
    return (
        <section id="services-overview" aria-label="Digital marketing services by Creativio" className="py-24 lg:py-32 bg-[#0A0A0A] text-white">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 border-b border-white/10 pb-8">
                    {/* Inline custom header to ensure it's dark-mode friendly */}
                    <div>
                        <RevealSection delay={100}>
                            <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-[#FF5A00] mb-4">
                                Our Expertise
                            </p>
                        </RevealSection>
                        <RevealSection delay={200}>
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#E6F0FF] leading-[1.1] -tracking-[0.02em]">
                                Sophisticated <br className="hidden sm:block" />
                                <span className="italic opacity-80">Digital Services</span>
                            </h2>
                        </RevealSection>
                    </div>

                    <RevealSection delay={300}>
                        <Link
                            href="/services"
                            id="services-link"
                            className="text-sm font-medium text-[#E6F0FF]/80 hover:text-[#FF5A00] transition-colors duration-400 group flex items-center gap-2 pb-2"
                        >
                            All Services
                            <span className="inline-block transition-transform duration-400 group-hover:translate-x-1">
                                →
                            </span>
                        </Link>
                    </RevealSection>
                </div>

                <div className="flex flex-col">
                    {servicesData.map((service, i) => (
                        <RevealSection key={service.id} delay={i * 100}>
                            <Link
                                href={`/services/${service.id}`}
                                className="group flex flex-col md:flex-row md:items-center justify-between py-10 md:py-14 border-b border-white/10 hover:border-white/30 transition-colors duration-500 relative"
                            >
                                {/* Hover background effect */}
                                <div className="absolute inset-0 bg-white/[0.02] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.18,1)] z-0" />

                                <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-12 lg:gap-24 md:w-2/3">
                                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#E6F0FF] group-hover:text-white transition-colors duration-500 leading-tight">
                                        {service.title}
                                    </h3>
                                </div>

                                <div className="relative z-10 flex items-center justify-between md:justify-end md:w-1/3 mt-6 md:mt-0 gap-8">
                                    <p className="text-sm text-white/50 max-w-[280px] group-hover:text-white/80 transition-colors duration-500 hidden md:block">
                                        {/* Truncate description to first sentence for a cleaner list look */}
                                        {service.shortDescription.split('.')[0]}.
                                    </p>
                                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full border border-white/10 group-hover:border-[#FF5A00] group-hover:bg-[#FF5A00] text-white/50 group-hover:text-white transition-all duration-500 transform group-hover:scale-110">
                                        <span className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-500 text-lg">
                                            →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </RevealSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
