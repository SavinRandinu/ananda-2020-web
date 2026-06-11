import { siteContent } from "@/data/siteContent";
import Reveal from "./Reveal";

export default function About() {
  const { about } = siteContent;

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-narrow grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <span className="eyebrow">{about.eyebrow}</span>
          <h2 className="mt-3 heading-serif">{about.title}</h2>
          <div className="mt-5 h-[3px] w-16 bg-gold" />
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="space-y-5 text-base leading-relaxed text-ink/80 md:text-lg">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-maroon-100 pt-8">
            {about.stats.map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <dt className="font-serif text-3xl font-bold text-maroon md:text-4xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-ink/60">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
