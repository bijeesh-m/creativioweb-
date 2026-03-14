import Link from "next/link";

const sitemapLinks = [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

const socialLinks = [
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Twitter / X", href: "#" },
    { label: "Behance", href: "#" },
];

export default function Footer() {
    return (
        <footer className="bg-cream border-t border-border" id="footer">
            <div className="mx-auto px-6 lg:px-24 py-16 lg:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-7 h-7 rounded-full border-2 border-navy flex items-center justify-center text-[10px] font-semibold text-navy">
                                c
                            </div>
                            <span className="text-base font-semibold tracking-tight text-navy">
                                Creativio
                            </span>
                        </Link>
                        <p className="text-sm text-muted leading-relaxed max-w-[260px]">
                            Best digital marketing agency in Calicut and Malappuram,
                            Kerala. Crafting result-driven digital marketing, branding,
                            and creative strategies for businesses.
                        </p>
                    </div>

                    {/* Sitemap */}
                    <div>
                        <h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-navy mb-5">
                            Sitemap
                        </h4>
                        <ul className="space-y-3">
                            {sitemapLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted hover:text-navy transition-colors duration-300 link-underline"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Socials */}
                    <div>
                        <h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-navy mb-5">
                            Socials
                        </h4>
                        <ul className="space-y-3">
                            {socialLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-muted hover:text-navy transition-colors duration-300 link-underline"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-navy mb-5">
                            Contact
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="mailto:mail@creativio.in"
                                    className="text-sm text-muted hover:text-navy transition-colors duration-300"
                                >
                                    mail@creativio.in
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel:+919876543210"
                                    className="text-sm text-muted hover:text-navy transition-colors duration-300"
                                >
                                    +91 987 654 3210
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-border">
                <div className="mx-auto px-6 lg:px-24 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <p className="text-[12px] text-muted tracking-wide uppercase">
                        © {new Date().getFullYear()} Creativio Media & Advertising. All Rights Reserved.
                    </p>
                    <div className="flex gap-6">
                        <a
                            href="#"
                            className="text-[12px] text-muted hover:text-navy tracking-wide uppercase transition-colors"
                        >
                            Privacy
                        </a>
                        <a
                            href="#"
                            className="text-[12px] text-muted hover:text-navy tracking-wide uppercase transition-colors"
                        >
                            Terms
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
