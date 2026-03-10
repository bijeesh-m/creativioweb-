"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { servicesData } from "@/data/services";

gsap.registerPlugin(ScrollTrigger);

const colors = ["bg-slate-900", "bg-blue-600", "bg-emerald-600", "bg-rose-600", "bg-purple-600", "bg-orange-600"];

const services = servicesData.map((service, index) => ({
  id: service.id,
  title: service.title,
  desc: service.shortDescription,
  color: colors[index % colors.length],
}));

export default function HorizontalServices() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null); // This creates the "scrollable" height

  useGSAP(() => {
    const cards = gsap.utils.toArray(".service-card");
    
    // Calculate how far to move: (Number of cards - 1) * 100%
    const amountToScroll = (cards.length - 1) * -100;

    gsap.to(cards, {
      xPercent: amountToScroll,
      ease: "none",
      scrollTrigger: {
        trigger: ghostRef.current,
        start: "top top",
        end: "+=5000", // Increase this number to make the scroll feel "slower"
        scrub: 1,
        pin: true,
        snap: 1 / (cards.length - 1),
        invalidateOnRefresh: true,
      },
    });
  }, { scope: ghostRef });

  return (
    <div id="services-section" ref={ghostRef} className="bg-black">      <div className="container"></div>      {/* This is the Viewport Wrapper. 
         It's 100vh so you always see exactly one full card.
      */}
      <div className="h-screen w-full overflow-hidden relative flex items-center">
        
        <div 
          ref={scrollRef} 
          className="flex flex-nowrap h-full"
          style={{ width: `${services.length * 100}%` }}
        >
          {services.map((service, index) => (
            <Link
              key={index}
              href={`/services/${service.id}`}
              className={`service-card h-screen w-screen flex-shrink-0 flex items-center justify-center text-white  hover:opacity-90 transition-opacity`}
            >
              <div className="max-w-5xl px-10 text-center">
                
                <h3 className="text-4xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tighter uppercase mb-4">
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
      <div className="final"></div>
    </div>
  );
}