"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function ScrollProgress() {
    const [scrollPercentage, setScrollPercentage] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;

            if (docHeight > 0) {
                const scrolled = (scrollTop / docHeight) * 100;
                setScrollPercentage(scrolled);

                // Show after scrolling down a bit
                setIsVisible(scrollTop > 100);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        // Initial setup
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [pathname]);

    return (
        <div
            className={`fixed right-6 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-center gap-4 transition-all duration-700 pointer-events-none hidden md:flex ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
        >
            <div className="text-[10px] font-semibold text-[#E6F0FF]/50 tracking-[0.2em]" style={{ writingMode: 'vertical-rl' }}>
                SCROLL
            </div>

            {/* The progress bar line container */}
            <div className="w-[1px] h-32 bg-white/10 relative overflow-hidden rounded-full">
                {/* The filling line */}
                <div
                    className="absolute top-0 left-0 w-full bg-[#FF5A00] transition-all duration-150 ease-out"
                    style={{
                        height: `${scrollPercentage}%`
                    }}
                />
            </div>

            <div className="text-[10px] font-mono text-[#FF5A00]/80">
                {Math.round(scrollPercentage)}%
            </div>
        </div>
    );
}
