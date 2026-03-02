import type { Metadata } from "next";
import "@/src/app/globals.css";

export const metadata: Metadata = {
  title: "Setu – Fund Hope. Change Nepal.",
  description:
    "Setu connects donors, charities, and communities across Nepal. Donate money or goods, create campaigns, and track real-time impact.",
  keywords: ["donation", "charity", "Nepal", "crowdfunding", "disaster relief"],
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body className="antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
}
