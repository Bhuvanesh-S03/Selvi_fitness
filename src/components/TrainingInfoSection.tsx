"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "1-ON-1 PERSONAL TRAINING",
    description: "Elite coaching tailored to your exact body type and goals. We don't do generic workouts."
  },
  {
    title: "EXPERT WOMEN TRAINERS",
    description: "Certified female coaches providing dedicated guidance, support, and specialized programs."
  },
  {
    title: "EXCLUSIVE WOMEN TIMINGS",
    description: "Dedicated hours strictly for women, ensuring complete privacy and absolute comfort."
  }
];

export default function TrainingInfoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !listRef.current) return;

    let ctx = gsap.context(() => {
      const items = listRef.current?.querySelectorAll("li");
      if (items) {
        gsap.fromTo(items, 
          { opacity: 0, x: -50 },
          { 
            opacity: 1, 
            x: 0, 
            duration: 1, 
            stagger: 0.2, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%"
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative w-full pt-16 pb-24 px-6 md:px-12 z-20 bg-transparent overflow-hidden">
      
      {/* Background Frame from Hero Sequence */}
      <div className="absolute inset-0 z-0 bg-[#050505] pointer-events-none">
        <div className="absolute inset-y-0 right-[-5%] md:right-[-5%] w-[80%] md:w-[70%] z-0 top-[5%] h-[105%]">
          <Image
            src="/gallery/hero_section.png"
            alt="Premium strength training and professional gym equipment at Selvi Fitness Villianur"
            fill
            sizes="(max-width: 768px) 80vw, 70vw"
            className="object-contain object-top opacity-100 filter contrast-[1.1]"
            style={{ 
              maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)", 
              WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)" 
            }}
          />
        </div>
        {/* Blending Gradients for absolute seamless integration */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent w-[80%] md:w-[60%]" aria-hidden="true"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-[#050505] via-[#050505]/60 to-transparent w-[30%] md:w-[25%] right-0 left-auto" aria-hidden="true"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/60 to-transparent h-[30vh]" aria-hidden="true"></div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent h-[50vh]" aria-hidden="true"></div>
      </div>

      <div className="container mx-auto relative z-10 flex flex-col md:flex-row items-center">
        
        {/* Left Side Content */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-[#FF5A36]"></div>
            <span className="text-[#FF5A36] font-bold tracking-widest text-sm uppercase">Elite Standard</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase mb-12 text-white drop-shadow-lg leading-tight">
            Train Under <br/>
            <span className="text-[#FF5A36] italic">Expert Guidance.</span>
          </h2>

          <ul ref={listRef} className="space-y-8 max-w-lg mb-12">
            {features.map((feature, i) => (
              <li key={i} className="flex flex-col border-l-2 border-white/10 pl-6 hover:border-[#FF5A36] transition-colors duration-500">
                <h3 className="text-2xl font-bold tracking-tight uppercase text-white mb-2">{feature.title}</h3>
                <p className="text-white/70 font-medium">{feature.description}</p>
              </li>
            ))}
          </ul>

          {/* WhatsApp button removed as requested */}
        </div>
        
      </div>
    </section>
  );
}
