import Link from "next/link";
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";

const footerLinks = {
  Platform: [
    { label: "How It Works", href: "/how-it-works" },
    { label: "Browse Campaigns", href: "/campaigns" },
    { label: "Start a Campaign", href: "/register" },
    { label: "Emergency Relief", href: "/campaigns?category=emergency" },
    { label: "Hall of Fame", href: "/hall-of-fame" },
  ],
  Donate: [
    { label: "Money Donation", href: "/donations" },
    { label: "Goods Donation", href: "/donations/goods" },
    { label: "One-Time Gift", href: "/donations?type=one-time" },
    { label: "Monthly Giving", href: "/donations?type=monthly" },
    { label: "Team Campaigns", href: "/teams" },
  ],
  Company: [
    { label: "About Setu", href: "/about" },
    { label: "Our Impact", href: "/impact" },
    { label: "Blog", href: "/blog" },
    { label: "Press", href: "/press" },
    { label: "Careers", href: "/careers" },
  ],
  Support: [
    { label: "Help Center", href: "/help" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Report an Issue", href: "/report" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-setu-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 w-fit">
              <div className="w-8 h-8 rounded-lg bg-setu-600 flex items-center justify-center">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
              <span
                className="text-xl font-bold text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Setu
              </span>
            </Link>
            <p className="mt-4 text-sm text-setu-300 leading-relaxed">
              Bridging donors, charities, and communities across Nepal for a
              better tomorrow.
            </p>
            <div className="mt-5 space-y-2.5">
              <div className="flex items-center gap-2 text-xs text-setu-400">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-setu-400">
                <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                <span>hello@setu.np</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-setu-400">
                <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                <span>+977 01-000-0000</span>
              </div>
            </div>
            <div className="flex gap-2.5 mt-6">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-setu-400 hover:border-setu-500 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-setu-400 mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-setu-300 hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-setu-500">
            © {new Date().getFullYear()} Setu. Built with{" "}
            <Heart className="w-3 h-3 inline text-setu-400" /> for Nepal.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-setu-500">
            <span className="w-2 h-2 rounded-full bg-setu-400 inline-block animate-pulse" />
            All donations are encrypted and secure
          </div>
        </div>
      </div>
    </footer>
  );
}
