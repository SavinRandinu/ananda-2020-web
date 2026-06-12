# ACOBA 2020 Group: Official Website

The official single-page website for the **ACOBA 2020 Group**, the Ananda College Old Boys&rsquo; Association batch of 2020.

Built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**, with a minimalistic maroon, gold, and white theme inspired by our school&rsquo;s colours.

## Sections

1. **Hero**: Welcome message and brand mark
2. **About**: Our story and stats
3. **Photo Gallery**: Memories with lightbox viewer
4. **Projects**: Initiatives we lead
5. **Magazine**: Batch publication showcase
6. **Batch Party Banner**: RSVP via Google Form
7. **Design Team**: Credits
8. **Footer / Contact Us**: Reach out and follow us

## Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) for scroll animations
- [Lucide Icons](https://lucide.dev/) for iconography
- [Vercel](https://vercel.com/) as deployment target
- _Phase 2:_ [Supabase](https://supabase.com/) for dynamic content

## Getting Started

### Prerequisites

- Node.js 18.17+ (recommend 20 LTS)
- npm / pnpm / yarn

### Install

```bash
npm install
```

### Run dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
npm run start
```

## Configuration

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Set `NEXT_PUBLIC_BATCH_PARTY_FORM_URL` to your Google Form URL.
3. (Phase 2) Add your Supabase keys.

## Project Structure

```
ananda-2020-web/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Single-page composition
│   └── globals.css         # Tailwind + custom styles
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Gallery.tsx
│   ├── Projects.tsx
│   ├── Magazine.tsx
│   ├── BatchParty.tsx
│   ├── Team.tsx
│   ├── Footer.tsx
│   └── Reveal.tsx          # Scroll-reveal helper
├── data/
│   ├── siteContent.ts
│   ├── gallery.ts
│   ├── projects.ts
│   └── team.ts
├── public/                 # Static assets
├── tailwind.config.ts
├── next.config.mjs
└── tsconfig.json
```

## Theme

| Token   | Value     | Use                |
| ------- | --------- | ------------------ |
| Maroon  | `#800000` | Primary brand      |
| Gold    | `#D4AF37` | Accent / highlight |
| Cream   | `#FFFDF7` | Soft section bg    |
| White   | `#FFFFFF` | Default surface    |
| Ink     | `#1A1A1A` | Body text          |

Fonts: **Playfair Display** (headings) and **Inter** (body).

## Updating Content

All static content lives in `data/`. Replace the placeholder photos in `data/gallery.ts` with your batch photos (recommended: upload to a CDN or `public/images/`). Update team members in `data/team.ts` and project info in `data/projects.ts`.

## Roadmap (Phase 2)

- Supabase-powered CMS for gallery, projects, and team
- Image upload via Supabase Storage
- Authenticated member directory
- Event RSVP system

## Credits

Built with care by the ACOBA 2020 Group design team.

> _අප්පමාදො අමතපදං_: Wisdom shines through service.
