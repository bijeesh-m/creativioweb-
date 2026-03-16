"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { RevealSection } from "@/components/RevealAnimation";
import { api } from "@/lib/api";

interface ServiceProjectsProps {
    serviceTitle: string;
    serviceId?: string;
}

export default function ServiceProjects({ serviceTitle, serviceId }: ServiceProjectsProps) {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState<any | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const params: Record<string, string> = {};
                if (serviceId) {
                    params.service = serviceId;
                } else {
                    params.category = serviceTitle;
                }

                const response = await api.getPublicWorks(params);
                if (response.success) {
                    const mapped = response.data.map((work: any) => ({
                        title: work.title,
                        categories: work.categories,
                        tags: work.tags || work.categories.join(' · '),
                        image: work.image.url,
                        tall: work.tall,
                        slug: work.slug,
                        mediaType: work.image?.mediaType || 'image'
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
    }, [serviceTitle, serviceId]);

    if (loading) return null;
    if (projects.length === 0) return null;

    return (
        <section className="py-24 lg:py-32 bg-[#0A0A0A] border-t border-white/10">
            <div className="mx-auto px-6 lg:px-24">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 lg:mb-20">
                    <div>
                        <RevealSection>
                            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-accent mb-4">
                                Case Studies
                            </p>
                        </RevealSection>
                        <RevealSection delay={150}>
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05]">
                                Expertise in{" "}
                                <span className="font-sans italic font-normal text-accent">
                                    Action
                                </span>
                            </h2>
                        </RevealSection>
                    </div>
                </div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 lg:gap-8">
                    {projects.map((project, i) => (
                        <RevealSection
                            key={project.title + i}
                            delay={i * 100}
                            className="break-inside-avoid mb-6 lg:mb-8"
                        >
                            <div 
                                className="group block cursor-pointer"
                                onClick={() => setSelectedProject(project)}
                                onMouseEnter={(e) => {
                                    const v = e.currentTarget.querySelector('video');
                                    if (v) v.play().catch(() => {});
                                }}
                                onMouseLeave={(e) => {
                                    const v = e.currentTarget.querySelector('video');
                                    if (v) v.pause();
                                }}
                            >
                                <div
                                    className={`relative rounded-xl overflow-hidden bg-white/5 mb-6 ${project.tall ? "aspect-[3/4]" : "aspect-[4/3]"} group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-700`}
                                >
                                    {project.mediaType === 'video' ? (
                                        <video
                                            src={project.image}
                                            muted
                                            loop
                                            playsInline
                                            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                                        />
                                    ) : (
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            width={600}
                                            height={project.tall ? 800 : 450}
                                            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                                            loading="lazy"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                    
                                    {/* Project Hover Info */}
                                    <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
                                        <p className="text-xs font-mono text-accent mb-2 uppercase tracking-widest">View Project</p>
                                    </div>
                                </div>
                                <div className="flex items-start justify-between px-2">
                                    <div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors duration-400">
                                            {project.title}
                                        </h3>
                                        <p className="text-xs tracking-wider uppercase text-white/40 mt-2 font-medium">
                                            {project.tags}
                                        </p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:border-accent group-hover:text-accent transition-all duration-400">
                                        →
                                    </div>
                                </div>
                            </div>
                        </RevealSection>
                    ))}
                </div>
            </div>

            {/* Premium Project Modal */}
            {selectedProject && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-xl animate-in fade-in duration-500"
                    onClick={() => setSelectedProject(null)}
                >
                    <div
                        className="relative w-full max-w-6xl max-h-full aspect-video rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl animate-in zoom-in-95 duration-500"
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedProject(null)}
                            className="absolute top-6 right-6 z-20 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white text-white hover:text-black rounded-full backdrop-blur-md transition-all duration-300 border border-white/10"
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
                                priority
                            />
                        )}
                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                            <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
                            <p className="text-sm text-white/60 tracking-widest uppercase">{selectedProject.tags}</p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
