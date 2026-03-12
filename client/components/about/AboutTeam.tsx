"use client";

import Image from "next/image";
import { RevealSection } from "@/components/RevealAnimation";
import SectionHeader from "@/components/SectionHeader";

const team = [
    {
        name: "Arjun Nair",
        role: "Founder & CEO",
        image: "/images/team-person-1.png",
    },
    {
        name: "Elena Rossi",
        role: "Creative Director",
        image: "/images/nova-systems.png",
    },
    {
        name: "David Kim",
        role: "Tech Lead",
        image: "/images/future-tech.png",
    },
    {
        name: "Priya Singh",
        role: "Head of Strategy",
        image: "/images/testimonial-person.png",
    },
];

export default function AboutTeam() {
    return (
        <section aria-label="Creativio team members" className="py-20 lg:py-28 bg-[#0A0A0A]">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
                    <RevealSection>
                        <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-white/50 mb-4">
                            Team
                        </p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E6F0FF] leading-[1.1]">
                            Meet the{" "}
                            <span className="font-sans italic font-normal text-accent">
                                Visionaries
                            </span>
                        </h2>
                    </RevealSection>
                    <RevealSection delay={200}>
                        <p className="text-sm text-white/60 leading-relaxed max-w-sm">
                            A collective of thinkers, makers, and dreamers united by a passion
                            for digital excellence.
                        </p>
                    </RevealSection>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {team.map((member, i) => (
                        <RevealSection key={member.name} delay={i * 120}>
                            <div className="group cursor-pointer">
                                <div className="img-zoom aspect-[3/4] rounded-sm overflow-hidden bg-white/5 mb-4">
                                    <Image
                                        src={member.image}
                                        alt={`${member.name} - ${member.role} at Creativio digital marketing agency`}
                                        width={400}
                                        height={533}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                        loading="lazy"
                                    />
                                </div>
                                <h3 className="text-base font-semibold text-[#E6F0FF]">
                                    {member.name}
                                </h3>
                                <p className="text-[11px] tracking-wider uppercase text-white/50 mt-0.5">
                                    {member.role}
                                </p>
                            </div>
                        </RevealSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
