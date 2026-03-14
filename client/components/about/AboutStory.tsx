"use client";

import Image from "next/image";
import { RevealSection } from "@/components/RevealAnimation";

const stats = [
    { number: "50+", label: "Clients" },
    { number: "12", label: "Awards" },
    { number: "4", label: "Years" },
];

export default function AboutStory() {
    return (
        <section aria-label="Creativio story and achievements" className="py-20 lg:py-28 bg-[#0A0A0A]">
            <div className="mx-auto px-6 lg:px-24">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Image */}
                    <RevealSection animation="slide-left" duration={1000}>
                        <div className="relative aspect-3/4 rounded-sm overflow-hidden bg-white/5">
                            <Image
                                src="/images/about-3d-art.png"
                                alt="Creativio creative digital marketing and branding concept art"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                loading="lazy"
                            />
                            <div className="absolute bottom-6 left-6 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-sm">
                                <span className="text-xs font-semibold tracking-wider uppercase text-[#E6F0FF]">
                                    EST. 2024
                                </span>
                            </div>
                        </div>
                    </RevealSection>

                    {/* Content */}
                    <div className="lg:pt-12">
                        <RevealSection animation="slide-right" duration={1000}>
                            <blockquote className="font-sans italic text-xl lg:text-2xl text-[#E6F0FF] leading-relaxed mb-8">
                                &ldquo;We don&apos;t just build websites; we craft digital
                                ecosystems that breathe life into brands.&rdquo;
                            </blockquote>
                        </RevealSection>

                        <RevealSection animation="slide-right" delay={150}>
                            <p className="text-sm text-white/60 leading-relaxed mb-4">
                                At Creativio, we believe that the intersection of technology and
                                artistry is where true innovation happens. Our mission is to
                                elevate brands beyond the noise of the internet, creating
                                meaningful connections through impeccable design and strategic
                                storytelling.
                            </p>
                        </RevealSection>

                        <RevealSection animation="slide-right" delay={300}>
                            <div className="flex gap-12 mt-10 pt-8 border-t border-white/10">
                                {stats.map((stat) => (
                                    <div key={stat.label}>
                                        <span className="text-3xl lg:text-4xl font-bold text-[#E6F0FF]">
                                            {stat.number}
                                        </span>
                                        <p className="text-[11px] tracking-wider uppercase text-white/50 mt-1">
                                            {stat.label}
                                        </p>
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
