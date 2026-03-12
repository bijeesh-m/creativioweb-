"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RevealSection } from "@/components/RevealAnimation";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const processRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax effect for the main image
            gsap.to(imageContainerRef.current, {
                yPercent: -20,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });

            // Staggered reveal for process cards
            if (processRef.current) {
                const cards = processRef.current.querySelectorAll(".process-card");
                gsap.fromTo(
                    cards,
                    { y: 60, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: 0.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: processRef.current,
                            start: "top 80%",
                        },
                    }
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const processes = [
        {
            step: "01",
            title: "Discovery",
            desc: "We dive deep into your brand DNA and market landscape to find unique opportunities.",
        },
        {
            step: "02",
            title: "Strategy",
            desc: "Crafting a precision-engineered roadmap tailored to your specific growth goals.",
        },
        {
            step: "03",
            title: "Execution",
            desc: "Our creative and technical teams bring the vision to life with uncompromising quality.",
        },
        {
            step: "04",
            title: "Optimization",
            desc: "Continuous data-driven refinement to ensure maximum ROI and sustained impact.",
        },
    ];

    return (
        <section
            ref={containerRef}
            id="about"
            className="relative bg-[#0A0A0A] py-24 lg:py-40 overflow-hidden"
        >
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                    {/* Image Column */}
                    <div className="lg:col-span-5 relative">
                        <div
                            ref={imageContainerRef}
                            className="relative aspect-4/5 overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-700"
                        >
                            <Image
                                src="/images/about-premium.png"
                                alt="Creativio - Best Digital Marketing Agency in Calicut and Malappuram"
                                fill
                                className="object-cover scale-110"
                            />
                            {/* Decorative overlay */}
                            <div className="absolute inset-0 bg-accent/10 mix-blend-overlay" />
                        </div>
                        {/* Floating decorative element */}
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 border-r border-b border-accent/30 hidden lg:block" />
                    </div>

                    {/* Content Column */}
                    <div ref={textRef} className="lg:col-span-7">
                        <RevealSection delay={200}>
                            <p className="text-accent text-[11px] font-semibold tracking-[0.25em] uppercase mb-6">
                                The Creative Visionaries
                            </p>
                        </RevealSection>

                        <RevealSection delay={300}>
                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-8">
                                Scaling Brands Through <br />
                                <span className="text-accent italic font-normal">Expert Execution.</span>
                            </h2>
                        </RevealSection>

                        <RevealSection delay={400}>
                            <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-2xl">
                                At Creativio, we stand as the <span className="text-white font-bold">best digital marketing agency in Calicut and Malappuram</span>,
                                helping businesses dominate the digital landscape. We combine high-end aesthetic design with
                                performance-driven marketing to deliver unmatched results.
                            </p>
                        </RevealSection>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            <RevealSection delay={500}>
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-white">Why We Reign</h3>
                                    <p className="text-white/60 text-sm leading-relaxed">
                                        Our approach is rooted in data but driven by creativity. We don't just generate leads;
                                        we build lasting digital legacies for brands that demand excellence.
                                    </p>
                                </div>
                            </RevealSection>
                            <RevealSection delay={600}>
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-white">Impact Driven</h3>
                                    <p className="text-white/60 text-sm leading-relaxed">
                                        From high-conversion SEO to premium social storytelling, our strategies are
                                        precisely engineered to scale your audience and increase ROI.
                                    </p>
                                </div>
                            </RevealSection>
                        </div>
                    </div>
                </div>

                {/* Process Section */}
                <div className="mt-32 lg:mt-48">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                        <RevealSection>
                            <h2 className="text-3xl md:text-5xl font-bold text-white uppercase">
                                Our Blueprint <br />
                                <span className="text-accent/50 italic font-normal">For Success</span>
                            </h2>
                        </RevealSection>
                        <RevealSection delay={200}>
                            <p className="text-white/50 max-w-sm text-sm">
                                A systematic approach to digital dominance, ensuring every campaign is
                                measured, optimized, and impactful.
                            </p>
                        </RevealSection>
                    </div>

                    <div ref={processRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
                        {processes.map((item, index) => (
                            <div
                                key={index}
                                className="process-card bg-[#0A0A0A] p-8 lg:p-10 hover:bg-neutral-900/50 transition-colors duration-500 group"
                            >
                                <span className="text-accent text-xs font-mono mb-6 block opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500">
                                    {item.step}
                                </span>
                                <h4 className="text-xl font-bold text-white mb-4 group-hover:text-accent transition-colors duration-500">
                                    {item.title}
                                </h4>
                                <p className="text-white/50 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-1/4 -right-20 w-80 h-80 bg-accent/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-accent/5 blur-[120px] rounded-full" />
        </section>
    );
}
