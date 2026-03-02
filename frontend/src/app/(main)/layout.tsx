import type { Metadata } from "next";
import "@/src/app/globals.css";
import { Navbar } from "@/src/components/navbar";
import { Footer } from "@/src/components/footer";

export const metadata: Metadata = {
  title: "Setu – Fund Hope. Change Nepal.",
  description:
    "Setu connects donors, charities, and communities across Nepal. Donate money or goods, create campaigns, and track real-time impact.",
  keywords: ["donation", "charity", "Nepal", "crowdfunding", "disaster relief"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/*
          Fonts are loaded via @import in globals.css (Cormorant Garamond + Plus Jakarta Sans).
          No need for next/font here since we're using Google Fonts import directly.
        */}
      </head>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
