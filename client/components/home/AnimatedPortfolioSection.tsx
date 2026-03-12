"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
interface AnimatedPortfolioProps {
    selectedProjects?: any[];
}

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedPortfolioSection({ selectedProjects }: AnimatedPortfolioProps) {
    const triggerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Use selected projects
    const projects = selectedProjects || [];

    const { contextSafe } = useGSAP(() => {
        if (!projects.length || !containerRef.current || !triggerRef.current) return;

        // Explicitly kill any existing ScrollTriggers on this specific trigger to avoid duplicates
        const staleTriggers = ScrollTrigger.getAll().filter(t => t.trigger === triggerRef.current);
        staleTriggers.forEach(t => t.kill());

        const sections = gsap.utils.toArray<HTMLElement>('.port-section', containerRef.current);
        const outerWrappers = gsap.utils.toArray<HTMLElement>('.port-outer', containerRef.current);
        const innerWrappers = gsap.utils.toArray<HTMLElement>('.port-inner', containerRef.current);
        const images = gsap.utils.toArray<HTMLElement>('.port-image', containerRef.current);
        const headings = gsap.utils.toArray<HTMLElement>('.port-heading', containerRef.current);

        if (sections.length === 0) return;

        let currentIndex = -1;
        let animating: boolean = false;

        const wrap = gsap.utils.wrap(0, sections.length);

        gsap.set(outerWrappers, { yPercent: 100 });
        gsap.set(innerWrappers, { yPercent: -100 });
        gsap.set(sections, { autoAlpha: 0 });

        const gotoSection = (index: number, direction: number) => {
            index = wrap(index);
            animating = true;
            const fromTop = direction === -1;
            const dFactor = fromTop ? -1 : 1;
            const tl = gsap.timeline({
                defaults: { duration: 1.25, ease: "power1.inOut" },
                onComplete: () => { animating = false; }
            });

            if (currentIndex >= 0 && sections[currentIndex]) {
                gsap.set(sections[currentIndex], { zIndex: 0 });
                tl.to(images[currentIndex], { yPercent: -15 * dFactor })
                    .set(sections[currentIndex], { autoAlpha: 0 });
            }

            gsap.set(sections[index], { autoAlpha: 1, zIndex: 50 });

            tl.fromTo([outerWrappers[index], innerWrappers[index]], {
                yPercent: (i) => i ? -100 * dFactor : 100 * dFactor
            }, {
                yPercent: 0
            }, 0);

            tl.fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0);

            const headingChars = headings[index].querySelectorAll('.char');
            tl.fromTo(headings[index], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1 }, 0);
            if (headingChars.length > 0) {
                tl.fromTo(headingChars, {
                    y: 100 * dFactor,
                    opacity: 0,
                    rotateZ: 15 * dFactor
                }, {
                    y: 0,
                    opacity: 1,
                    rotateZ: 0,
                    duration: 1,
                    stagger: {
                        amount: 0.6,
                        from: "random"
                    },
                    ease: "power4.out"
                }, 0);
            }

            currentIndex = index;
        };

        const st = ScrollTrigger.create({
            trigger: triggerRef.current,
            start: "top top",
            end: () => `+=${projects.length * 100 * (typeof window !== 'undefined' ? window.innerHeight / 100 : 10)}`,
            scrub: false,
            pin: containerRef.current,
            invalidateOnRefresh: true,
            snap: {
                snapTo: projects.length > 1 ? 1 / (projects.length - 1) : 0,
                duration: { min: 0.3, max: 0.8 },
                delay: 0,
                ease: "power2.inOut"
            },
            onUpdate: (self) => {
                if (animating) return;
                const targetProgress = projects.length > 1 ? currentIndex / (projects.length - 1) : 0;
                const delta = self.progress - targetProgress;
                const THRESHOLD = 0.04;

                if (self.direction === 1 && delta > THRESHOLD && currentIndex < projects.length - 1) {
                    gotoSection(currentIndex + 1, 1);
                } else if (self.direction === -1 && delta < -THRESHOLD && currentIndex > 0) {
                    gotoSection(currentIndex - 1, -1);
                }
            }
        });

        gotoSection(0, 1);

        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 250);

        return () => {
            st.kill();
            clearTimeout(timer);
        };
    }, { scope: triggerRef, dependencies: [projects] });

    return (
        <div ref={triggerRef} className="relative w-full bg-[#0A0A0A]">
            <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#0A0A0A]">
                {projects.map((project, index) => (
                    <section
                        key={project.title}
                        className="port-section absolute inset-0 w-full h-full overflow-hidden"
                        style={{ visibility: 'hidden' }}
                    >
                        <div className="port-outer w-full h-full overflow-hidden">
                            <div className="port-inner w-full h-full overflow-hidden">
                                <div
                                    className="port-image absolute inset-0 flex items-center justify-center overflow-hidden"
                                >
                                    {project.mediaType === 'video' ? (
                                        <>
                                            <div className="absolute inset-0 bg-linear-to-b from-black/60 to-black/10 z-1 pointer-events-none" />
                                            <video
                                                src={project.image}
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                        </>
                                    ) : (
                                        <div
                                            className="absolute inset-0 bg-cover bg-center pointer-events-none"
                                            style={{ backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.1) 100%), url(${project.image})` }}
                                        />
                                    )}
                                    <div className="text-center z-10 relative">
                                        <h2
                                            className="port-heading text-4xl md:text-6xl lg:text-8xl font-bold text-white uppercase overflow-hidden"
                                            style={{ fontSize: 'clamp(1.5rem, 8vw, 10rem)', fontWeight: 600, lineHeight: 1.2 }}
                                        >
                                            {project.title.split('').map((char: string, i: number) => (
                                                <span
                                                    key={i}
                                                    className="char inline-block"
                                                    style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                                                >
                                                    {char}
                                                </span>
                                            ))}
                                        </h2>
                                        <p className="mt-6 text-lg md:text-2xl text-white/70">
                                            {project.tags}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}
