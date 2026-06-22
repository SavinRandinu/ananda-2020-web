import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { AuthProvider } from "@/components/AuthProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ACOBA 2020 Group | Ananda College Old Boys' Association",
  description:
    "The official home of the ACOBA 2020 Group, the Ananda College Old Boys' Association batch of 2020. Celebrating brotherhood, achievements, and shared memories.",
  keywords: [
    "ACOBA",
    "ACOBA 2020",
    "Ananda College",
    "Ananda College Old Boys' Association",
    "Old Boys",
    "Alumni",
    "Sri Lanka",
  ],
  openGraph: {
    title: "ACOBA 2020 Group | Ananda College Old Boys' Association",
    description:
      "Celebrating the brotherhood of the ACOBA 2020 Group, Ananda College Old Boys' Association batch of 2020.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
