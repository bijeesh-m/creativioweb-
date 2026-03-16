"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RevealSection } from "@/components/RevealAnimation";
import { api } from "@/lib/api";

type Service = {
    _id?: string;
    slug?: string;
    title: string;
    shortDescription?: string;
    features?: string[];
    image?: string | { url: string };
};

export default function ServicesList() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isAlive = true;

        async function fetchServices() {
            setLoading(true);
            setError(null);
            try {
                const response = await api.getPublicServices();
                if (!response.success) throw new Error(response.message || "Failed to load services");
                if (isAlive) {
                    setServices(response.data);
                }
            } catch (err: unknown) {
                if (isAlive) {
                    const errorMsg = err instanceof Error ? err.message : "Unable to load services.";
                    setError(errorMsg);
                }
            } finally {
                if (isAlive) {
                    setLoading(false);
                }
            }
        }

        fetchServices();

        return () => {
            isAlive = false;
        };
    }, []);

    const enhancedServices = useMemo(() => {
        return services.map((service) => ({
            ...service,
            slug: service.slug || String(service._id),
        }));
    }, [services]);

    const getImageUrl = (image: Service["image"]) => {
        if (!image) return "";
        if (typeof image === "string") return image;
        return image.url;
    };

    return (
        <section className="bg-[#020202] py-20 lg:py-40">
            <div className="mx-auto px-6 lg:px-24">
                {loading && (
                    <div className="min-h-[40vh] flex flex-col items-center justify-center text-white/30">
                        <div className="w-12 h-12 border border-white/10 border-t-accent rounded-full animate-spin mb-6" />
                        <span className="text-[10px] tracking-[0.3em] uppercase font-bold">Synchronizing Data</span>
                    </div>
                )}

                {error && (
                    <div className="min-h-[40vh] flex items-center justify-center text-red-500/60 uppercase tracking-widest text-xs font-bold">
                        [ {error} ]
                    </div>
                )}

                <div className="grid grid-cols-1 gap-12 lg:gap-32">
                    {enhancedServices.map((service, i) => {
                        const isEven = i % 2 === 0;
                        const slug = service.slug;

                        return (
                            <div 
                                key={slug}
                                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24 group`}
                            >
                                {/* Media Section */}
                                <div className="w-full lg:w-1/2 relative aspect-video lg:aspect-square xl:aspect-[4/3] rounded-3xl overflow-hidden bg-white/5">
                                    <div className="absolute inset-0 z-10 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
                                    {getImageUrl(service.image) ? (
                                        <Image
                                            src={getImageUrl(service.image)}
                                            alt={service.title}
                                            fill
                                            className="object-cover transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out filter grayscale group-hover:grayscale-0"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-linear-to-tr from-accent/5 to-white/5" />
                                    )}
                                    
                                    {/* Service Number */}
                                    <div className="absolute top-8 left-8 z-20">
                                        <span className="text-5xl lg:text-7xl font-black text-white/10 group-hover:text-accent/20 transition-colors duration-700">
                                            0{i + 1}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="w-full lg:w-1/2 flex flex-col">
                                    <RevealSection>
                                        <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white uppercase  leading-none mb-8">
                                            {service.title}
                                        </h2>
                                    </RevealSection>
                                    
                                    <RevealSection delay={150}>
                                        <p className="text-lg lg:text-xl text-white/50 font-light leading-relaxed mb-12 max-w-xl">
                                            {service.shortDescription}
                                        </p>
                                    </RevealSection>

                                    <RevealSection delay={300}>
                                        <div className="flex flex-wrap gap-3 mb-16">
                                            {service.features?.slice(0, 4).map(f => (
                                                <span key={f} className="text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full border border-white/10 text-white/60 bg-white/5">
                                                    {f}
                                                </span>
                                            ))}
                                        </div>
                                    </RevealSection>

                                    <RevealSection delay={450}>
                                        <Link 
                                            href={`/services/${slug}`}
                                            className="inline-flex items-center gap-6 group/btn"
                                        >
                                            <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center relative overflow-hidden transition-all duration-500 group-hover/btn:border-accent">
                                                <div className="absolute inset-0 bg-accent translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                                                <span className="relative z-10 text-white group-hover/btn:text-black transition-colors duration-500 text-xl font-light">
                                                    →
                                                </span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-black tracking-[0.3em] uppercase text-white/40 group-hover/btn:text-accent transition-colors duration-500">
                                                    Explore Case Study
                                                </span>
                                                <div className="h-px w-0 bg-accent group-hover/btn:w-full transition-all duration-500" />
                                            </div>
                                        </Link>
                                    </RevealSection>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
