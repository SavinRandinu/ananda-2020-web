"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import { siteContent } from "@/data/siteContent";

export default function Hero() {
  const { hero } = siteContent;

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-white pt-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #800000 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[600px] w-[600px] rounded-full bg-gold-100 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 -z-10 h-[500px] w-[500px] rounded-full bg-maroon-50 blur-3xl"
      />

      <div className="container-narrow grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow"
          >
            {hero.eyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 font-serif text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem]"
          >
            <span className="text-maroon">{hero.title}</span>
            <span className="block text-ink">{hero.subtitle}</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 h-[3px] w-24 origin-left bg-gold"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 max-w-xl text-base leading-relaxed text-ink/75 md:text-lg"
          >
            {hero.welcome}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a href={hero.primaryCta.href} className="btn-primary">
              {hero.primaryCta.label}
              <ArrowRight size={16} />
            </a>
            <a href={hero.secondaryCta.href} className="btn-outline">
              {hero.secondaryCta.label}
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="relative flex flex-col items-center justify-center lg:col-span-5"
        >
          <Image
            src="/images/crest/ananda-crest.png"
            alt="Ananda College crest"
            width={320}
            height={320}
            priority
            className="h-auto w-full max-w-[10rem] object-contain sm:max-w-[12rem] md:max-w-[14rem]"
          />
          <div className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-700">
            Est. 1886
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to next section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute inset-x-0 bottom-6 mx-auto flex w-fit flex-col items-center gap-1 text-maroon"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">
          Scroll
        </span>
        <ChevronDown size={20} className="animate-bounce" />
      </motion.a>
    </section>
  );
}
