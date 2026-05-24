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

    // Handle high DPI displays, but cap DPR to 1.5 to prevent extreme lag on retina/4k screens
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      // Re-apply smoothing when canvas resizes
      if (context) {
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
      }
    };
    
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    const images: HTMLImageElement[] = [];
    let imagesLoaded = 0;

    const currentFrame = (index: number) =>
      `/hero-sequence/ezgif-frame-${(index + 1).toString().padStart(3, "0")}.jpg`;

    const render = (index: number, progress: number = 0) => {
      if (images[index] && images[index].complete) {
        const img = images[index];
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        
        // Very slow zoom based on scroll progress
        const scale = 1 + progress * 0.15; // zooms up to 1.15x
        
        // Use Math.round to prevent sub-pixel rendering which causes pixelation/blur
        const imgWidth = Math.round(img.width * ratio * scale);
        const imgHeight = Math.round(img.height * ratio * scale);
        
        // Center on mobile to show the person, shift right on desktop to leave room for text
        const isMobile = window.innerWidth < 768;
        const centerShift_x = isMobile 
          ? Math.round((canvas.width - imgWidth) / 2)
          : Math.round((canvas.width - imgWidth) + (canvas.width * 0.05));
          
        // Shift slightly down as requested
        const centerShift_y = Math.round((canvas.height - imgHeight) / 2 + (canvas.height * 0.05));

        // Only draw the image. Let CSS handle the background and gradients to improve performance.
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Ensure high quality smoothing before drawing
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        
        context.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          centerShift_x,
          centerShift_y,
          imgWidth,
          imgHeight
        );
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
              updateCanvasSize(); // ensure it's sized
              render(0, 0);
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
            render(frameIndex, self.progress);
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
      window.removeEventListener("resize", updateCanvasSize);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen">
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-[#050505]">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover filter brightness-[1.15] contrast-[1.05]"
          aria-hidden="true"
        />
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
