import { ArrowRight, Calendar, MapPin, Sparkles } from "lucide-react";
import { siteContent } from "@/data/siteContent";
import Reveal from "./Reveal";

export default function BatchParty() {
  const { batchParty } = siteContent;

  return (
    <section id="batch-party" className="section-padding bg-white">
      <div className="container-narrow">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl bg-maroon-gradient p-8 shadow-elegant-lg md:p-14 lg:p-20">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, #FFD700 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -top-32 -right-32 -z-10 h-96 w-96 rounded-full bg-gold/20 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-32 -left-32 -z-10 h-96 w-96 rounded-full bg-gold/10 blur-3xl"
            />

            <div className="grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
                  <Sparkles size={12} />
                  {batchParty.eyebrow}
                </div>
                <h2 className="mt-5 font-serif text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                  {batchParty.title}
                </h2>
                <p className="mt-4 text-lg italic text-gold/90 md:text-xl">
                  {batchParty.subtitle}
                </p>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80">
                  {batchParty.description}
                </p>

                <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
                    <Calendar size={18} className="text-gold" />
                    <div>
                      <dt className="text-[10px] font-semibold uppercase tracking-wider text-gold/80">
                        Date
                      </dt>
                      <dd className="text-sm font-medium text-white">
                        {batchParty.date}
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
                    <MapPin size={18} className="text-gold" />
                    <div>
                      <dt className="text-[10px] font-semibold uppercase tracking-wider text-gold/80">
                        Venue
                      </dt>
                      <dd className="text-sm font-medium text-white">
                        {batchParty.venue}
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>

              <div className="flex flex-col items-start gap-3 lg:col-span-4 lg:items-end">
                <a
                  href={batchParty.formUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold w-full justify-center text-base lg:w-auto"
                >
                  Register Now
                  <ArrowRight size={18} />
                </a>
                <p className="text-xs text-white/60 lg:text-right">
                  Opens the official Google Form
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
