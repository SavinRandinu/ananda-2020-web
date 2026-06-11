import { Heart } from "lucide-react";
import { designTeam } from "@/data/team";
import Reveal from "./Reveal";

export default function Team() {
  return (
    <section id="team" className="section-padding bg-cream/40">
      <div className="container-narrow">
        <Reveal className="text-center">
          <span className="eyebrow">Credits</span>
          <h2 className="mt-3 heading-serif">Website Design Team</h2>
          <div className="gold-divider mt-5" />
          <p className="mx-auto mt-6 flex max-w-2xl items-center justify-center gap-2 text-ink/70">
            Crafted with <Heart size={14} className="text-maroon" /> by these
            old boys
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {designTeam.map((member, idx) => (
            <Reveal key={member.id} delay={(idx % 4) * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-2xl bg-white p-7 text-center shadow-elegant transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant-lg">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 -top-8 mx-auto h-16 w-16 rounded-full bg-gold/20 blur-2xl"
                />
                <div className="relative mx-auto grid h-20 w-20 place-items-center rounded-full bg-maroon-gradient text-gold shadow-elegant ring-2 ring-gold/30 ring-offset-2 ring-offset-white transition-transform duration-300 group-hover:scale-105">
                  <span className="font-serif text-xl font-bold">
                    {member.initials}
                  </span>
                </div>
                <h3 className="mt-5 font-serif text-lg font-bold text-ink">
                  {member.name}
                </h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.15em] text-gold-700">
                  {member.role}
                </p>
                {member.socialUrl && (
                  <a
                    href={member.socialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-block text-xs font-medium text-maroon underline-offset-4 hover:underline"
                  >
                    View profile
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
