"use client";

import Link from "next/link";
import Image from "next/image";
import { RevealSection } from "@/components/RevealAnimation";
import SectionHeader from "@/components/SectionHeader";

const articles = [
    {
        category: "STRATEGY",
        date: "NOV 24",
        title: "The Future of AI in Digital Marketing: 2024 Trends",
        href: "/journal",
        image: "/images/future-tech.png",
    },
    {
        category: "BRANDING",
        date: "NOV 24",
        title: "Building a Cohesive Brand Identity for Scale",
        href: "/journal",
        image: "/images/services-branding.png",
    },
    {
        category: "CULTURE",
        date: "NOV 24",
        title: "Why Agency Culture Matters for Client Success",
        href: "/journal",
        image: "/images/services-digital-marketing.png",
    },
];

export default function InsightsSection() {
    return (
        <section id="insights" className="py-24 lg:py-32 bg-[#0A0A0A]">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
                    <SectionHeader eyebrow="Journal" title="Latest Insights" light />
                    <RevealSection delay={200}>
                        <Link
                            href="/journal"
                            id="read-all-articles"
                            className="text-sm font-medium text-[#E6F0FF]/80 hover:text-accent transition-colors group flex items-center gap-2"
                        >
                            Read all
                            <span className="inline-block transition-transform group-hover:translate-x-1">
                                →
                            </span>
                        </Link>
                    </RevealSection>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {articles.map((article, i) => (
                        <RevealSection key={article.title} delay={i * 150}>
                            <Link href={article.href} className="group block">
                                <div className="img-zoom aspect-4/3 rounded-sm overflow-hidden bg-white/5 mb-6">
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        width={600}
                                        height={450}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                </div>
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent">
                                        {article.category}
                                    </span>
                                    <span className="text-[11px] tracking-wider uppercase text-[#E6F0FF]/40">
                                        {article.date}
                                    </span>
                                </div>
                                <h3 className="text-xl font-semibold text-[#E6F0FF] leading-snug group-hover:text-accent transition-colors duration-300">
                                    {article.title}
                                </h3>
                                <span className="inline-block mt-4 text-sm text-[#E6F0FF]/40 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300">
                                    →
                                </span>
                            </Link>
                        </RevealSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
