"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseRevealOptions {
    threshold?: number;
    rootMargin?: string;
}

export function useReveal(options: UseRevealOptions = {}) {
    const { threshold = 0.15, rootMargin = "0px 0px -60px 0px" } = options;
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    const handleIntersection = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                setIsVisible(true);
            }
        },
        []
    );

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Check if element is already in viewport on mount (useful for initial page loads)
        const rect = element.getBoundingClientRect();
        if (rect.top <= (window.innerHeight || document.documentElement.clientHeight)) {
            setIsVisible(true);
        }

        const observer = new IntersectionObserver(handleIntersection, {
            threshold,
            rootMargin,
        });

        observer.observe(element);
        return () => observer.disconnect();
    }, [handleIntersection, threshold, rootMargin]);

    return { ref, isVisible };
}

type AnimationType = "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale-in";

// Maps animation type -> initial CSS transform/opacity
const initialStyles: Record<AnimationType, React.CSSProperties> = {
    "fade-up": { opacity: 0, transform: "translateY(40px)" },
    "fade-in": { opacity: 0, transform: "none" },
    "slide-left": { opacity: 0, transform: "translateX(-50px)" },
    "slide-right": { opacity: 0, transform: "translateX(50px)" },
    "scale-in": { opacity: 0, transform: "scale(0.92)" },
};

// Maps animation type -> visible CSS transform/opacity
const visibleStyles: React.CSSProperties = {
    opacity: 1,
    transform: "translate(0) scale(1)",
};

export function RevealSection({
    children,
    className = "",
    animation = "fade-up",
    delay = 0,
    duration = 900,
}: {
    children: React.ReactNode;
    className?: string;
    animation?: AnimationType;
    delay?: number;
    duration?: number;
}) {
    const { ref, isVisible } = useReveal();

    const style: React.CSSProperties = isVisible
        ? {
            ...visibleStyles,
            transition: `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
            willChange: "opacity, transform",
        }
        : {
            ...initialStyles[animation],
            transition: "none",
            willChange: "opacity, transform",
        };

    return (
        <div ref={ref} className={className} style={style}>
            {children}
        </div>
    );
}
