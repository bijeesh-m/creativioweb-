"use client";

import Image from "next/image";
import { useState } from "react";
import { RevealSection } from "@/components/RevealAnimation";
import { BsEye } from "react-icons/bs";
import { BiNavigation, BiShare, BiSolidNavigation } from "react-icons/bi";
interface WorkMasonryGridProps {
    projects?: any[];
    activeCategory?: string;
}

export default function WorkMasonryGrid({ projects = [], activeCategory = "All" }: WorkMasonryGridProps) {
    const [selectedProject, setSelectedProject] = useState<any | null>(null);

    if (!projects || projects.length === 0) {
        return (
            <div className="py-24 text-center">
                <p className="text-white/50 text-lg">No projects found for this category.</p>
            </div>
        );
    }

    console.log(projects);
    

    return (
        <section className="py-20 lg:py-32 bg-[#0A0A0A]">
            <div className="mx-auto px-6 lg:px-24">
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 lg:gap-8 space-y-6 lg:space-y-8">
                    {projects.map((project, index) => (
                        <RevealSection
                            key={`${activeCategory}-${project.title}`}
                            animation="fade-up"
                            delay={(index % 4) * 100}
                            className="break-inside-avoid"
                        >
                            <div
                                className="group block w-full relative cursor-pointer"
                                onClick={() => setSelectedProject(project)}
                                onMouseEnter={(e) => e.currentTarget.querySelector('video')?.play()}
                                onMouseLeave={(e) => {
                                    const v = e.currentTarget.querySelector('video');
                                    if (v) {
                                        v.pause();
                                    }
                                }}
                            >
                                <div
                                    className={`relative w-full rounded-sm overflow-hidden bg-white/5 ${project.tall ? "aspect-3/4" : "aspect-4/3 lg:aspect-video"
                                        }`}
                                >
                                    {project.mediaType === 'video' ? (
                                        <video
                                            src={project.image}
                                            muted
                                            loop
                                            playsInline
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                                        />
                                    ) : (
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                                            quality={90}
                                        />
                                    )}
                                    {/* Gradient overlay for text */}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                                    {/* --- Visit Site Button (Only for Web Dev) --- */}
                                    {project.categories.includes("WEB DEVELOPMENT") && project.liveLink && (
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-10">
                                            <a
                                                href={project.liveLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()} // Prevents opening the modal
                                                className="px-5 py-2 flex items-center gap-3 bg-white  backdrop-blur-2xl text-black text-[11px] font-bold tracking-widest uppercase rounded-full transform translate-y-2 group-hover:translate-y-0 transition-all hover:bg-accent hover:text-white"
                                            >
                                                Visit Site <BiSolidNavigation/>
                                            </a>
                                        </div>
                                    )}
                                    {/* Content inside the image card */}
                                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {project.categories.slice(0, 2).map((cat: string) => (
                                                    <span
                                                        key={cat}
                                                        className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white/90"
                                                    >
                                                        {cat}
                                                    </span>
                                                ))}
                                            </div>
                                            <h3 className="text-2xl sm:text-3xl font-sans text-[#E6F0FF] mb-2 transition-colors duration-400">
                                                {project.title}
                                            </h3>
                                        </div>

                                        {/* Hover Arrow */}
                                        <div className="absolute bottom-8 right-8 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500 ease-out">
                                            <span className="text-[#E6F0FF] text-lg">→</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </RevealSection>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedProject && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
                    onClick={() => setSelectedProject(null)}
                >
                    <div
                        className="relative w-full max-w-6xl aspect-video rounded-sm overflow-hidden bg-black border border-white/10 shadow-2xl"
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedProject(null)}
                            className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors"
                            aria-label="Close modal"
                        >
                            ✕
                        </button>
                        {selectedProject.mediaType === 'video' ? (
                            <video
                                src={selectedProject.image}
                                autoPlay
                                controls
                                className="w-full h-full object-contain bg-black"
                            />
                        ) : (
                            <Image
                                src={selectedProject.image}
                                alt={selectedProject.title}
                                fill
                                className="object-contain"
                            />
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}
