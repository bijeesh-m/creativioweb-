"use client";

import Image from "next/image";
import { RevealSection } from "@/components/RevealAnimation";

export default function ServiceDetailContent({ service }: { service: any }) {
    return (
        <section className="py-20 lg:py-32 bg-[#0A0A0A]">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                    {/* Visual Side */}
                    <div className="order-2 lg:order-1 sticky top-32">
                        <RevealSection animation="slide-left" duration={1000}>
                            <div className="img-zoom aspect-[4/3] rounded-sm overflow-hidden bg-white/5">
                                <Image
                                    src={service.heroImage}
                                    alt={service.title}
                                    width={800}
                                    height={600}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                        </RevealSection>

                        <RevealSection delay={200}>
                            <div className="mt-12 bg-white/5 p-10 rounded-sm space-y-8">
                                <h3 className="font-serif italic text-2xl text-[#E6F0FF]">
                                    Key Capabilities
                                </h3>
                                <ul className="space-y-4">
                                    {service.features.map((feature: string, i: number) => (
                                        <li
                                            key={feature}
                                            className="flex items-center gap-4 text-base text-white/80 border-b border-white/10 pb-4 last:border-0 last:pb-0"
                                        >
                                            <span className="text-[10px] font-semibold text-accent">0{i + 1}</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </RevealSection>
                    </div>

                    {/* Content Side */}
                    <div className="order-1 lg:order-2 space-y-16">
                        <RevealSection animation="slide-right">
                            <h2 className="text-3xl lg:text-5xl font-bold text-[#E6F0FF] leading-tight">
                                Delivering Impact at <span className="font-serif italic font-normal text-accent">Scale</span>
                            </h2>
                            <p className="mt-8 text-base text-white/60 leading-relaxed font-sans">
                                {service.fullDescription}
                            </p>
                        </RevealSection>

                        <RevealSection animation="slide-right" delay={150}>
                            <h3 className="text-xl lg:text-2xl font-bold text-[#E6F0FF] leading-tight mb-8">
                                Why Partner With Us?
                            </h3>
                            <div className="space-y-6">
                                {service.benefits.map((benefit: string, index: number) => (
                                    <div key={index} className="flex gap-4 items-start">
                                        <div className="w-10 h-10 shrink-0 rounded-full bg-white/5 flex items-center justify-center mt-1">
                                            <div className="w-2 h-2 rounded-full bg-accent" />
                                        </div>
                                        <div>
                                            <p className="text-[15px] font-medium text-[#E6F0FF] leading-relaxed">
                                                {benefit}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </RevealSection>
                    </div>
                </div>
            </div>
        </section>
    );
}
