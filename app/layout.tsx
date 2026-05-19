import type { Metadata } from "next";
import { Cinzel, EB_Garamond, Josefin_Sans } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const josefinSans = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

export const metadata: Metadata = {
  title: "L'Eneide di Virgilio — Storicizzazione e Ideologia Augustea",
  description:
    "La storicizzazione nei libri I–IV dell'Eneide: mito troiano, programma augusteo e doppia voce virgiliana.",
  keywords: [
    "Eneide",
    "Virgilio",
    "Augusto",
    "storicizzazione",
    "Harvard School",
    "Didone",
    "letteratura latina",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${cinzel.variable} ${ebGaramond.variable} ${josefinSans.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
