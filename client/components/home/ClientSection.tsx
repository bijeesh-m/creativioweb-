"use client";

import React from "react";
import { 
  SiApple, 
  SiNike, 
  SiTesla, 
  SiSpotify, 
  SiVimeo, 
  SiAirbnb, 
  SiUber, 
  SiSquare, 
  SiFigma 
} from "react-icons/si";

const CLIENTS = [
  { name: "Apple", Icon: SiApple },
  { name: "Nike", Icon: SiNike },
  { name: "Tesla", Icon: SiTesla },
  { name: "Spotify", Icon: SiSpotify },
  { name: "Vimeo", Icon: SiVimeo },
  { name: "Airbnb", Icon: SiAirbnb },
  { name: "Uber", Icon: SiUber },
  { name: "Square", Icon: SiSquare },
  { name: "Figma", Icon: SiFigma },
];

export default function ClientSection() {
  return (
    <section className="py-24 bg-transparent overflow-hidden border-t border-b border-white/10 relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-50" />
      
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-semibold tracking-widest text-[#E6F0FF] uppercase">Trusted Partners</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-[#E6F0FF] leading-tight max-w-2xl">
            Collaborating with global <span className="italic text-white/50">industry leaders.</span>
          </h2>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full flex overflow-hidden group py-10">
        
        {/* Gradient Masks for smooth fading edges */}
        <div className="absolute top-0 left-0 w-16 md:w-80 h-full bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-16 md:w-80 h-full bg-gradient-to-l from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee group-hover:[animation-play-state:paused] flex whitespace-nowrap items-center">
          {/* First set of logos */}
          {CLIENTS.map((client, index) => (
            <div 
              key={`client-1-${index}`} 
              className="flex items-center justify-center mx-6 sm:mx-10 md:mx-20 text-white/40 hover:text-white hover:scale-110 transition-all duration-500 cursor-pointer"
            >
              <client.Icon className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 object-contain drop-shadow-sm" title={client.name} />
            </div>
          ))}
          {/* Duplicated set for seamless loop */}
          {CLIENTS.map((client, index) => (
            <div 
              key={`client-2-${index}`} 
              className="flex items-center justify-center mx-6 sm:mx-10 md:mx-20 text-white/40 hover:text-white hover:scale-110 transition-all duration-500 cursor-pointer"
            >
              <client.Icon className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 object-contain drop-shadow-sm" title={client.name} />
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
