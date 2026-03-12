"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { RevealSection } from "@/components/RevealAnimation";

const heroWords = ["Business", "Audience", "Impact", "Growth", "Brand"];

export default function HeroSection() {
    const [wordIndex, setWordIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setWordIndex((prev) => (prev + 1) % heroWords.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            id="hero"
            aria-label="Creativio - Best Digital Marketing Agency in Calicut and Malappuram"
            className="relative  min-h-[100svh] flex items-center overflow-hidden bg-[#0A0A0A]"
        >
            {/* Background Image Container — Desktop: right-aligned overlap, Mobile: full bottom with gradient */}
            <div className="absolute inset-0 md:inset-y-0 md:right-0 md:left-auto md:w-[70%] z-0">
                <RevealSection
                    animation="scale-in"
                    delay={200}
                    duration={1500}
                    className="w-full h-full relative"
                >
                    {/* 
                      Performance Note: 
                      We use the previous static image as the 'poster'. 
                      This ensures the Largest Contentful Paint (LCP) remains fast 
                      while the video loads in the background. 
                    */}
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster="/images/hero-sculpture.png"
                        className="w-full h-full object-cover object-center md:object-right-top opacity-90"
                    >
                        <source src="/videos/8721928-uhd_4096_2160_25fps.mp4" type="video/mp4" />
                    </video>
                </RevealSection>
                {/* Mobile: strong bottom-to-top gradient to keep text readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/90 to-[#0A0A0A]/30 md:hidden z-10" />
                {/* Desktop: left edge blend */}
                <div className="hidden md:block absolute inset-y-0 left-0 w-[45%] bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-10" />
                {/* Desktop: bottom edge blend */}
                <div className="hidden md:block absolute left-0 right-0 bottom-0 h-32 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent z-10" />
            </div>

            <div className="relative z-20 max-w-[1400px] mx-auto px-6 lg:px-12 pt-28 pb-16 md:pt-[18vh] md:pb-[12vh] w-full min-h-[100svh] flex flex-col justify-end md:justify-center">
                {/* Left rotated text (EST. 2024 - GLOBAL) — Desktop only */}
                <div className="hidden lg:block absolute left-12 top-1/2 -translate-y-1/2">
                    <div className="-rotate-90 origin-left whitespace-nowrap">
                        <RevealSection delay={0}>
                            <span className="text-[9px] font-semibold tracking-[0.25em] uppercase text-white/50">
                                EST. 2024 · GLOBAL
                            </span>
                        </RevealSection>
                    </div>
                </div>

                <div className="max-w-[1000px] lg:pl-[120px]">
                    {/* Eyebrow — Mobile visible */}
                    <RevealSection delay={100}>
                        <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-accent mb-4 md:mb-6">
                            Digital Marketing Agency · Calicut
                        </p>
                    </RevealSection>

                    {/* Main Title — Responsive sizing */}
                    <RevealSection delay={200} duration={1200}>
                        <h1 className="text-[2.8rem] sm:text-[4rem] md:text-[5.5rem] lg:text-[8rem] uppercase font-quizlo font-black text-white leading-none lg:leading-[1.2] -tracking-[0.03em]">
                            Scale your<br />
                            <span className="relative inline-block overflow-hidden! h-[1.1em] align-top pr-4">
                                {/* Invisible word to expand container to max required width */}
                                <span className="invisible italic  block">Audiencehellow</span>
                                {heroWords.map((word, idx) => {
                                    // Handle wrapping logic so the transition from last to first is smooth
                                    let positionClasses = "opacity-0 translate-y-full uppercase";
                                    let transitionClass = "transition-all duration-700 uppercase  ease-[cubic-bezier(0.77,0,0.18,1)]";

                                    if (idx === wordIndex) {
                                        // Bright VR-orange to match the background video visor
                                        positionClasses = "opacity-100 translate-y-0 uppercase text-accent";
                                    } else if (
                                        idx === wordIndex - 1 ||
                                        (wordIndex === 0 && idx === heroWords.length - 1)
                                    ) {
                                        // Previous word going up
                                        positionClasses = "opacity-0 -translate-y-[120%]";
                                    } else if (
                                        idx === wordIndex + 1 ||
                                        (wordIndex === heroWords.length - 1 && idx === 0)
                                    ) {
                                        // Next word coming from bottom 
                                        positionClasses = "opacity-0 translate-y-[120%]";
                                        // Take away transition for the one being put to the bottom so it jumps instantly
                                        if (wordIndex !== heroWords.length - 1 || idx !== 0) {
                                            transitionClass = "transition-all duration-700 ease-[cubic-bezier(0.77,0,0.18,1)]";
                                        } else {
                                            transitionClass = "transition-none";
                                        }
                                    } else {
                                        // Stay at bottom without transition
                                        positionClasses = "opacity-0 translate-y-[120%]";
                                        transitionClass = "transition-none";
                                    }

                                    return (
                                        <span
                                            key={idx}
                                            className={`absolute left-0 top-0 italic capitalize block w-full ${positionClasses} ${transitionClass}`}
                                        >
                                            {word}
                                        </span>
                                    );
                                })}
                            </span>
                        </h1>
                    </RevealSection>

                    {/* Subtext */}
                    <RevealSection delay={400}>
                        <p className="mt-6 sm:mt-8 md:mt-14 max-w-[340px] text-[15px] font-medium text-white/70 leading-[1.6]">
                            With result-driven digital marketing, branding, and execution trusted by brands across Kerala.
                        </p>
                    </RevealSection>

                    {/* CTA Buttons — visible on all screens */}
                    <RevealSection delay={500}>
                        <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-4">
                            <Link
                                href="/contact"
                                id="hero-start-project"
                                className="inline-flex items-center px-7 py-3 text-[12px] font-semibold tracking-wider uppercase bg-accent text-navy rounded-sm hover:bg-white transition-colors duration-300"
                            >
                                Start a Project
                            </Link>
                            <Link
                                href="/work"
                                id="hero-explore-work"
                                className="group inline-flex items-center gap-2 px-7 py-3 text-[12px] font-semibold tracking-wider uppercase border border-white/20 text-white rounded-sm hover:border-white hover:bg-white hover:text-navy transition-all duration-300"
                            >
                                Our Work
                                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                            </Link>
                        </div>
                    </RevealSection>
                </div>

                {/* Explore Projects link floating at right — Desktop only */}
                <div className="hidden lg:flex absolute right-12 bottom-0 top-0 items-center justify-end">
                    <RevealSection delay={600}>
                        <Link
                            href="/work"
                            className="group flex flex-row items-center gap-2 mt-40"
                        >
                            <span className="font-sans italic text-[15px] text-white group-hover:text-accent transition-colors">Explore Projects</span>
                            <span className="text-xl text-white opacity-80 group-hover:text-accent group-hover:translate-x-1 transition-all">↗</span>
                        </Link>
                    </RevealSection>
                </div>

                {/* Scroll indicator — Desktop only */}
                <div className="hidden lg:block absolute right-10 bottom-12">
                    <div className="flex flex-col items-center gap-10">
                        <span className="rotate-90 origin-center text-[9px] tracking-[0.2em] font-semibold uppercase text-white/50 whitespace-nowrap mb-6">SCROLL</span>
                        <div className="w-[1px] h-12 bg-white/20" />
                    </div>
                </div>
            </div>
        </section>
    );
}
