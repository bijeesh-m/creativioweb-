"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { RevealSection } from "@/components/RevealAnimation";
import { api } from "@/lib/api";

interface ServiceProjectsProps {
    serviceTitle: string;
}

export default function ServiceProjects({ serviceTitle }: ServiceProjectsProps) {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // Fetch works filtered by the service title category
                const response = await api.getPublicWorks({ category: serviceTitle });
                if (response.success) {
                    const mapped = response.data.map((work: any) => ({
                        title: work.title,
                        categories: work.categories,
                        tags: work.tags || work.categories.join(' · '),
                        image: work.image.url,
                        tall: work.tall,
                        slug: work.slug
                    }));
                    setProjects(mapped);
                }
            } catch (error) {
                console.error("Failed to fetch service projects:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [serviceTitle]);

    if (loading) return null; // Or a subtle loader

    if (projects.length === 0) {
        return null;
    }

    const filteredProjects = projects;

    if (filteredProjects.length === 0) {
        return null;
    }

    return (
        <section className="py-24 lg:py-32 bg-[#0A0A0A] border-t border-white/10">
            <div className="mx-auto px-6 lg:px-24">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 lg:mb-20">
                    <div>
                        <RevealSection>
                            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-accent mb-4">
                                Our Work
                            </p>
                        </RevealSection>
                        <RevealSection delay={150}>
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#E6F0FF] leading-[1.05]">
                                Selected{" "}
                                <span className="font-sans italic font-normal text-accent">
                                    Projects
                                </span>
                            </h2>
                        </RevealSection>
                    </div>
                    <RevealSection delay={250}>
                        <Link
                            href="/work"
                            className="inline-flex items-center gap-2 text-sm font-medium text-[#E6F0FF] hover:text-accent transition-colors duration-400 group"
                        >
                            View All Work
                            <span className="inline-block transition-transform duration-400 group-hover:translate-x-1">
                                →
                            </span>
                        </Link>
                    </RevealSection>
                </div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 lg:gap-8">
                    {filteredProjects.map((project, i) => (
                        <RevealSection
                            key={project.title}
                            delay={i * 100}
                            className="break-inside-avoid mb-6 lg:mb-8"
                        >
                            <Link href="/work" className="group block">
                                <div
                                    className={`img-zoom rounded-sm overflow-hidden bg-white/5 mb-4 ${project.tall ? "aspect-3/4" : "aspect-4/3"
                                        }`}
                                >
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        width={500}
                                        height={project.tall ? 667 : 375}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-lg font-sans italic text-[#E6F0FF] group-hover:text-accent transition-colors duration-400">
                                            {project.title}
                                        </h3>
                                        <p className="text-[11px] tracking-wider uppercase text-muted mt-1">
                                            {project.tags}
                                        </p>
                                    </div>
                                    <span className="text-[#E6F0FF]/20 group-hover:text-accent group-hover:translate-x-1 transition-all duration-400 mt-1">
                                        →
                                    </span>
                                </div>
                            </Link>
                        </RevealSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
