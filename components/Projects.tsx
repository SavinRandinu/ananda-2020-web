import { projects } from "@/data/projects";
import Reveal from "./Reveal";

const statusStyles: Record<string, string> = {
  Ongoing: "bg-gold-100 text-gold-800",
  Completed: "bg-maroon-50 text-maroon-700",
  Upcoming: "bg-cream text-ink/70 border border-maroon-100",
};

export default function Projects() {
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
          {projects.map((project, idx) => {
            const Icon = project.icon;
            return (
              <Reveal key={project.id} delay={(idx % 3) * 0.08}>
                <article className="group relative h-full overflow-hidden rounded-2xl border border-maroon-100/60 bg-white p-7 shadow-elegant transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-elegant-lg">
                  <div
                    aria-hidden
                    className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gold-50 transition-transform duration-500 group-hover:scale-125"
                  />
                  <div className="relative">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-maroon text-gold transition-transform duration-300 group-hover:scale-110">
                      <Icon size={22} />
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
                          statusStyles[project.status]
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
