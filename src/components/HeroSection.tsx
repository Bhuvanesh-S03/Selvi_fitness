"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 166;

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    // The ultimate 4K optimization: 
    // We let the canvas match the EXACT native resolution of the sequence frame.
    // We then let CSS `object-fit: cover` and `transform` handle the scaling.
    // CSS scaling uses the browser's GPU hardware bicubic/lanczos filtering,
    // which is infinitely superior and crisper than canvas upscaling, especially on mobile!
    const updateCanvasSize = (imgWidth: number, imgHeight: number) => {
      if (canvas.width !== imgWidth || canvas.height !== imgHeight) {
        canvas.width = imgWidth;
        canvas.height = imgHeight;
        if (context) {
          context.imageSmoothingEnabled = true;
          context.imageSmoothingQuality = "high";
        }
      }
    };

    const images: HTMLImageElement[] = [];
    let imagesLoaded = 0;

    const currentFrame = (index: number) =>
      `/hero-sequence/ezgif-frame-${(index + 1).toString().padStart(3, "0")}.jpg`;

    const render = (index: number) => {
      if (images[index] && images[index].complete) {
        const img = images[index];
        
        // Ensure canvas exactly matches the image's raw pixels
        updateCanvasSize(img.width, img.height);
        
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        
        // Draw exactly 1:1 raw pixels. NO math. NO sub-pixels. Pure pristine quality.
        context.drawImage(img, 0, 0, img.width, img.height);
      }
    };

    // Preload progressively
    // Load first 10 frames aggressively for immediate response, then load the rest
    const preloadImages = () => {
      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        
        const load = () => {
          img.src = currentFrame(i);
          img.onload = () => {
            imagesLoaded++;
            if (i === 0) {
              render(0);
            }
          };
        };
        
        if (i < 10) {
          load(); // Load immediately
        } else {
          // Stagger the rest to prevent freezing the main thread and network
          setTimeout(load, i * 10);
        }
        
        images.push(img);
      }
    };
    
    preloadImages();

    let ctx = gsap.context(() => {
      // Canvas Scroll Animation (triggered over the whole page)
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.1, // Reduced scrub delay significantly for highly responsive smooth flow
        onUpdate: (self) => {
          // Use requestAnimationFrame to ensure drawing matches browser refresh rate
          requestAnimationFrame(() => {
            const frameIndex = Math.min(
              FRAME_COUNT - 1,
              Math.floor(self.progress * FRAME_COUNT)
            );
            render(frameIndex);
            
            // Apply zoom via highly optimized CSS 3D transform instead of canvas redrawing!
            if (canvasRef.current) {
               const scale = 1 + self.progress * 0.15;
               canvasRef.current.style.transform = `scale3d(${scale}, ${scale}, 1)`;
            }
          });
        },
      });

      // Text Fade in animation
      if (contentRef.current) {
        gsap.fromTo(contentRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 2, ease: "power2.out", delay: 0.2 }
        );
      }
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen">
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-[#050505] overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover object-center md:object-[95%_center] origin-center will-change-transform"
          style={{ filter: "brightness(1.15) contrast(1.05) blur(0.5px)" }}
          aria-hidden="true"
        />
        {/* Advanced Technique: Film Grain Noise Overlay to mask JPEG compression macro-blocking */}
        <svg 
          viewBox="0 0 200 200" 
          xmlns="http://www.w3.org/2000/svg" 
          className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none mix-blend-overlay z-0"
        >
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>

        {/* Hardware-accelerated CSS overlays for gradients instead of canvas drawing (fixes lag) */}
        {/* Subtle left gradient to help text pop without hiding the image */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 via-[#050505]/20 to-transparent w-[60%] md:w-[50%] z-0" aria-hidden="true"></div>
        {/* Dim only the top navigation area slightly for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/90 via-[#050505]/50 to-transparent h-[20vh] md:h-[25vh] z-0" aria-hidden="true"></div>
      </div>
      
      <div ref={contentRef} className="flex flex-col justify-center min-h-screen px-6 md:px-12 md:w-[60%] lg:w-[50%] relative z-10 text-left pt-20">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-[1px] bg-[#FF5A36]"></div>
          <span className="text-[#FF5A36] font-bold tracking-widest text-sm uppercase">Villianur Premium</span>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tighter uppercase leading-[0.9] text-white">
          Build Power.<br />
          Build <br />
          <span className="text-[#FF5A36] italic pr-4">Confidence.</span>
        </h1>
        <p className="mt-8 text-white/70 max-w-md text-lg font-medium">
          Elite strength training, fat loss coaching, and transformation programs built for serious results in Villianur.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-12 pointer-events-auto w-fit">
          <a
            href="https://wa.me/919677581202"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact Selvi Fitness on WhatsApp"
            className="group relative inline-flex items-center justify-center px-10 py-4 text-sm font-bold tracking-widest text-white uppercase bg-[#FF5A36] overflow-hidden rounded-sm transition-colors"
          >
            <span className="relative z-10 transition-transform duration-500 group-hover:scale-105">Contact</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" aria-hidden="true"></div>
          </a>
          <a
            href="#programs"
            aria-label="View Selvi Fitness Programs"
            className="group relative inline-flex items-center justify-center px-10 py-4 text-sm font-bold tracking-widest text-white uppercase border border-white/20 bg-transparent hover:bg-white/5 overflow-hidden rounded-sm transition-colors duration-500"
          >
            <span className="relative z-10 transition-transform duration-500 group-hover:scale-105">Programs</span>
          </a>
        </div>
      </div>
    </section>
  );
}
