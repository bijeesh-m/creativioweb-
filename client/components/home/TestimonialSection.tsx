"use client";

import Image from "next/image";
import { RevealSection } from "@/components/RevealAnimation";

export default function TestimonialSection() {
    return (
        <section id="testimonials" className="py-28 lg:py-36 bg-[#0A0A0A] border-t border-white/5 border-b">
            <div className="max-w-[900px] mx-auto px-6 lg:px-12 text-center">
                <RevealSection>
                    <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-accent mb-12">
                        What Our Clients Say
                    </p>
                </RevealSection>

                <RevealSection delay={150} duration={1100}>
                    <blockquote className="font-serif italic text-2xl sm:text-3xl lg:text-[2.2rem] text-[#E6F0FF] leading-[1.5] lg:leading-[1.55]">
                        &ldquo;Working with Creativio was a revelation. Their strategic
                        approach to our brand refresh resulted in a{" "}
                        <span className="underline decoration-accent/40 underline-offset-4 text-accent">
                            40%
                        </span>{" "}
                        increase in engagement. Truly world-class.&rdquo;
                    </blockquote>
                </RevealSection>

                <RevealSection delay={300}>
                    <div className="mt-10 flex flex-col items-center">
                        <div className="w-14 h-14 rounded-full overflow-hidden mb-4 ring-2 ring-white/10 shadow-lg">
                            <Image
                                src="/images/testimonial-person.png"
                                alt="Sarah Jenkins"
                                width={56}
                                height={56}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                        <p className="text-sm font-semibold text-[#E6F0FF]">Sarah Jenkins</p>
                        <p className="text-[11px] tracking-wider uppercase text-[#E6F0FF]/40 mt-0.5">
                            CMO, Meridian Ventures
                        </p>
                    </div>
                </RevealSection>
            </div>
        </section>
    );
}
