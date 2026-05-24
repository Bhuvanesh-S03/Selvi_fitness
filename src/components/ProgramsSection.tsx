"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const programs = [
  { title: "Strength Training", image: "/gallery/weights.png", description: "Build raw power and muscle." },
  { title: "Weight Loss & Cardio", image: "/gallery/Cardio.png", description: "Engineered for fat burning." },
  { title: "CrossFit & Functional", image: "/gallery/gym landscape.png", description: "High-intensity functional movement." }
];

export default function ProgramsSection() {
  
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  
  useEffect(() => {
    if (!sectionRef.current) return;
  
    let ctx = gsap.context(() => {
      // Cards reveal
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            }
          }
        );
      });
    }, sectionRef);
  
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="programs" className="relative w-full bg-transparent text-white py-32 px-6 md:px-12 z-10 pt-48">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {programs.map((program, i) => (
            <article
              key={i}
              ref={el => { cardsRef.current[i] = el; }}
              className="group relative h-[60vh] md:h-[70vh] bg-transparent border border-white/10 p-8 flex flex-col justify-end overflow-hidden"
            >
              <Image
                src={program.image}
                alt={`${program.title} at Selvi Fitness, the best gym in Villianur`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover filter contrast-[1.1] opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              {/* Hide AI watermark in bottom right corner */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-[#050505] via-[#050505]/80 to-transparent z-10 pointer-events-none" aria-hidden="true"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent z-10 pointer-events-none" aria-hidden="true"></div>

              <div className="relative z-20 transform translate-z-12 group-hover:-translate-y-4 transition-transform duration-500">
                <div className="w-8 h-[1px] bg-[#FF5A36] mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>
                <h3 className="text-3xl font-bold tracking-tight uppercase mb-2 group-hover:text-[#FF5A36] transition-colors duration-300 drop-shadow-md">
                  {program.title}
                </h3>
                <p className="text-white/80 font-medium tracking-wide drop-shadow-md">
                  {program.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}