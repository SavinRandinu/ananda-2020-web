export const siteContent = {
  school: {
    name: "Ananda College",
    batch: "ACOBA 2020 Group",
    longName: "Ananda College Old Boys' Association",
    motto: "අප්පමාදො අමතපදං",
    mottoTranslation: "Wisdom shines through service",
  },
  hero: {
    eyebrow: "Ananda College Old Boys' Association",
    title: "ACOBA 2020",
    subtitle: "Ananda College, Colombo",
    welcome:
      "A brotherhood forged in the halls of our beloved alma mater, united by memories, driven by purpose, and bound by the values that shaped us.",
    primaryCta: {
      label: "Join the Batch Party",
      href: "#batch-party",
    },
    secondaryCta: {
      label: "Explore Our Story",
      href: "#about",
    },
  },
  about: {
    eyebrow: "About Us",
    title: "Brothers in Maroon and Gold",
    paragraphs: [
      "We are the ACOBA 2020 Group, the Ananda College Old Boys' Association batch of 2020. A community bound by the timeless values of our alma mater, forged through every classroom, every cricket match, and every assembly under the watchful eye of the school crest. The friendships we built have outlasted graduation and continue to shape who we are today.",
      "Our mission is to keep this brotherhood alive, supporting one another, giving back to our school, and uplifting the next generation of Anandians. From philanthropic projects and mentorship programs to reunions and celebrations, we honour our roots while building a legacy of our own.",
    ],
    stats: [
      { value: "200+", label: "Members" },
      { value: "5+", label: "Active Projects" },
      { value: "2020", label: "Batch Year" },
    ],
  },
  contact: {
    email: "acoba2020@gmail.com",
    phone: "+94 77 123 4567",
    address: "Ananda College, Maradana, Colombo 10, Sri Lanka",
    socials: {
      facebook: "https://facebook.com/acoba2020",
      instagram: "https://instagram.com/acoba2020",
      whatsapp: "https://chat.whatsapp.com/your-group-link",
    },
  },
  batchParty: {
    eyebrow: "Save the Date",
    title: "The ACOBA 2020 Reunion Party",
    subtitle: "An evening of brotherhood, music, and memories",
    description:
      "Join us as we come together once more to celebrate the bonds that started in Maroon and Gold. Reserve your spot today.",
    date: "Coming Soon",
    venue: "Venue to be announced",
    formUrl:
      process.env.NEXT_PUBLIC_BATCH_PARTY_FORM_URL ||
      "https://forms.gle/your-form-id-here",
  },
  magazine: {
    eyebrow: "Our Story in Print",
    title: "The Batch Magazine",
    description:
      "A curated collection of stories, photographs, and reflections from our years at Ananda, and the journey since.",
    coverImage:
      "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?auto=format&fit=crop&w=800&q=80",
    downloadUrl: "#",
    readUrl: "#",
  },
};
