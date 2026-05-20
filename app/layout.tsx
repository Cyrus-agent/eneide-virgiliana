import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="it">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,600&family=Josefin+Sans:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
