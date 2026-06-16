"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { galleryItems, type GalleryItem } from "@/data/gallery";
import { supabase } from "@/lib/supabase";
import Reveal from "./Reveal";

const spanClasses: Record<NonNullable<GalleryItem["span"]>, string> = {
  default: "md:col-span-1 md:row-span-1",
  wide: "md:col-span-2 md:row-span-1",
  tall: "md:col-span-1 md:row-span-2",
};

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [items, setItems] = useState<GalleryItem[]>(galleryItems);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data, error } = await supabase
          .from("gallery")
          .select("*")
          .order("created_at", { ascending: true });

        if (error) {
          console.warn("Failed to fetch gallery from Supabase:", error.message);
        } else if (data && data.length > 0) {
          setItems(data as GalleryItem[]);
        }
      } catch (err) {
        console.warn("Error fetching gallery:", err);
      }
    };
    fetchGallery();
  }, []);

  const close = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(
    () =>
      setActiveIndex((i) =>
        i === null ? null : (i + 1) % items.length,
      ),
    [items.length],
  );
  const prev = useCallback(
    () =>
      setActiveIndex((i) =>
        i === null
          ? null
          : (i - 1 + items.length) % items.length,
      ),
    [items.length],
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, close, next, prev]);

  const active = activeIndex !== null ? items[activeIndex] : null;

  return (
    <section
      id="gallery"
      className="section-padding bg-cream/40"
    >
      <div className="container-narrow">
        <Reveal className="text-center">
          <span className="eyebrow">Our Memories</span>
          <h2 className="mt-3 heading-serif">Photo Gallery</h2>
          <div className="gold-divider mt-5" />
          <p className="mx-auto mt-6 max-w-2xl text-ink/70">
            Moments captured through our journey, from classrooms and corridors
            to celebrations and reunions.
          </p>
        </Reveal>

        <div className="mt-14 grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[180px] md:auto-rows-[200px] md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {items.map((item, idx) => (
            <Reveal
              key={item.id}
              delay={(idx % 4) * 0.05}
              className={`group relative overflow-hidden rounded-xl bg-white shadow-elegant transition-shadow duration-300 hover:shadow-elegant-lg ${
                spanClasses[item.span ?? "default"]
              }`}
            >
              <button
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`View ${item.alt}`}
                className="block h-full w-full"
              >
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/70 via-maroon-900/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  {item.caption && (
                    <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-4 text-left text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      {item.caption}
                    </div>
                  )}
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-maroon-950/95 p-3 sm:p-4"
            onClick={close}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:right-4 sm:top-4"
            >
              <X size={22} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
              className="absolute left-2 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:left-4 sm:p-3 md:left-8"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
              className="absolute right-2 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:right-4 sm:p-3 md:right-8"
            >
              <ChevronRight size={22} />
            </button>

            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative flex max-h-[90vh] w-full max-w-5xl flex-col items-center justify-center px-10 sm:px-16"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[70vh] w-full sm:h-[78vh]">
                <Image
                  src={active.src}
                  alt={active.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 80vw, 100vw"
                  className="rounded-lg object-contain"
                />
              </div>
              {active.caption && (
                <div className="mt-3 px-2 text-center font-serif text-sm italic text-gold sm:mt-4 sm:text-base">
                  {active.caption}
                </div>
              )}
              <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
                {activeIndex + 1} / {galleryItems.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
