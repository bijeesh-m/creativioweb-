"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { RevealSection } from "@/components/RevealAnimation";
import SectionHeader from "@/components/SectionHeader";
import AnimatedPortfolioSection from "./AnimatedPortfolioSection";
import { api } from "@/lib/api";

export default function PortfolioSection() {
    const [works, setWorks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorks = async () => {
            try {
                // 1. Try to get featured works first
                let response = await api.getPublicWorks({ featured: 'true', limit: '4' });

                // 2. Fallback to latest works if no featured ones exist
                if (!response.success || response.data.length === 0) {
                    response = await api.getPublicWorks({ limit: '4', sort: 'latest' });
                }

                if (response.success && response.data.length > 0) {
                    // Map API response to component structure
                    const mapped = response.data.map((work: any) => ({
                        title: work.title,
                        categories: work.categories,
                        tags: work.tags || work.categories.filter((c: string) => c !== 'All Projects').join(' · '),
                        image: work.image.url,
                        mediaType: work.image.mediaType,
                        tall: work.tall,
                        slug: work.slug
                    }));
                    setWorks(mapped);
                }
            } catch (error) {
                console.error("Failed to fetch works:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWorks();
    }, []);

    if (loading) return (
        <div className="h-screen bg-[#0A0A0A] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
    );

    if (works.length === 0) return null;

    return (
        <section id="portfolio" aria-label="Creativio digital marketing portfolio and case studies" className="bg-[#0A0A0A]">
            {/* Header */}
            <div className="py-24 lg:py-32">
                <div className=" mx-auto px-6 lg:px-24">
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
            <AnimatedPortfolioSection selectedProjects={works} />

            {/* CTA */}
            <div className="py-24 lg:py-32 bg-[#0A0A0A]">
                <div className="mx-auto px-6 lg:px-24 text-center">
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
