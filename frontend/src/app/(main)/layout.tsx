import type { Metadata } from "next";
import "@/src/app/globals.css";
import { Navbar } from "@/src/components/navbar";
import { Footer } from "@/src/components/footer";

export const metadata: Metadata = {
  title: "Setu – Fund Hope. Change Nepal.",
  description: "Setu connects donors, charities, and communities across Nepal.",
  keywords: ["donation", "charity", "Nepal", "crowdfunding", "disaster relief"],
  icons: {
    icon: "/image.png",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
