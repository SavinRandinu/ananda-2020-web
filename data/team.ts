export type TeamMember = {
  id: string;
  name: string;
  role: string;
  initials: string;
  socialUrl?: string;
};

export const designTeam: TeamMember[] = [
  {
    id: "t1",
    name: "Savin Madapatha",
    role: "Project Contributor",
    initials: "SM",
  },
  {
    id: "t2",
    name: "Team Member 2",
    role: "Project Contributor",
    initials: "TM",
  },
  {
    id: "t3",
    name: "Team Member 3",
    role: "Project Contributor",
    initials: "TM",
  },
  {
    id: "t4",
    name: "Team Member 4",
    role: "Project Contributor",
    initials: "TM",
  },
];
