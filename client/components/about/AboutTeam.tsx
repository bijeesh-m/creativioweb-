"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { RevealSection } from "@/components/RevealAnimation";
import { api } from "@/lib/api";

interface TeamMember {
    _id: string;
    name: string;
    role: string;
    image?: {
        url: string;
    };
}

export default function AboutTeam() {
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const res = await api.getPublicTeam();
                setTeam(res.data);
            } catch (err) {
                console.error("Error fetching team:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTeam();
    }, []);

    if (loading) {
        return (
            <section className="py-20 bg-[#0A0A0A]">
                <div className="mx-auto px-6 lg:px-24 text-center text-white/50">
                    Loading team...
                </div>
            </section>
        );
    }

    if (team.length === 0) {
        return null;
    }

    return (
        <section aria-label="Creativio team members" className="py-20 lg:py-28 bg-[#0A0A0A]">
            <div className="mx-auto px-6 lg:px-24">
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
                        <RevealSection key={member._id} delay={i * 120}>
                            <div className="group cursor-pointer">
                                <div className="img-zoom aspect-3/4 rounded-sm overflow-hidden bg-white/5 mb-4">
                                    <Image
                                        src={member.image?.url || "/images/team-person-1.png"}
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
