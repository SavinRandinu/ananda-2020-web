import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { siteContent } from "@/data/siteContent";
import Crest from "./Crest";

export default function Footer() {
  const { contact, school } = siteContent;
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="relative bg-maroon-gradient text-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #FFD700 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="container-narrow relative py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <Crest
                size={48}
                className="border-2 border-gold/50 bg-white/5 text-gold backdrop-blur"
                ringClassName="bg-white/5 text-gold border-2 border-gold/50 backdrop-blur"
                fallbackTextClassName="text-xl"
              />
              <div className="leading-tight">
                <div className="font-serif text-xl font-bold text-white">
                  {school.name}
                </div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
                  {school.batch}
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70">
              The ACOBA 2020 Group, the Ananda College Old Boys&rsquo;
              Association batch of 2020. Keeping our brotherhood alive, one
              project, one reunion, and one shared memory at a time.
            </p>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
              Contact Us
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="group flex items-start gap-3 text-white/85 transition-colors hover:text-gold"
                >
                  <Mail
                    size={18}
                    className="mt-0.5 flex-shrink-0 text-gold/80"
                  />
                  <span className="break-all">{contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                  className="flex items-start gap-3 text-white/85 transition-colors hover:text-gold"
                >
                  <Phone
                    size={18}
                    className="mt-0.5 flex-shrink-0 text-gold/80"
                  />
                  <span>{contact.phone}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/85">
                <MapPin
                  size={18}
                  className="mt-0.5 flex-shrink-0 text-gold/80"
                />
                <span>{contact.address}</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
              Follow Us
            </h3>
            <div className="mt-5 flex gap-3">
              <a
                href={contact.socials.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-all duration-300 hover:border-gold/50 hover:bg-gold/10 hover:text-gold"
              >
                <Facebook size={16} />
              </a>
              <a
                href={contact.socials.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-all duration-300 hover:border-gold/50 hover:bg-gold/10 hover:text-gold"
              >
                <Instagram size={16} />
              </a>
              <a
                href={contact.socials.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp Group"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-all duration-300 hover:border-gold/50 hover:bg-gold/10 hover:text-gold"
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row">
          <p>
            &copy; {year} {school.batch}, {school.name}. All rights reserved.
          </p>
          <p className="font-serif italic text-gold/80">
            {school.motto}
          </p>
        </div>
      </div>
    </footer>
  );
}
