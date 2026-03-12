"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { api } from "@/lib/api";

gsap.registerPlugin(ScrollTrigger);

const colors = ["bg-slate-900", "bg-blue-600", "bg-emerald-600", "bg-rose-600", "bg-purple-600", "bg-orange-600"];

export default function HorizontalServices() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.getPublicServices();
        if (response.success) {
          const mapped = response.data.map((service: any, index: number) => ({
            id: service.slug,
            title: service.title,
            desc: service.shortDescription,
            color: colors[index % colors.length],
          }));
          setServices(mapped);
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useGSAP(() => {
    if (loading || services.length === 0 || !ghostRef.current || !pinRef.current) return;

    // Explicitly kill any existing ScrollTriggers on this specific trigger to avoid duplicates
    const staleTriggers = ScrollTrigger.getAll().filter(t => t.trigger === ghostRef.current);
    staleTriggers.forEach(t => t.kill());

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".service-card");
      if (cards.length === 0) return;

      const amountToScroll = (cards.length - 1) * -100;

      gsap.to(cards, {
        xPercent: amountToScroll,
        ease: "none",
        scrollTrigger: {
          trigger: ghostRef.current,
          start: "top top",
          end: () => `+=${cards.length * 1000}`,
          scrub: 1,
          pin: pinRef.current, // Pin the inner ref, not the root ghostRef
          invalidateOnRefresh: true,
          anticipatePin: 1,
          fastScrollEnd: true,
        },
      });
    }, ghostRef);

    // Give the browser time to paint before refreshing
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, { scope: ghostRef, dependencies: [services, loading] });

  if (loading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (services.length === 0) return null;

  return (
    <div id="services-section" ref={ghostRef} className="bg-black relative">
      {/* 
          We pin this inner container. 
          The outer div (ghostRef) acts as the trigger and provides the length.
      */}
      <div
        ref={pinRef}
        className="h-screen w-full overflow-hidden relative flex items-center"
      >
        <div
          ref={scrollRef}
          className="flex flex-nowrap h-full"
          style={{ width: `${services.length * 100}%` }}
        >
          {services.map((service, index) => (
            <Link
              key={index}
              href={`/services/${service.id}`}
              className={`service-card h-screen w-screen shrink-0 flex items-center justify-center text-white hover:opacity-90 transition-opacity`}
            >
              <div className="max-w-6xl px-10 text-center">
                <h3 className="text-4xl md:text-7xl lg:text-8xl font-black leading-tight uppercase mb-4">
                  {service.title}
                </h3>
                <p className="text-lg md:text-xl lg:text-2xl mt-8 max-w-4xl mx-auto opacity-80 mb-8">
                  {service.desc}
                </p>
                <button className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-full hover:bg-white/30 transition-all duration-300">
                  Learn More
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}