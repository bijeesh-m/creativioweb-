"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { RevealSection } from "@/components/RevealAnimation";
import WorkMasonryGrid from "./WorkMasonryGrid";
import { api } from "@/lib/api";

export default function WorkContent() {
    const [activeCategory, setActiveCategory] = useState("All Projects");
    const [projects, setProjects] = useState<any[]>([]);
    const [categories, setCategories] = useState<string[]>(["All Projects"]);
    const [loading, setLoading] = useState(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [worksRes, catsRes] = await Promise.all([
                    api.getPublicWorks(),
                    api.getCategories()
                ]);

                if (worksRes.success) {
                    const mappedWorks = worksRes.data.map((work: any) => ({
                        title: work.title,
                        categories: work.categories,
                        tags: work.tags || work.categories.join(' · '),
                        image: work.image.url,
                        mediaType: work.image.mediaType,
                        tall: work.tall,
                        slug: work.slug
                    }));
                    setProjects(mappedWorks);
                }

                if (catsRes.success) {
                    const catNames = catsRes.data.map((c: any) => c.name);
                    if (!catNames.includes("All Projects")) catNames.unshift("All Projects");
                    setCategories(catNames);
                } else {
                    setCategories([
                        "All Projects",
                        "Digital Marketing",
                        "Performance Marketing",
                        "Branding",
                        "Video Production",
                        "CGI and 3D Animation",
                        "Web Development",
                    ]);
                }
            } catch (error) {
                console.error("Failed to fetch works data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const scrollFilters = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = 200;
            scrollContainerRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            });
        }
    };

    const filteredProjects =
        activeCategory === "All Projects"
            ? projects
            : projects.filter((p: any) => p.categories.includes(activeCategory));

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="bg-black text-white">
            {/* Hero */}
            <section className="pt-32 pb-8 lg:pt-40 lg:pb-12 bg-[#0A0A0A]">
                <div className="mx-auto px-6 lg:px-24">
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                        <div>
                            <RevealSection>
                                <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-accent mb-4">
                                    Selected Works
                                </p>
                            </RevealSection>
                            <RevealSection delay={150} duration={1100}>
                                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[0.95]">
                                    Our Curated
                                    <br />
                                    <span className="font-sans italic font-normal text-accent">
                                        Portfolio
                                    </span>
                                </h1>
                            </RevealSection>
                        </div>
                        <RevealSection delay={250}>
                            <p className="text-sm text-white/70 leading-relaxed max-w-sm mb-2">
                                Explore a collection of digital experiences where strategy meets
                                artistry. We build brands that leave a lasting impression.
                            </p>
                        </RevealSection>
                    </div>
                </div>
            </section>

            {/* Filters */}
            <section className="bg-[#0A0A0A]/95 border-b border-white/10 sticky top-[96px] z-40 backdrop-blur-md">
                <div className="mx-auto px-6 lg:px-24 relative flex items-center">
                    {/* Left Scroll Button (Mobile) */}
                    <button
                        onClick={() => scrollFilters("left")}
                        className="md:hidden flex items-center justify-center w-8 h-8 shrink-0 text-white/50 hover:text-white mr-2"
                        aria-label="Scroll categories left"
                    >
                        ←
                    </button>

                    <div
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto py-4 flex-1 scrollbar-hide"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}
                    >
                        {/* Add a style tag just for this component to handle webkit scrollbar */}
                        <style dangerouslySetInnerHTML={{
                            __html: `
                            .scrollbar-hide::-webkit-scrollbar {
                                display: none;
                            }
                        `}} />
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={(e) => {
                                    setActiveCategory(cat);

                                    // Scroll category button into center
                                    e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

                                    // Scroll page down to the grid
                                    const gridElement = document.getElementById("work-grid");
                                    if (gridElement) {
                                        // 120px offset to account for navbar and sticky filters
                                        const y = gridElement.getBoundingClientRect().top + window.scrollY - 120;
                                        window.scrollTo({ top: y, behavior: 'smooth' });
                                    }
                                }}
                                className={`whitespace-nowrap text-[13px] font-medium transition-all duration-400 pb-1 border-b-2 shrink-0 ${activeCategory === cat
                                    ? "text-white border-white"
                                    : "text-white/70 border-transparent hover:text-white"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Right Scroll Button (Mobile) */}
                    <button
                        onClick={() => scrollFilters("right")}
                        className="md:hidden flex items-center justify-center w-8 h-8 shrink-0 text-white/50 hover:text-white ml-2"
                        aria-label="Scroll categories right"
                    >
                        →
                    </button>
                </div>
            </section>

            {/* Masonry Grid */}
            <div id="work-grid">
                <WorkMasonryGrid projects={filteredProjects} activeCategory={activeCategory} />
            </div>

            {/* CTA */}
            <section className="relative py-24 lg:py-32 bg-[#0A0A0A] overflow-hidden">
                <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
                <div className="relative mx-auto px-6 lg:px-24 text-center">
                    <RevealSection>
                        <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-white/40 mb-6">
                            Start Your Journey
                        </p>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05]">
                            Let&apos;s build something
                            <br />
                            <span className="font-sans italic font-normal text-accent">
                                together.
                            </span>
                        </h2>
                    </RevealSection>

                    <RevealSection delay={150}>
                        <p className="mt-6 text-sm text-white/50 max-w-md mx-auto leading-relaxed">
                            Have a project in mind? We&apos;d love to hear about it. Let&apos;s
                            discuss how we can bring your vision to life with precision and
                            creativity.
                        </p>
                    </RevealSection>

                    <RevealSection delay={300} className="mt-10 flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href="/contact"
                            className="inline-flex items-center px-8 py-3.5 text-[13px] font-semibold tracking-wider uppercase border-2 border-white text-white rounded-sm hover:bg-white hover:text-navy transition-all duration-400"
                        >
                            Start a Project
                        </Link>
                        <a
                            href="mailto:hello@creativio.in"
                            className="inline-flex items-center px-8 py-3.5 text-[13px] font-semibold tracking-wider uppercase border-2 border-white/30 text-white/60 rounded-sm hover:border-white hover:text-white transition-all duration-400"
                        >
                            hello@creativio.in
                        </a>
                    </RevealSection>
                </div>
            </section>
        </div>
    );
}
