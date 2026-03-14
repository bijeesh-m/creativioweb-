"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";

export default function ClientSection() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await api.getPublicClients();
        if (response.success) {
          setClients(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch clients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading || clients.length === 0) return null;
  return (
    <section className="py-24 bg-transparent overflow-hidden border-t border-b border-white/10 relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none opacity-50" />

      <div className=" mx-auto px-4 sm:px-6 lg:px-24 mb-16 relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-semibold font-sans tracking-widest text-[#E6F0FF] uppercase">Trusted Partners</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-quizlo font-black text-[#E6F0FF] leading-tight max-w-2xl">
            Collaborating with global <span className="italic text-white/50">industry leaders.</span>
          </h2>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full flex overflow-hidden group py-10">

        {/* Gradient Masks for smooth fading edges */}
        <div className="absolute top-0 left-0 w-16 md:w-80 h-full bg-linear-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-16 md:w-80 h-full bg-linear-to-l from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee group-hover:[animation-play-state:paused] flex whitespace-nowrap items-center">
          {/* First set of logos */}
          {clients.map((client, index) => (
            <div
              key={`client-1-${index}`}
              className="flex items-center justify-center mx-8 sm:mx-12 md:mx-24 text-white/40 hover:text-white hover:scale-110 transition-all duration-500 cursor-pointer"
            >
              <img
                src={client.logo.url}
                alt={client.name}
                className="w-auto h-16 sm:h-20 md:h-28 lg:h-36 max-w-[200px] sm:max-w-[250px] md:max-w-[350px] lg:max-w-[450px] object-contain filter grayscale brightness-200 hover:grayscale-0 transition-all duration-500"
                title={client.name}
              />
            </div>
          ))}
          {/* Duplicated set for seamless loop */}
          {clients.map((client, index) => (
            <div
              key={`client-2-${index}`}
              className="flex items-center justify-center mx-8 sm:mx-12 md:mx-24 text-white/40 hover:text-white hover:scale-110 transition-all duration-500 cursor-pointer"
            >
              <img
                src={client.logo.url}
                alt={client.name}
                className="w-auto h-16 sm:h-20 md:h-28 lg:h-36 max-w-[200px] sm:max-w-[250px] md:max-w-[350px] lg:max-w-[450px] object-contain filter grayscale brightness-200 hover:grayscale-0 transition-all duration-500"
                title={client.name}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
          width: max-content;
        }
      `}</style>
    </section>
  );
}
