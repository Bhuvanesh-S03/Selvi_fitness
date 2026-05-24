"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Programs", href: "#programs" },
  { name: "Transformations", href: "#transformations" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Hide navbar only after scrolling past the hero section (first page)
      setIsScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 bg-transparent py-6 ${
          isScrolled ? "-translate-y-full" : "translate-y-0"
        }`}
        aria-label="Main Navigation"
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between relative">
          <Link href="/" className="text-3xl md:text-4xl font-bold tracking-tighter uppercase" aria-label="Selvi Fitness Home">
            Selvi<span className="text-[var(--color-primary)]">Fitness</span>
          </Link>

          {/* Desktop Menu - Absolutely Centered */}
          <div className="hidden md:flex items-center space-x-16 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-bold tracking-wide text-white/70 hover:text-white transition-colors duration-300 uppercase"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-2 relative z-50 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Toggle Menu"
          >
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-[#050505] flex flex-col justify-center px-8"
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col space-y-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-4xl font-bold tracking-tighter uppercase text-white/90 hover:text-[var(--color-primary)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
