"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaWhatsapp, FaPhone, FaEnvelope } from "react-icons/fa";

export default function FloatingActions() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-0"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Expandable Menu - padding bottom added as an invisible bridge for the mouse */}
            <div
                className={`flex flex-col gap-3 pb-3 transition-all duration-300 origin-bottom ${isHovered ? "scale-100 opacity-100 translate-y-0" : "scale-50 opacity-0 translate-y-8 pointer-events-none"
                    }`}
            >
                {/* Phone */}
                <a
                    href="tel:+919876543210"
                    aria-label="Call Us"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-navy shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:bg-navy hover:text-white transition-all transform hover:scale-110"
                >
                    <FaPhone className="w-5 h-5" />
                </a>

                {/* Email */}
                <a
                    href="mailto:mail@creativio.in"
                    aria-label="Email Us"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-navy shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:bg-navy hover:text-white transition-all transform hover:scale-110"
                >
                    <FaEnvelope className="w-5 h-5" />
                </a>

                {/* WhatsApp */}
                <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat on WhatsApp"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:bg-[#1fb355] transition-all transform hover:scale-110"
                >
                    <FaWhatsapp className="w-6 h-6" />
                </a>
            </div>

            {/* Main Toggle Button */}
            <button
                onClick={() => setIsHovered(!isHovered)}
                aria-label="Contact Options"
                className="flex items-center justify-center w-14 h-14 rounded-full bg-navy text-white shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:bg-accent hover:shadow-[0_8px_30px_rgba(196,164,132,0.4)] transition-all transform hover:scale-105"
            >
                <div className="relative flex items-center justify-center">
                    <span
                        className={`absolute w-full h-full border-t-2 border-white transition-all duration-300 ${isHovered ? "rotate-45 translate-y-0" : "-translate-y-1.5"
                            }`}
                    />
                    <span
                        className={`absolute w-full h-full border-t-2 border-white transition-all duration-300 ${isHovered ? "opacity-0" : "opacity-100"
                            }`}
                    />
                    <span
                        className={`absolute w-full h-full border-t-2 border-white transition-all duration-300 ${isHovered ? "-rotate-45 translate-y-0" : "translate-y-1.5"
                            }`}
                    />
                    {isHovered ? null : (
                        <FaEnvelope className="w-6 h-6 absolute transition-all duration-300" />
                    )}
                </div>
            </button>
        </div>
    );
}
