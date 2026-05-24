"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const transformations = [
  {
    name: "Rahul S.",
    title: "105kg to 82kg in 6 Months",
    image: "/gallery/Cardio.png",
    story: "Lost 23kg of pure fat while building a solid foundation of strength."
  },
  {
    name: "Arvind K.",
    title: "Strength Built From Zero",
    image: "/gallery/weights.png",
    story: "From struggling with the empty bar to deadlifting 180kg in one year."
  },
  {
    name: "Vikram P.",
    title: "Complete Lifestyle Change",
    image: "/gallery/gym landscape.png",
    story: "Reclaimed his health, improved his posture, and built unshakeable discipline."
  }
];

export default function TransformationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !scrollWrapperRef.current) return;

    let ctx = gsap.context(() => {
      const getScrollAmount = () => -(scrollWrapperRef.current!.scrollWidth - window.innerWidth);

      gsap.to(scrollWrapperRef.current, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="transformations" className="relative w-full h-[300vh] bg-transparent text-white z-20">
      
      {/* Sticky container that stays in viewport while we scroll down 300vh */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        
        {/* Dim overlay to ensure text remains readable as we scroll over the background canvas */}
        <div className="absolute inset-0 bg-[#050505]/70 z-0 pointer-events-none"></div>
        
        <div className="absolute top-6 md:top-12 left-6 md:left-12 z-0">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase mb-2 drop-shadow-lg">
            Real <span className="text-[#FF5A36]">Transformations.</span>
          </h2>
          <p className="text-white/80 font-medium tracking-wide drop-shadow-md">Scroll to witness the discipline.</p>
        </div>

        <div ref={scrollWrapperRef} className="flex h-full w-[300vw] z-10">
          {transformations.map((item, index) => (
            <article key={index} className="transform-card w-screen h-full flex items-center justify-center p-6 pt-24 md:p-12 md:pt-36 relative">
              <div className="relative w-full max-w-5xl h-[60vh] md:h-[70vh] flex flex-col md:flex-row group border border-white/10 bg-[#050505] rounded-sm overflow-hidden shadow-2xl">
                
                {/* Full-width Image Container */}
                <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={`${item.name} fitness transformation at Selvi Fitness - ${item.title}`}
                    fill
                    sizes="100vw"
                    className="object-cover opacity-100"
                  />
                  {/* Hide AI watermark in bottom right corner */}
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#050505] via-[#050505]/80 to-transparent z-10" aria-hidden="true"></div>
                  {/* Mobile gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-[#050505]/50 to-transparent md:hidden" aria-hidden="true"></div>
                  {/* Desktop subtle uniform overlay so text is readable but image is fully visible */}
                  <div className="hidden md:block absolute inset-0 bg-[#050505]/30 w-full" aria-hidden="true"></div>
                </div>

                {/* Text Container */}
                <div className="w-full md:w-1/2 h-full z-10 p-8 md:p-16 flex flex-col justify-center relative mt-auto md:mt-0 md:ml-auto">
                  <div className="mb-4">
                    <div className="w-12 h-[1px] bg-[#FF5A36] mb-4" aria-hidden="true"></div>
                    <h3 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase mb-4 text-white drop-shadow-lg">
                      {item.title}
                    </h3>
                    <p className="text-xl md:text-2xl text-[#FF5A36] font-bold tracking-tight uppercase mb-6 drop-shadow-md">
                      {item.name}
                    </p>
                  </div>
                  <p className="text-white/90 font-medium tracking-wide text-lg drop-shadow-md">
                    {item.story}
                  </p>
                </div>

              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
