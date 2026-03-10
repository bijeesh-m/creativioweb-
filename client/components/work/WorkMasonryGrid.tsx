"use client";

import Image from "next/image";
import Link from "next/link";
import { RevealSection } from "@/components/RevealAnimation";
import { projectsData } from "@/data/projects";

interface WorkMasonryGridProps {
    projects?: typeof projectsData;
    activeCategory?: string;
}

export default function WorkMasonryGrid({ projects = projectsData, activeCategory = "All" }: WorkMasonryGridProps) {
    if (!projects || projects.length === 0) {
        return (
            <div className="py-24 text-center">
                <p className="text-white/50 text-lg">No projects found for this category.</p>
            </div>
        );
    }

    return (
        <section className="py-20 lg:py-32 bg-[#0A0A0A]">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="columns-1 md:columns-2 gap-6 lg:gap-8 space-y-6 lg:space-y-8">
                    {projects.map((project, index) => (
                        <RevealSection 
                            key={`${activeCategory}-${project.title}`} 
                            animation="fade-up" 
                            delay={(index % 4) * 100} 
                            className="break-inside-avoid"
                        >
                            <Link href={`#`} className="group block w-full relative">
                                <div
                                    className={`relative w-full rounded-sm overflow-hidden bg-white/5 ${
                                        project.tall ? "aspect-3/4" : "aspect-4/3 lg:aspect-video"
                                    }`}
                                >
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                                        quality={90}
                                    />
                                    {/* Gradient overlay for text */}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                                    
                                    {/* Content inside the image card */}
                                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {project.categories.slice(0, 2).map((cat) => (
                                                    <span 
                                                        key={cat} 
                                                        className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white/90"
                                                    >
                                                        {cat}
                                                    </span>
                                                ))}
                                            </div>
                                            <h3 className="text-2xl sm:text-3xl font-serif text-[#E6F0FF] mb-2 group-hover:text-accent transition-colors duration-400">
                                                {project.title}
                                            </h3>
                                        </div>
                                        
                                        {/* Hover Arrow */}
                                        <div className="absolute bottom-8 right-8 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500 ease-out">
                                            <span className="text-[#E6F0FF] text-lg">→</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </RevealSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
