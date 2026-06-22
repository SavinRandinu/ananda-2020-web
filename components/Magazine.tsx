"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BookOpen, Download } from "lucide-react";
import { siteContent } from "@/data/siteContent";
import { supabase } from "@/lib/supabase";
import Reveal from "./Reveal";

interface MagazineData {
  eyebrow: string;
  title: string;
  description: string;
  coverImage: string;
  downloadUrl: string;
  readUrl: string;
}

export default function Magazine() {
  const [magazine, setMagazine] = useState<MagazineData>({
    eyebrow: siteContent.magazine.eyebrow,
    title: siteContent.magazine.title,
    description: siteContent.magazine.description,
    coverImage: siteContent.magazine.coverImage,
    downloadUrl: siteContent.magazine.downloadUrl,
    readUrl: siteContent.magazine.readUrl,
  });

  useEffect(() => {
    const fetchMagazine = async () => {
      try {
        const { data, error } = await supabase
          .from("magazine")
          .select("*")
          .eq("id", 1)
          .single();

        if (error) {
          console.warn("Failed to fetch magazine from Supabase:", error.message);
        } else if (data) {
          setMagazine({
            eyebrow: data.eyebrow || siteContent.magazine.eyebrow,
            title: data.title,
            description: data.description,
            coverImage: data.cover_image,
            downloadUrl: data.download_url || "#",
            readUrl: data.read_url || "#",
          });
        }
      } catch (err) {
        console.warn("Error fetching magazine:", err);
      }
    };
    fetchMagazine();
  }, []);

  return (
    <section id="magazine" className="section-padding bg-cream/40">
      <div className="container-narrow grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="relative mx-auto w-full max-w-sm">
            <div
              aria-hidden
              className="absolute -inset-3 -z-10 rounded-2xl bg-gold-shimmer opacity-30 blur-xl"
            />
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl border-4 border-gold/40 shadow-elegant-lg">
              <Image
                src={magazine.coverImage}
                alt="Batch magazine cover"
                fill
                sizes="(min-width: 1024px) 33vw, 80vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/80 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
                  The Anandian
                </div>
                <div className="mt-1 font-serif text-2xl font-bold">
                  ACOBA 2020
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <span className="eyebrow">{magazine.eyebrow}</span>
          <h2 className="mt-3 heading-serif">{magazine.title}</h2>
          <div className="mt-5 h-[3px] w-16 bg-gold" />
          <p className="mt-6 text-base leading-relaxed text-ink/75 md:text-lg">
            {magazine.description}
          </p>
          <ul className="mt-8 space-y-3 text-sm text-ink/70">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
              Reflections from teachers and old boys
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
              A pictorial journey through our years at Ananda
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
              Articles, poetry, and tributes by our batch
            </li>
          </ul>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={magazine.readUrl}
              className="btn-primary"
              target="_blank"
              rel="noreferrer"
            >
              <BookOpen size={16} />
              Read Online
            </a>
            <a
              href={magazine.downloadUrl}
              className="btn-outline"
              target="_blank"
              rel="noreferrer"
            >
              <Download size={16} />
              Download PDF
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
