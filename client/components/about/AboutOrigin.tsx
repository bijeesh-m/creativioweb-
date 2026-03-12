"use client";

import Image from "next/image";
import Link from "next/link";
import { RevealSection } from "@/components/RevealAnimation";

export default function AboutOrigin() {
    return (
        <section aria-label="About Creativio - Digital Marketing Agency" className="py-20 lg:py-28 bg-[#0A0A0A]">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="bg-white/5 border border-white/10 rounded-sm p-8 lg:p-14">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Content */}
                        <div>
                            <RevealSection>
                                <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-accent mb-4">
                                    About Us
                                </p>
                                <h2 className="text-3xl lg:text-4xl font-bold text-[#E6F0FF] leading-tight">
                                    What is{" "}
                                    <span className="font-sans italic font-normal">Creativio</span>
                                </h2>
                            </RevealSection>

                            <RevealSection delay={100}>
                                <p className="mt-6 text-sm text-white/60 leading-relaxed">
                                    Best Digital Marketing Agency in Calicut and Malappuram. We craft result-driven digital marketing, branding, and creative strategies that help businesses stand out, scale up, and succeed across Kerala and beyond.
                                </p>
                            </RevealSection>

                            <RevealSection delay={200}>
                                <Link
                                    href="/journal"
                                    className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-white transition-colors group"
                                >
                                    Read Our Full Journal
                                    <span className="inline-block transition-transform group-hover:translate-x-1">
                                        →
                                    </span>
                                </Link>
                            </RevealSection>
                        </div>

                        {/* Images */}
                        <RevealSection animation="slide-right" delay={200}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="aspect-[3/4] rounded-sm overflow-hidden bg-white/5">
                                    <Image
                                        src="/images/azure-heights.png"
                                        alt="Creativio digital marketing agency workspace in Calicut"
                                        width={300}
                                        height={400}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="aspect-[3/4] rounded-sm overflow-hidden bg-white/5 mt-8">
                                    <Image
                                        src="/images/lusso-living.png"
                                        alt="Creativio creative team work environment in Kerala"
                                        width={300}
                                        height={400}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </RevealSection>
                    </div>
                </div>
            </div>
        </section>
    );
}
