"use client";

import Link from "next/link";

import Image from "next/image";
import { RevealSection } from "@/components/RevealAnimation";

import { servicesData } from "@/data/services";

export default function ServicesList() {
    return (
        <section className="py-20 lg:py-28 bg-[#0A0A0A]">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="space-y-24 lg:space-y-32">
                    {servicesData.map((service, i) => (
                        <div
                            key={service.title}
                            id={`service-${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                            className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${service.imageLeft ? "" : "lg:[direction:rtl]"
                                }`}
                        >
                            {/* Image */}
                            <RevealSection
                                animation={service.imageLeft ? "slide-left" : "slide-right"}
                                duration={1000}
                            >
                                <div className="img-zoom aspect-[4/3] rounded-sm overflow-hidden bg-white/5 lg:[direction:ltr]">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        width={700}
                                        height={525}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                            </RevealSection>

                            {/* Content */}
                            <div className="lg:[direction:ltr]">
                                <RevealSection>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-1.5 h-1.5 rounded-full bg-teal" />
                                        <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted">
                                            0{i + 1}
                                        </span>
                                    </div>
                                    <h2 className="text-3xl lg:text-4xl font-bold text-[#E6F0FF] leading-tight">
                                        {service.title}
                                    </h2>
                                </RevealSection>

                                <RevealSection delay={150}>
                                    <p className="mt-5 text-sm text-muted leading-relaxed">
                                        {service.shortDescription}
                                    </p>
                                </RevealSection>

                                <RevealSection delay={300}>
                                    <ul className="mt-7 space-y-2.5">
                                        {service.features.map((feature: string) => (
                                            <li
                                                key={feature}
                                                className="flex items-center gap-3 text-sm text-white/70"
                                            >
                                                <span className="w-1 h-1 rounded-full bg-teal flex-shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </RevealSection>

                                <RevealSection delay={400} className="mt-10">
                                    <Link
                                        href={`/services/${service.id}`}
                                        className="inline-flex items-center gap-3 group whitespace-nowrap"
                                    >
                                        <span className="font-serif italic text-lg text-[#E6F0FF] group-hover:text-accent transition-colors duration-300">
                                            Learn More
                                        </span>
                                        <span className="inline-block text-[#E6F0FF] group-hover:text-accent group-hover:translate-x-1 transition-all duration-400">
                                            →
                                        </span>
                                    </Link>
                                </RevealSection>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
