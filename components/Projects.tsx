"use client";

import { useEffect, useState } from "react";
import { projects as staticProjects } from "@/data/projects";
import { supabase } from "@/lib/supabase";
import Reveal from "./Reveal";
import { BookOpen, HandHeart, GraduationCap, Trees, Users, Info } from "lucide-react";

const iconMap: Record<string, any> = {
  BookOpen,
  HandHeart,
  GraduationCap,
  Trees,
  Users,
  Info,
};

const statusStyles: Record<string, string> = {
  Ongoing: "bg-gold-100 text-gold-800",
  Completed: "bg-maroon-50 text-maroon-700",
  Upcoming: "bg-cream text-ink/70 border border-maroon-100",
};

export default function Projects() {
  const [items, setItems] = useState<any[]>(staticProjects);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: true });

        if (error) {
          console.warn("Failed to fetch projects from Supabase:", error.message);
        } else if (data && data.length > 0) {
          setItems(data);
        }
      } catch (err) {
        console.warn("Error fetching projects:", err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="section-padding bg-white">
      <div className="container-narrow">
        <Reveal className="text-center">
          <span className="eyebrow">Giving Back</span>
          <h2 className="mt-3 heading-serif">Our Projects</h2>
          <div className="gold-divider mt-5" />
          <p className="mx-auto mt-6 max-w-2xl text-ink/70">
            Initiatives we&rsquo;re proud to lead, uplifting our school, our
            students, and our community.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((project, idx) => {
            const IconComponent = typeof project.icon === "string"
              ? (iconMap[project.icon] || Info)
              : project.icon;

            return (
              <Reveal key={project.id || idx} delay={(idx % 3) * 0.08}>
                <article className="group relative h-full overflow-hidden rounded-2xl border border-maroon-100/60 bg-white p-7 shadow-elegant transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-elegant-lg">
                  <div
                    aria-hidden
                    className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gold-50 transition-transform duration-500 group-hover:scale-125"
                  />
                  <div className="relative">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-maroon text-gold transition-transform duration-300 group-hover:scale-110">
                      <IconComponent size={22} />
                    </div>
                    <div className="mt-5 flex items-center gap-2">
                      <h3 className="font-serif text-xl font-bold text-ink">
                        {project.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-ink/70">
                      {project.description}
                    </p>
                    <div className="mt-6">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                          statusStyles[project.status] || statusStyles.Ongoing
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
