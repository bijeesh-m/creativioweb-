"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectsData } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedPortfolioProps {
    selectedProjects?: typeof projectsData;
}

export default function AnimatedPortfolioSection({ selectedProjects }: AnimatedPortfolioProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const sectionsRef = useRef<HTMLDivElement[]>([]);
    const outerWrappersRef = useRef<HTMLDivElement[]>([]);
    const innerWrappersRef = useRef<HTMLDivElement[]>([]);
    const imagesRef = useRef<HTMLDivElement[]>([]);
    const headingsRef = useRef<HTMLHeadingElement[]>([]);

    // Use selected projects or first 4 projects
    const projects = selectedProjects || projectsData.slice(0, 4);

    useEffect(() => {
        const sections = sectionsRef.current;
        const outerWrappers = outerWrappersRef.current;
        const innerWrappers = innerWrappersRef.current;
        const images = imagesRef.current;
        const headings = headingsRef.current;
        let currentIndex = -1;
        let animating: boolean;

        const wrap = gsap.utils.wrap(0, sections.length);

        gsap.set(outerWrappers, { yPercent: 100 });
        gsap.set(innerWrappers, { yPercent: -100 });
        gsap.set(sections, { autoAlpha: 0 });

        function gotoSection(index: number, direction: number) {
            index = wrap(index);
            animating = true;
            const fromTop = direction === -1;
            const dFactor = fromTop ? -1 : 1;
            const tl = gsap.timeline({
                defaults: { duration: 1.25, ease: "power1.inOut" },
                onComplete: () => { animating = false; }
            });

            if (currentIndex >= 0) {
                gsap.set(sections[currentIndex], { zIndex: 0 });
                tl.to(images[currentIndex], { yPercent: -15 * dFactor })
                    .set(sections[currentIndex], { autoAlpha: 0 });
            }

            gsap.set(sections[index], { autoAlpha: 1, zIndex: 50 });

            // Outer and inner wrapper parallax
            tl.fromTo([outerWrappers[index], innerWrappers[index]], {
                yPercent: (i) => i ? -100 * dFactor : 100 * dFactor
            }, {
                yPercent: 0
            }, 0);

            // Image parallax
            tl.fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0);

            // Text animation
            const headingChars = headings[index].querySelectorAll('.char');
            tl.fromTo(headings[index], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1 }, 0);
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
            }, 0); // Start text animation instantly with the transition

            currentIndex = index;
        }

        if (containerRef.current) {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: () => `+=${projects.length * window.innerHeight}`,
                scrub: false, // Turn off scrub to rely purely on triggering
                pin: true,
                snap: {
                    snapTo: 1 / (projects.length - 1),
                    duration: { min: 0.3, max: 0.8 },
                    delay: 0,
                    ease: "power2.inOut"
                },
                onUpdate: (self) => {
                    if (animating) return; // Ignore scroll updates strictly until the 1-second animation finishes

                    // Calculate the exact logical progress point for the current index (e.g. 0.00, 0.33, 0.66, 1.00)
                    const targetProgress = currentIndex / (projects.length - 1);

                    // Track if the user has scrolled slightly past the expected resting point
                    const delta = self.progress - targetProgress;
                    const THRESHOLD = 0.04; // slightly higher threshold to ignore tiny thumb twitches on mobile

                    // Only trigger if delta AND scroll direction match, preventing rubber-banding bugs
                    if (self.direction === 1 && delta > THRESHOLD && currentIndex < projects.length - 1) {
                        gotoSection(currentIndex + 1, 1);
                    } else if (self.direction === -1 && delta < -THRESHOLD && currentIndex > 0) {
                        gotoSection(currentIndex - 1, -1);
                    }
                }
            });
        }

        gotoSection(0, 1);

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [projects]);

    return (
        <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#0A0A0A]">
            {projects.map((project, index) => (
                <section
                    key={project.title}
                    ref={(el) => {
                        if (el) sectionsRef.current[index] = el as HTMLDivElement;
                    }}
                    className="absolute inset-0 w-full h-full overflow-hidden"
                    style={{ visibility: 'hidden' }}
                >
                    <div
                        ref={(el) => {
                            if (el) outerWrappersRef.current[index] = el;
                        }}
                        className="w-full h-full overflow-hidden"
                    >
                        <div
                            ref={(el) => {
                                if (el) innerWrappersRef.current[index] = el;
                            }}
                            className="w-full h-full overflow-hidden"
                        >
                            <div
                                ref={(el) => {
                                    if (el) imagesRef.current[index] = el;
                                }}
                                className="absolute inset-0 bg-cover bg-center flex items-center justify-center"
                                style={{ backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.1) 100%), url(${project.image})` }}
                            >
                                <div className="text-center z-10">
                                    <h2
                                        ref={(el) => {
                                            if (el) headingsRef.current[index] = el;
                                        }}
                                        className="text-4xl md:text-6xl lg:text-8xl font-bold text-white uppercase overflow-hidden"
                                        style={{ fontSize: 'clamp(1.5rem, 8vw, 10rem)', fontWeight: 600, lineHeight: 1.2 }}
                                    >
                                        {project.title.split('').map((char, i) => (
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
    );
}
