"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Crest from "./Crest";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#gallery", label: "Gallery" },
  { href: "#projects", label: "Projects" },
  { href: "#magazine", label: "Magazine" },
  { href: "#batch-party", label: "Batch Party" },
  { href: "#team", label: "Team" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 shadow-elegant backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="container-narrow flex h-16 items-center justify-between md:h-20">
        <a
          href="#top"
          className="group flex items-center gap-3"
          aria-label="ACOBA 2020 Group home"
        >
          <Crest
            size={44}
            className="transition-transform duration-300 group-hover:scale-105"
            ringClassName="bg-maroon text-gold"
            fallbackTextClassName="text-lg"
          />
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-serif text-base font-bold text-maroon md:text-lg">
              ACOBA &lsquo;20
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold-700">
              2020 Group
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-sm font-medium text-ink transition-colors duration-200 hover:text-maroon"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="hidden md:inline-flex btn-primary">
          Contact Us
        </a>

        <button
          type="button"
          className="rounded-md p-2 text-maroon md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <div
        className={`overflow-hidden bg-white shadow-elegant transition-[max-height] duration-300 md:hidden ${
          open ? "max-h-[420px]" : "max-h-0"
        }`}
      >
        <ul className="container-narrow flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={handleNavClick}
                className="block rounded-md px-3 py-3 text-sm font-medium text-ink transition-colors hover:bg-maroon-50 hover:text-maroon"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href="#contact"
              onClick={handleNavClick}
              className="btn-primary w-full"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
