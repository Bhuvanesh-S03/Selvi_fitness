"use client";

import Image from "next/image";
import { MapPin, Phone, Clock, Send, MessageCircle } from "lucide-react";

export default function FooterContact() {
  return (
    <footer id="contact" className="relative w-full bg-transparent text-white pt-8 pb-12 px-6 md:px-12 z-20">
      <div className="absolute inset-0 z-0 bg-[#050505]">
        <div className="absolute inset-y-0 left-0 w-[60%] md:w-[35%] z-0">
          <Image
            src="/gallery/reception.jpeg"
            alt="Selvi Fitness Gym Reception Area"
            fill
            sizes="(max-width: 768px) 60vw, 35vw"
            className="object-cover opacity-85 filter grayscale-[40%]"
            style={{ 
              maskImage: "linear-gradient(to right, black 85%, transparent 100%)", 
              WebkitMaskImage: "linear-gradient(to right, black 85%, transparent 100%)" 
            }}
          />
        </div>
        {/* Blending Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-transparent h-[15vh] z-10" aria-hidden="true"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#050505]/90 to-[#050505]" aria-hidden="true"></div>
      </div>
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 xl:gap-16">
          
          {/* Left Column: SEO Content & Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-6">
                Start Your <span className="text-[var(--color-primary)]">Transformation.</span>
              </h2>
              <p className="text-white/60 font-medium leading-relaxed mb-8">
                Selvi Fitness is the <strong className="text-white">best gym in Villianur</strong>. We offer premium <strong className="text-white">strength training</strong>, <strong className="text-white">weight loss</strong>, and <strong className="text-white">CrossFit</strong> programs with expert guidance.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-[var(--color-primary)] shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold tracking-wide uppercase mb-1">Location</h4>
                    <p className="text-white/60">Villianur, Puducherry<br/>Opposite to Shree Raja Thirumana Mahal<br/>India</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-[var(--color-primary)] shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold tracking-wide uppercase mb-1">Gym Timings</h4>
                    <p className="text-white/60">Mon - Sat: 5:00 AM - 10:00 PM<br/>Sun: 6:00 AM - 12:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <a 
                href="https://wa.me/919677581202" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Selvi Fitness"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold tracking-widest text-white uppercase bg-[#25D366] hover:bg-[#1ebe57] transition-colors duration-300 rounded-sm w-full"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                WhatsApp Us
              </a>
              <a 
                href="tel:+919677581202"
                aria-label="Call Selvi Fitness"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold tracking-widest text-white uppercase bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] transition-colors duration-300 rounded-sm w-full"
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                Call Now
              </a>
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=11.917056,79.753028" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get Directions to Selvi Fitness"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold tracking-widest text-white uppercase border border-white/20 bg-transparent hover:bg-white/5 transition-colors duration-300 rounded-sm w-full"
              >
                <MapPin className="w-5 h-5" aria-hidden="true" />
                Get Directions
              </a>
            </div>
          </div>

          {/* Center Column: Map */}
          <div className="flex flex-col items-center justify-center mt-auto mb-auto w-full">
            <div className="w-full max-w-[400px] mx-auto h-[300px] lg:h-[350px] bg-[#0A0A0A] border-4 border-white/10 rounded-3xl overflow-hidden relative">
              <iframe 
                src="https://maps.google.com/maps?q=11.917056,79.753028&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location of Selvi Fitness in Villianur"
                className="absolute inset-0"
              ></iframe>
            </div>
            <p className="text-white/60 text-sm font-medium mt-4 text-center">
              Opposite to Shree Raja Thirumana Mahal
            </p>
          </div>

          {/* Right Column: Quick Inquiry Form */}
          <div className="w-full max-w-sm mx-auto bg-[#0A0A0A] p-6 lg:p-8 border border-white/5 rounded-sm flex flex-col justify-center">
            <h3 className="text-2xl font-bold tracking-tighter uppercase mb-6">Quick Inquiry</h3>
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const name = formData.get('name');
              const phone = formData.get('phone');
              const program = formData.get('program');
              
              const programNames: Record<string, string> = {
                strength: "Strength Training",
                weightloss: "Weight Loss",
                crossfit: "CrossFit",
                personal: "Personal Training"
              };
              
              const programName = program ? programNames[program as string] : "a program";
              const message = `Hi, I am ${name}. My contact number is ${phone}. I am inquiring about the ${programName} program at Selvi Fitness.`;
              const whatsappUrl = `https://wa.me/919677581202?text=${encodeURIComponent(message)}`;
              window.open(whatsappUrl, '_blank');
            }}>
              <div>
                <input name="name" aria-label="Your Name" type="text" placeholder="Your Name" className="w-full bg-[#050505] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[var(--color-primary)] transition-colors" required />
              </div>
              <div>
                <input name="phone" aria-label="Phone Number" type="tel" placeholder="Phone Number" className="w-full bg-[#050505] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[var(--color-primary)] transition-colors" required />
              </div>
              <div>
                <select name="program" aria-label="Select Program" className="w-full bg-[#050505] border border-white/10 px-4 py-3 text-white/60 focus:outline-none focus:border-[var(--color-primary)] transition-colors appearance-none" required defaultValue="">
                  <option value="" disabled>Select Program</option>
                  <option value="strength">Strength Training</option>
                  <option value="weightloss">Weight Loss</option>
                  <option value="crossfit">CrossFit</option>
                  <option value="personal">Personal Training</option>
                </select>
              </div>
              <button type="submit" aria-label="Submit Inquiry Request" className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold tracking-widest text-white uppercase bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] transition-colors duration-300 rounded-sm mt-2">
                <Send className="w-4 h-4" aria-hidden="true" />
                Submit Request
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/10 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm font-medium tracking-wide">
            &copy; {new Date().getFullYear()} Selvi Fitness. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-white text-sm font-medium transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/40 hover:text-white text-sm font-medium transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
