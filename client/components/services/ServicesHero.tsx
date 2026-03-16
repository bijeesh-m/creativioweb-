"use client";

import { RevealSection } from "@/components/RevealAnimation";

export default function ServicesHero() {
    return (
        <section className="relative min-h-[85vh] flex items-center justify-center bg-[#020202] overflow-hidden pt-20">
            {/* Elegant Atmospheric Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[10%] w-[60%] h-[60%] bg-accent/10 rounded-full blur-[180px] animate-pulse duration-[10s]" />
                <div className="absolute bottom-[-10%] right-[5%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[150px] animate-pulse duration-[12s] delay-1000" />
                <div className="absolute inset-0 bg-[#020202]/40" />
            </div>
            
            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-24 text-center">
                <RevealSection>
                    <div className="inline-flex items-center gap-4 mb-8 boarder border-white/5 bg-white/5 backdrop-blur-md px-6 py-2 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                        <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-white/50 block">
                            Our Capabilities
                        </span>
                    </div>
                </RevealSection>
                
                <h1 className="text-5xl sm:text-7xl lg:text-8xl  font-bold text-white uppercase leading-[0.85] mb-12 select-none">
                    <RevealSection delay={100} duration={1200}>
                        <span className="block transform hover:scale-[1.02] transition-transform duration-700">Strategic</span>
                    </RevealSection>
                    <RevealSection delay={200} duration={1200}>
                        <span className="block text-transparent bg-clip-text bg-linear-to-r from-white via-white to-white/20 transform hover:scale-[1.02] transition-transform duration-700">
                             <span className="font-sans italic font-normal text-accent lowercase mr-4 sm:mr-8 text-[0.8em]">Solutions</span>
                             for Brands
                        </span>
                    </RevealSection>
                </h1>
                
                <RevealSection delay={400} duration={1000}>
                    <p className="text-base md:text-lg lg:text-xl text-white/40 max-w-2xl mx-auto font-light leading-relaxed mb-16">
                        We offer a comprehensive suite of digital services designed to elevate your brand&apos;s presence and drive measurable growth in an ever-evolving landscape.
                    </p>
                </RevealSection>
                
                <RevealSection delay={600}>
                    <div className="flex flex-col items-center gap-4 opacity-30">
                        <div className="w-px h-20 bg-linear-to-b from-white to-transparent" />
                        <span className="text-[10px] tracking-widest uppercase font-mono">Scroll</span>
                    </div>
                </RevealSection>
            </div>
        </section>
    );
}
