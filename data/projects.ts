import type { LucideIcon } from "lucide-react";
import { BookOpen, HandHeart, GraduationCap, Trees, Users } from "lucide-react";

export type Project = {
  id: string;
  title: string;
  description: string;
  status: "Ongoing" | "Completed" | "Upcoming";
  icon: LucideIcon;
};

export const projects: Project[] = [
  {
    id: "p1",
    title: "Scholarship Fund",
    description:
      "Supporting underprivileged Anandian students with annual scholarships covering tuition, books, and uniforms.",
    status: "Ongoing",
    icon: GraduationCap,
  },
  {
    id: "p2",
    title: "Mentorship Programme",
    description:
      "Pairing senior batch members with current Ananda students for career guidance and academic mentorship.",
    status: "Ongoing",
    icon: Users,
  },
  {
    id: "p3",
    title: "Library Donation Drive",
    description:
      "Restocking the school library with modern reference books, fiction, and digital learning resources.",
    status: "Completed",
    icon: BookOpen,
  },
  {
    id: "p4",
    title: "Tree Planting Initiative",
    description:
      "Greening the school premises with native trees as part of our environmental sustainability commitment.",
    status: "Completed",
    icon: Trees,
  },
  {
    id: "p5",
    title: "Annual Charity Drive",
    description:
      "Organising fundraisers and outreach programmes to give back to the wider Colombo community.",
    status: "Ongoing",
    icon: HandHeart,
  },
];
