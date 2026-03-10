"use client";

import Link from "next/link";
import { RevealSection } from "@/components/RevealAnimation";
import SectionHeader from "@/components/SectionHeader";
import AnimatedPortfolioSection from "./AnimatedPortfolioSection";
import { projectsData } from "@/data/projects";

// Select first 4 projects as "selected works"
const selectedProjects = projectsData.slice(0, 4);

export default function PortfolioSection() {
    return (
        <section id="portfolio" aria-label="Creativio digital marketing portfolio and case studies" className="bg-[#0A0A0A]">
            {/* Header */}
            <div className="py-24 lg:py-32">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <SectionHeader
                            eyebrow="Selected Works"
                            title="Curated"
                            titleAccent="Portfolio"
                            light
                        />
                        <RevealSection delay={200}>
                            <p className="text-sm text-[#E6F0FF]/60 max-w-sm leading-relaxed">
                                Explore our handpicked portfolio of transformative projects that showcase our expertise across digital marketing, branding, and web development.
                            </p>
                        </RevealSection>
                    </div>
                </div>
            </div>

            {/* Animated Portfolio */}
            <AnimatedPortfolioSection selectedProjects={selectedProjects} />

            {/* CTA */}
            <div className="py-24 lg:py-32 bg-[#0A0A0A]">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
                    <RevealSection>
                        <Link
                            href="/work"
                            id="view-full-archive"
                            className="inline-flex items-center gap-2 text-sm font-medium text-[#E6F0FF]/70 hover:text-[#E6F0FF] transition-colors duration-400 group"
                        >
                            View Full Archive
                            <span className="inline-block transition-transform duration-400 group-hover:translate-x-1 text-accent/80 group-hover:text-accent">
                                →
                            </span>
                        </Link>
                    </RevealSection>
                </div>
            </div>
        </section>
    );
}
