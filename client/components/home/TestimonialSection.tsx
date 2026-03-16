"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { RevealSection } from "@/components/RevealAnimation";
import { api } from "@/lib/api";

type Testimonial = {
    clientName: string;
    company?: string;
    role?: string;
    content: string;
    avatar?: {
        url?: string;
    };
};

const defaultTestimonial: Testimonial = {
    clientName: 'Sarah Jenkins',
    company: 'Meridian Ventures',
    role: 'CMO',
    content:
        'Working with Creativio was a revelation. Their strategic approach to our brand refresh resulted in a 40% increase in engagement. Truly world-class.',
    avatar: { url: '/images/testimonial-person.png' },
};

export default function TestimonialSection() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([defaultTestimonial]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [targetIndex, setTargetIndex] = useState<number | null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [loading, setLoading] = useState(true);

    const pointerStartX = useRef<number | null>(null);

    const transitionDuration = 500;

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                // Prefer featured testimonials; fall back to published ones.
                let response = await api.getPublicTestimonials({ featured: 'true' });

                if (!response.success || response.data.length === 0) {
                    response = await api.getPublicTestimonials();
                }

                if (response.success && response.data.length > 0) {
                    const mapped: Testimonial[] = response.data.map((t: any) => ({
                        clientName: t.clientName,
                        company: t.company,
                        role: t.role,
                        content: t.content,
                        avatar: t.avatar,
                    }));
                    setTestimonials(mapped);
                    setCurrentIndex(0);
                }
            } catch (error) {
                console.error('Failed to load testimonials:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    useEffect(() => {
        if (testimonials.length <= 1) return;

        const interval = window.setInterval(() => {
            setNextIndex((currentIndex + 1) % testimonials.length);
        }, 7500);

        return () => window.clearInterval(interval);
    }, [testimonials, currentIndex]);

    const setNextIndex = (index: number) => {
        if (isTransitioning || index === currentIndex) return;
        setTargetIndex(index);
        setIsTransitioning(true);

        window.setTimeout(() => {
            setCurrentIndex(index);
            setTargetIndex(null);
            setIsTransitioning(false);
        }, transitionDuration);
    };

    const goPrev = () => {
        if (testimonials.length <= 1) return;
        const next = (currentIndex - 1 + testimonials.length) % testimonials.length;
        setNextIndex(next);
    };

    const goNext = () => {
        if (testimonials.length <= 1) return;
        const next = (currentIndex + 1) % testimonials.length;
        setNextIndex(next);
    };

    const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
        pointerStartX.current = event.clientX;
        (event.target as HTMLElement).setPointerCapture(event.pointerId);
    };

    const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
        if (pointerStartX.current === null) return;
        const deltaX = event.clientX - pointerStartX.current;
        pointerStartX.current = null;

        const threshold = 40;
        if (Math.abs(deltaX) < threshold) return;

        if (deltaX > 0) goPrev();
        else goNext();
    };

    const active = testimonials[currentIndex];
    const next = targetIndex !== null ? testimonials[targetIndex] : null;

    if (loading) {
        return (
            <section id="testimonials" className="py-28 lg:py-36 bg-[#0A0A0A] border-t border-white/5 border-b">
                <div className="max-w-5xl mx-auto px-6 lg:px-24 text-center">
                    <div className="h-24 flex items-center justify-center">
                        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
                    </div>
                </div>
            </section>
        );
    }

    if (!active) return null;

    return (
        <section
            id="testimonials"
            className="py-28 lg:py-36 bg-[#0A0A0A] border-t border-white/5 border-b"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
        >
            <div className="max-w-5xl mx-auto px-6 lg:px-24 text-center">
                <RevealSection>
                    <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-accent mb-12">
                        What Our Clients Say
                    </p>
                </RevealSection>

                <div className="relative">
                    <RevealSection delay={150} duration={1100}>
                        <div className="relative">
                            <blockquote
                                className={`relative font-sans italic text-2xl sm:text-3xl lg:text-[2.2rem] text-[#E6F0FF] leading-[1.5] lg:leading-[1.55] transition-opacity duration-500 ${
                                    isTransitioning ? 'opacity-0' : 'opacity-100'
                                }`}
                            >
                                &ldquo;{active.content}&rdquo;
                                <div className="absolute right-0 top-0 flex gap-2">
                                    <button
                                        type="button"
                                        onClick={goPrev}
                                        className="h-10 w-10 rounded-full border border-white/10 bg-black/40 text-[#E6F0FF] hover:bg-black/60 transition"
                                        aria-label="Previous testimonial"
                                    >
                                        ‹
                                    </button>
                                    <button
                                        type="button"
                                        onClick={goNext}
                                        className="h-10 w-10 rounded-full border border-white/10 bg-black/40 text-[#E6F0FF] hover:bg-black/60 transition"
                                        aria-label="Next testimonial"
                                    >
                                        ›
                                    </button>
                                </div>
                            </blockquote>

                            {next && (
                                <blockquote
                                    className="pointer-events-none absolute inset-0 font-sans italic text-2xl sm:text-3xl lg:text-[2.2rem] text-[#E6F0FF] leading-[1.5] lg:leading-[1.55] opacity-0 transition-opacity duration-500"
                                    style={{ opacity: isTransitioning ? 1 : 0 }}
                                >
                                    &ldquo;{next.content}&rdquo;
                                </blockquote>
                            )}
                        </div>
                    </RevealSection>

                    <RevealSection delay={300}>
                        <div className="mt-10 flex flex-col items-center">
                            <div className="w-14 h-14 rounded-full overflow-hidden mb-4 ring-2 ring-white/10 shadow-lg">
                                <Image
                                    src={active.avatar?.url ?? "/images/testimonial-person.png"}
                                    alt={active.clientName ?? "Client"}
                                    width={56}
                                    height={56}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                            <p className="text-sm font-semibold text-[#E6F0FF]">{active.clientName}</p>
                            {(active.role || active.company) && (
                                <p className="text-[11px] tracking-wider uppercase text-[#E6F0FF]/40 mt-0.5">
                                    {[active.role, active.company].filter(Boolean).join(', ')}
                                </p>
                            )}

                            {testimonials.length > 1 && (
                                <div className="mt-4 flex items-center gap-2">
                                    {testimonials.map((_, idx) => (
                                        <button
                                            key={idx}
                                            type="button"
                                            onClick={() => setNextIndex(idx)}
                                            className={`h-2 w-2 rounded-full transition ${
                                                idx === currentIndex ? 'bg-accent' : 'bg-white/20'
                                            }`}
                                            aria-label={`Show testimonial ${idx + 1}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </RevealSection>
                </div>
            </div>
        </section>
    );
}
