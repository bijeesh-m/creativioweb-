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
    imageLeft?: boolean;
    isPremium?: boolean;
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
            } catch (err: any) {
                if (isAlive) {
                    setError(err?.message ?? "Unable to load services.");
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
        <section className="py-20 lg:py-28 bg-[#0A0A0A]">
            <div className="mx-auto px-6 lg:px-24">
                {loading && (
                    <div className="min-h-[360px] flex items-center justify-center text-muted">
                        Loading services...
                    </div>
                )}

                {error && (
                    <div className="min-h-[360px] flex items-center justify-center text-red-400">
                        {error}
                    </div>
                )}

                {!loading && !error && enhancedServices.length === 0 && (
                    <div className="min-h-[360px] flex items-center justify-center text-muted">
                        No services are available at the moment.
                    </div>
                )}

                <div className="space-y-24 lg:space-y-32">
                    {enhancedServices.map((service, i) => {
                        const slug = service.slug ?? `service-${i}`;
                        const isPremium = Boolean(service.isPremium);
                        const bgClasses = isPremium
                            ? "bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 border border-amber-700"
                            : "";

                        return (
                            <div
                                key={slug}
                                id={`service-${slug}`}
                                className={`relative grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                                    service.imageLeft ? "" : "lg:[direction:rtl]"
                                } ${bgClasses} rounded-xl overflow-hidden`}
                            >
                                {isPremium && (
                                    <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_top,_rgba(253,224,71,0.35),transparent_55%)]" />
                                )}

                                {/* Image */}
                                <RevealSection
                                    animation={service.imageLeft ? "slide-left" : "slide-right"}
                                    duration={1000}
                                >
                                    <div className="img-zoom aspect-4/3 rounded-sm overflow-hidden bg-white/5 lg:[direction:ltr]">
                                    {getImageUrl(service.image) ? (
                                        <Image
                                            src={getImageUrl(service.image)}
                                            alt={service.title}
                                            width={700}
                                            height={525}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center w-full h-full bg-white/10 text-sm text-white/60">
                                            No image available
                                        </div>
                                    )}
                                </div>
                                </RevealSection>

                                {/* Content */}
                                <div className="lg:[direction:ltr]">
                                    <RevealSection>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted">
                                                0{i + 1}
                                            </span>
                                            {isPremium && (
                                                <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-3 py-1 text-[11px] font-semibold tracking-wide text-amber-200">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                                                    Premium
                                                </span>
                                            )}
                                        </div>
                                        <h2 className="text-3xl lg:text-4xl font-bold text-[#E6F0FF] leading-tight">
                                            {service.title}
                                        </h2>
                                    </RevealSection>

                                    <RevealSection delay={150}>
                                        <p className="mt-5 text-sm text-muted leading-relaxed">
                                            {service.shortDescription}
                                        </p>
                                    </RevealSection>

                                    <RevealSection delay={300}>
                                        <ul className="mt-7 space-y-2.5">
                                            {service.features?.map((feature: string) => (
                                                <li
                                                    key={feature}
                                                    className="flex items-center gap-3 text-sm text-white/70"
                                                >
                                                    <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </RevealSection>

                                    <RevealSection delay={400} className="mt-10">
                                        <Link
                                            href={`/services/${slug}`}
                                            className="inline-flex items-center gap-3 group whitespace-nowrap"
                                        >
                                            <span className="font-sans italic text-lg text-[#E6F0FF] group-hover:text-accent transition-colors duration-300">
                                                Learn More
                                            </span>
                                            <span className="inline-block text-[#E6F0FF] group-hover:text-accent group-hover:translate-x-1 transition-all duration-400">
                                                →
                                            </span>
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
