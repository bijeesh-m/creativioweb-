"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    FaInstagram,
    FaLinkedinIn,
    FaBehance,
    FaXTwitter,
    FaFacebookF,
    FaYoutube
} from "react-icons/fa6";

const navLinks = [
    { label: "Home", href: "/", number: "01" },
    { label: "Work", href: "/work", number: "02" },
    { label: "Services", href: "/services", number: "03" },
    { label: "About", href: "/about", number: "04" },
    { label: "Journal", href: "/journal", number: "05" },
    { label: "Contact", href: "/contact", number: "06" },
];


const socialLinks = [
    { name: "Instagram", href: "https://www.instagram.com/creativio.media", icon: FaInstagram },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/creativio-media-8943182a3/", icon: FaLinkedinIn },
    { name: "Behance", href: "https://www.behance.net/creativiomedia", icon: FaBehance },
    { name: "Twitter", href: "https://x.com/crativio34269", icon: FaXTwitter },
    { name: "Facebook", href: "https://www.facebook.com/creativio.medio/", icon: FaFacebookF },
    { name: "Youtube", href: "https://www.youtube.com/@CreativioMedia", icon: FaYoutube },
];

export default function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [animatingOut, setAnimatingOut] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);

    const handleScroll = useCallback(() => {
        setScrolled(window.scrollY > 20);
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    // Close menu on route change
    useEffect(() => {
        if (menuOpen) {
            closeMenu();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    const openMenu = () => {
        setAnimatingOut(false);
        setMenuOpen(true);
    };

    const closeMenu = () => {
        setAnimatingOut(true);
        setTimeout(() => {
            setMenuOpen(false);
            setAnimatingOut(false);
        }, 600);
    };

    const toggleMenu = () => {
        if (menuOpen && !animatingOut) {
            closeMenu();
        } else if (!menuOpen) {
            openMenu();
        }
    };

    const isHomePage = pathname === "/";
    // Force dark theme globally since the whole app is now dark theme
    const isDarkTheme = true;

    return (
        <>
            {/* Fixed Header Bar */}
            <header
                className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${menuOpen
                    ? "bg-[#0A0A0A]"
                    : scrolled
                        ? isHomePage || isDarkTheme
                            ? "bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5"
                            : "bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]"
                        : "bg-transparent"
                    }`}
            >
                <nav className=" mx-auto px-6 lg:px-24 flex items-center justify-between h-[100px]">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2.5 group relative z-[70]"
                        id="nav-logo"
                    >
                        <Image
                            src="/logowhite.png"
                            alt="Creativio"
                            width={240}
                            height={80}
                            className="h-10 lg:h-16 xl:h-20 w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Menu Toggle Button */}
                    <button
                        onClick={toggleMenu}
                        className="relative z-[70] flex items-center gap-3 group cursor-pointer"
                        aria-label="Toggle navigation menu"
                        id="menu-toggle"
                    >
                        <span
                            className={`text-[11px] lg:text-[13px] xl:text-[14px] font-semibold tracking-[0.2em] uppercase transition-colors duration-500 ${menuOpen && !animatingOut
                                ? "text-[#E6F0FF]/70"
                                : isDarkTheme
                                    ? "text-[#E6F0FF]/70"
                                    : "text-muted"
                                }`}
                        >
                            {menuOpen && !animatingOut ? "Close" : "Menu"}
                        </span>
                        <div className="relative w-8 h-8 flex items-center justify-center">
                            <span
                                className={`absolute w-6 h-[1.5px] transition-all duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] ${menuOpen && !animatingOut
                                    ? "bg-[#E6F0FF] rotate-45"
                                    : isDarkTheme
                                        ? "bg-[#E6F0FF] -translate-y-[4px]"
                                        : "bg-navy -translate-y-[4px]"
                                    }`}
                            />
                            <span
                                className={`absolute w-6 h-[1.5px] transition-all duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] ${menuOpen && !animatingOut
                                    ? "bg-[#E6F0FF] -rotate-45"
                                    : isDarkTheme
                                        ? "bg-[#E6F0FF] translate-y-[4px]"
                                        : "bg-navy translate-y-[4px]"
                                    }`}
                            />
                        </div>
                    </button>
                </nav>
            </header>

            {/* Full Screen Overlay Menu */}
            <div
                ref={overlayRef}
                className={`fixed inset-0 z-[55] transition-all duration-700 ease-[cubic-bezier(0.77,0,0.18,1)] ${menuOpen && !animatingOut
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                    }`}
                style={{
                    background: "#0A0A0A",
                }}
            >
                {/* Ambient decorative elements */}
                <div
                    className={`absolute top-[15%] right-[10%] w-[450px] h-[450px] rounded-full bg-[#FF5A00]/[0.05] blur-[120px] transition-all duration-1000 delay-300 pointer-events-none ${menuOpen && !animatingOut ? "scale-100 opacity-100" : "scale-50 opacity-0"
                        }`}
                />
                <div
                    className={`absolute bottom-[20%] left-[5%] w-[350px] h-[350px] rounded-full bg-[#E6F0FF]/[0.03] blur-[100px] transition-all duration-1000 delay-500 pointer-events-none ${menuOpen && !animatingOut ? "scale-100 opacity-100" : "scale-50 opacity-0"
                        }`}
                />

                {/* Navigation Content */}
                <div className="relative h-full flex flex-col justify-start lg:justify-center mx-auto px-6 lg:px-24 pt-[100px] pb-12 lg:pt-0 lg:pb-0 overflow-y-auto no-scrollbar">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-24 min-h-min">
                        {/* Main Nav Links */}
                        <nav className="flex flex-col gap-1 lg:gap-2" aria-label="Main navigation">
                            {navLinks.map((link, i) => {
                                const isActive = pathname === link.href;
                                // Stagger delays: each link appears with a wave delay
                                const enterDelay = `${100 + i * 80}ms`;
                                const exitDelay = `${(navLinks.length - 1 - i) * 60}ms`;

                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        id={`nav-${link.label.toLowerCase()}`}
                                        onClick={closeMenu}
                                        className="group relative flex items-center gap-4 lg:gap-6 py-2 lg:py-3 overflow-hidden"
                                        style={{
                                            transitionDelay: menuOpen && !animatingOut ? enterDelay : exitDelay,
                                        }}
                                    >
                                        {/* Label with wave animation */}
                                        <span
                                            className={`text-[2.2rem] sm:text-[3rem]  lg:text-[3rem] xl:text-[4rem] font-black leading-[1.1] transition-all ${isActive
                                                ? "text-accent"
                                                : "text-[#E6F0FF] group-hover:text-accent"
                                                } ${menuOpen && !animatingOut
                                                    ? "translate-y-0 opacity-100"
                                                    : "translate-y-full opacity-0"
                                                }`}
                                            style={{
                                                transition: ` transform 0.3s cubic-bezier(0.77, 0, 0.18, 1), opacity 0.6s cubic-bezier(0.77, 0, 0.18, 1), color 0.3s ease`,
                                            }}
                                        >
                                            {link.label}
                                        </span>

                                        {/* Hover line */}
                                        <span className="hidden lg:block flex-1 h-[1px] bg-[#E6F0FF]/0 group-hover:bg-[#E6F0FF]/10 transition-all duration-500 origin-left scale-x-0 group-hover:scale-x-100" />

                                        {/* Arrow */}
                                        <span
                                            className={`text-lg text-accent opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-400`}
                                        >
                                            →
                                        </span>
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Right Side Info */}
                        <div
                            className={`flex flex-col gap-10 lg:gap-16 xl:gap-20 lg:max-w-[400px] transition-all duration-700 ${menuOpen && !animatingOut
                                ? "translate-y-0 opacity-100"
                                : "translate-y-6 opacity-0"
                                }`}
                            style={{
                                transitionDelay: menuOpen && !animatingOut ? "500ms" : "0ms",
                            }}
                        >
                            {/* Contact Info */}
                            <div>
                                <p className="text-[10px] lg:text-[12px] xl:text-[14px] font-semibold tracking-[0.25em] uppercase text-accent mb-4">
                                    Get in Touch
                                </p>
                                <a
                                    href="mailto:mail@creativio.in"
                                    className="block text-sm lg:text-base xl:text-xl text-[#E6F0FF]/50 hover:text-[#E6F0FF] transition-colors duration-300 mb-2"
                                >
                                    mail@creativio.in
                                </a>
                                <a
                                    href="tel:04832082598"
                                    className="block text-sm lg:text-base xl:text-xl text-[#E6F0FF]/50 hover:text-[#E6F0FF] transition-colors duration-300"
                                >
                                    04832082598
                                </a>
                            </div>

                            {/* Social Links */}
                            <div>
                                <p className="text-[10px] lg:text-[12px] xl:text-[14px] font-semibold tracking-[0.25em] uppercase text-accent mb-4">
                                    Follow Us
                                </p>
                                <div className="flex flex-wrap gap-5">
                                    {socialLinks.map(
                                        (social) => (
                                            <a
                                                key={social.name}
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-full bg-white/5 text-[#E6F0FF]/40 hover:text-accent hover:bg-white/10 transition-all duration-300"
                                                aria-label={social.name}
                                            >
                                                <social.icon className="text-lg lg:text-xl xl:text-2xl" />
                                            </a>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* Location */}
                            <div>
                                <p className="text-[10px] lg:text-[12px] xl:text-[14px] font-semibold tracking-[0.25em] uppercase text-accent mb-3">
                                    Located in
                                </p>
                                <p className="text-sm lg:text-base xl:text-lg text-[#E6F0FF]/40 leading-relaxed">
                                    Near Calicut Airport, Kinfra Park Road, Vennayoor, Ayikkarapadi P.O, Malappuram Dt - 673637
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom border accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px]">
                    <div
                        className={`h-full bg-gradient-to-r from-transparent via-accent to-transparent transition-all duration-1000 ${menuOpen && !animatingOut ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                            }`}
                        style={{ transitionDelay: "400ms" }}
                    />
                </div>
            </div>
        </>
    );
}
