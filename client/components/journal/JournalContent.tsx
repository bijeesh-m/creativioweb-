"use client";

import Image from "next/image";
import { useState } from "react";
import { RevealSection } from "@/components/RevealAnimation";

const categories = ["ALL STORIES", "STRATEGY", "DESIGN", "CULTURE"];

const trendingArticles = [
    "The Psychology of Color in Fintech",
    "Minimalism is Dead: Long Live Maximalism",
    "AI & The Creative Process",
];

const articles = [
    {
        category: "ARCHITECTURE",
        date: "OCT 28",
        title: "Spaces that Inspire: The Future of Remote Work",
        excerpt:
            "Exploring how physical environments are adapting to the digital nomad lifestyle, blending residential comfort with corporate efficiency.",
        image: "/images/azure-heights.png",
    },
    {
        category: "TECHNOLOGY",
        date: "OCT 28",
        title: "Beyond Screens: Interface Design in AR",
        excerpt:
            "As augmented reality becomes mainstream, designers face new challenges in creating intuitive spatial interfaces that exist in the real world.",
        image: "/images/nova-systems.png",
    },
    {
        category: "DESIGN",
        date: "OCT 15",
        title: "Timeless Aesthetics in a Fast-Paced World",
        excerpt:
            "Why certain design principles endure while others fade, and how to apply these timeless concepts to modern digital products.",
        image: "/images/minnicher-design.png",
    },
    {
        category: "CULTURE",
        date: "OCT 08",
        title: "The Revival of Analog in Digital Marketing",
        excerpt:
            "Film photography and hand-drawn elements are making a comeback as brands seek authenticity in an increasingly AI-generated landscape.",
        image: "/images/apex-gear.png",
    },
];

export default function JournalContent() {
    const [activeCategory, setActiveCategory] = useState("ALL STORIES");
    const [email, setEmail] = useState("");

    const filteredArticles =
        activeCategory === "ALL STORIES"
            ? articles
            : articles.filter((a) => a.category.toUpperCase() === activeCategory);

    return (
        <>
            {/* Hero */}
            <section className="pt-32 pb-8 lg:pt-40 lg:pb-12 bg-[#0A0A0A]">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                        <div>
                            <RevealSection>
                                <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-accent mb-4">
                                    The Journal
                                </p>
                            </RevealSection>
                            <RevealSection delay={150} duration={1100}>
                                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#E6F0FF] leading-[0.95]">
                                    Perspectives on
                                    <br />
                                    <span className="font-serif italic font-normal text-accent">
                                        Design & Future
                                    </span>
                                </h1>
                            </RevealSection>
                        </div>
                        <RevealSection delay={250}>
                            <p className="text-sm text-muted leading-relaxed max-w-sm mb-2">
                                Curated insights for the modern visionary. Exploring the
                                intersection of aesthetics, technology, and culture.
                            </p>
                        </RevealSection>
                    </div>
                </div>
            </section>

            {/* Featured Article */}
            <section className="pb-14 lg:pb-20 bg-[#0A0A0A]">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <RevealSection duration={1000}>
                        <div className="relative aspect-[21/9] rounded-sm overflow-hidden bg-white/5 group cursor-pointer">
                            <Image
                                src="/images/blog-featured.png"
                                alt="Featured article"
                                fill
                                className="object-cover group-hover:scale-[1.03] transition-transform duration-[1200ms] ease-out"
                                sizes="100vw"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent">
                                        Featured
                                    </span>
                                    <span className="text-[11px] text-white/40">·</span>
                                    <span className="text-[11px] font-medium tracking-wider uppercase text-white/50">
                                        Strategy
                                    </span>
                                    <span className="text-[11px] text-white/40">·</span>
                                    <span className="text-[11px] tracking-wider text-white/50 uppercase">
                                        Oct 25, 2024
                                    </span>
                                </div>
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-[1.1] max-w-2xl">
                                    Crafting Digital Excellence:{" "}
                                    <span className="font-serif italic font-normal">
                                        The New Era of Luxury UX
                                    </span>
                                </h2>
                                <p className="mt-4 text-sm text-white/60 max-w-lg leading-relaxed hidden sm:block">
                                    How premium brands are redefining user experience through
                                    minimalist interfaces and immersive storytelling.
                                </p>
                            </div>
                        </div>
                    </RevealSection>
                </div>
            </section>

            {/* Articles Grid */}
            <section className="py-14 lg:py-20 bg-[#0A0A0A]">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <div className="grid lg:grid-cols-[220px_1fr] gap-12 lg:gap-16">
                        {/* Sidebar */}
                        <RevealSection animation="slide-left">
                            <div className="lg:sticky lg:top-[100px]">
                                <h3 className="font-serif italic text-2xl text-[#E6F0FF] mb-5">
                                    Categories
                                </h3>
                                <div className="space-y-2.5">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setActiveCategory(cat)}
                                            className={`block text-[13px] tracking-wide transition-colors duration-300 w-full text-left py-1 ${activeCategory === cat
                                                    ? "text-[#E6F0FF] font-semibold"
                                                    : "text-white/60 hover:text-[#E6F0FF]"
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span>{cat}</span>
                                                {activeCategory === cat && (
                                                    <span className="text-[11px] text-accent font-semibold">
                                                        {cat === "ALL STORIES"
                                                            ? articles.length.toString().padStart(2, "0")
                                                            : filteredArticles.length
                                                                .toString()
                                                                .padStart(2, "0")}
                                                    </span>
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-10 pt-8 border-t border-border">
                                    <h3 className="font-serif italic text-xl text-[#E6F0FF] mb-5">
                                        Trending
                                    </h3>
                                    <div className="space-y-4">
                                        {trendingArticles.map((title, i) => (
                                            <div key={title} className="flex gap-3">
                                                <span className="text-[11px] font-semibold text-muted mt-0.5">
                                                    0{i + 1}
                                                </span>
                                                <p className="text-sm text-white/80 leading-snug hover:text-[#E6F0FF] cursor-pointer transition-colors duration-300">
                                                    {title}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </RevealSection>

                        {/* Articles */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {(activeCategory === "ALL STORIES"
                                ? articles
                                : filteredArticles
                            ).map((article, i) => (
                                <RevealSection key={article.title} delay={i * 120}>
                                    <article className="group cursor-pointer">
                                        <div className="img-zoom aspect-[3/2] rounded-sm overflow-hidden bg-white/5 mb-5">
                                            <Image
                                                src={article.image}
                                                alt={article.title}
                                                width={600}
                                                height={400}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="flex items-center gap-4 mb-3">
                                            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-teal">
                                                {article.category}
                                            </span>
                                            <span className="text-[11px] tracking-wider uppercase text-muted">
                                                {article.date}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-[#E6F0FF] leading-snug group-hover:text-accent transition-colors duration-400">
                                            {article.title}
                                        </h3>
                                        <p className="mt-3 text-sm text-muted leading-relaxed">
                                            {article.excerpt}
                                        </p>
                                        <span className="inline-flex items-center gap-2 mt-4 text-[12px] font-semibold tracking-[0.15em] uppercase text-[#E6F0FF] group-hover:text-accent transition-colors duration-400">
                                            Read Article
                                            <span className="inline-block transition-transform duration-400 group-hover:translate-x-1">
                                                →
                                            </span>
                                        </span>
                                    </article>
                                </RevealSection>
                            ))}
                        </div>
                    </div>

                    {/* Pagination */}
                    <RevealSection className="mt-14 flex items-center justify-center gap-2">
                        <button className="w-8 h-8 rounded-full text-sm text-white/60 hover:text-[#E6F0FF] transition-colors duration-300">
                            ←
                        </button>
                        <button className="w-8 h-8 rounded-full bg-[#E6F0FF] text-[#0A0A0A] text-sm font-medium">
                            1
                        </button>
                        <button className="w-8 h-8 rounded-full text-sm text-white/60 hover:text-[#E6F0FF] transition-colors duration-300">
                            2
                        </button>
                        <button className="w-8 h-8 rounded-full text-sm text-white/60 hover:text-[#E6F0FF] transition-colors duration-300">
                            3
                        </button>
                        <button className="w-8 h-8 rounded-full text-sm text-white/60 hover:text-[#E6F0FF] transition-colors duration-300">
                            →
                        </button>
                    </RevealSection>
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-20 lg:py-28 bg-[#0A0A0A]">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
                    <RevealSection>
                        <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-muted mb-4">
                            Stay Inspired
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#E6F0FF]">
                            Join our monthly{" "}
                            <span className="font-serif italic font-normal">digest</span>
                        </h2>
                    </RevealSection>

                    <RevealSection delay={150}>
                        <p className="mt-4 text-sm text-muted max-w-md mx-auto leading-relaxed">
                            Curated articles, design resources, and industry insights
                            delivered directly to your inbox. No spam, just substance.
                        </p>
                    </RevealSection>

                    <RevealSection delay={300}>
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
                        >
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Address"
                                className="w-full px-5 py-3 text-sm border border-border rounded-sm focus:outline-none focus:border-navy transition-colors duration-300 bg-white"
                                id="newsletter-email"
                            />
                            <button
                                type="submit"
                                id="newsletter-subscribe"
                                className="w-full sm:w-auto px-8 py-3 text-[13px] font-semibold tracking-wider uppercase bg-accent text-white rounded-sm hover:bg-accent-light transition-all duration-400 whitespace-nowrap"
                            >
                                Subscribe
                            </button>
                        </form>
                    </RevealSection>
                </div>
            </section>
        </>
    );
}
