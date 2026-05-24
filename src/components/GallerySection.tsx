"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const images = [
  { src: "/gallery/gym landscape.png", alt: "Selvi Fitness Gym Floor" },
  { src: "/gallery/weights.png", alt: "Free Weights Area" },
  { src: "/gallery/Cardio.png", alt: "Cardio Section" },
];

export default function GallerySection() {
  const containerRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !galleryRef.current) return;

    // Parallax for images
    imageRefs.current.forEach((el, index) => {
      if (!el) return;
      const img = el.querySelector("img");
      if (!img) return;

      // Reveal
      gsap.fromTo(el, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          }
        }
      );

      // Parallax scroll (reduced intensity, no scale)
      gsap.to(img, {
        yPercent: 5,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} id="about" className="relative w-full py-32 px-6 md:px-12 z-20 bg-transparent">
      {/* Dim overlay to ensure visibility of text over background video */}
      <div className="absolute inset-0 bg-[#050505]/80 z-0 pointer-events-none"></div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6 text-white">
            Real Environment. <br/>
            <span className="text-white/40">Real Results.</span>
          </h2>
          <p className="max-w-xl mx-auto text-white/60 font-medium tracking-wide">
            Step into a premium training facility designed for focus, discipline, and absolute transformation.
          </p>
        </div>

        <div ref={galleryRef} className="flex flex-col gap-16 md:gap-32">
          {images.map((img, i) => (
            <div 
              key={i}
              ref={el => { imageRefs.current[i] = el; }}
              className={`relative w-full md:w-[80%] h-[50vh] md:h-[70vh] overflow-hidden ${i % 2 === 0 ? "mr-auto" : "ml-auto"}`}
            >
              <div className="absolute inset-0 bg-[#020202] z-10 opacity-20 pointer-events-none mix-blend-multiply"></div>
              {/* Subtle top/bottom gradient to blend into background */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-[#020202] z-10 pointer-events-none"></div>
              
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover filter grayscale-[20%] contrast-[1.1] mix-blend-lighten"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
