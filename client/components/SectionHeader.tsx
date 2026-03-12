import { RevealSection } from "./RevealAnimation";

interface SectionHeaderProps {
    eyebrow?: string;
    title: string;
    titleAccent?: string;
    description?: string;
    align?: "left" | "center";
    light?: boolean;
    className?: string;
}

export default function SectionHeader({
    eyebrow,
    title,
    titleAccent,
    description,
    align = "left",
    light = false,
    className = "",
}: SectionHeaderProps) {
    return (
        <RevealSection
            className={`${align === "center" ? "text-center" : ""} ${className}`}
        >
            {eyebrow && (
                <p
                    className={`text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 ${light ? "text-accent" : "text-muted"
                        }`}
                >
                    {eyebrow}
                </p>
            )}
            <h2
                className={`text-3xl sm:text-4xl  lg:text-5xl font- leading-[1.1] -tracking-normal ${light ? "text-[#E6F0FF]" : "text-navy"
                    }`}
            >
                {title}
                {titleAccent && (
                    <>
                        <br />
                        <span
                            className={`font- italic font-normal ${light ? "opacity-80" : "text-navy/80"
                                }`}
                        >
                            {titleAccent}
                        </span>
                    </>
                )}
            </h2>
            {description && (
                <p
                    className={`mt-5 text-base leading-relaxed max-w-xl ${light ? "text-[#E6F0FF]/70" : "text-muted"
                        }`}
                >
                    {description}
                </p>
            )}
        </RevealSection>
    );
}
