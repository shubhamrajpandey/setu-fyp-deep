"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, Heart, ChevronDown, LogIn, Handshake } from "lucide-react";

const navLinks = [
  { label: "Campaigns", href: "/campaigns" },
  { label: "Teams", href: "/teams" },
  {
    label: "Donate",
    href: "#",
    children: [
      {
        label: "Money Donation",
        sub: "Send funds directly",
        href: "/donations",
      },
      {
        label: "Goods Donation",
        sub: "Rice, clothes, medicine",
        href: "/donations/goods",
      },
      {
        label: "Emergency Relief",
        sub: "Disaster response",
        href: "/campaigns?category=emergency",
      },
    ],
  },
  { label: "Hall of Fame", href: "/hall-of-fame" },
  { label: "How It Works", href: "/how-it-works" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const openDD = (label: string) => {
    if (timer.current) clearTimeout(timer.current);
    setActiveDropdown(label);
  };
  const closeDD = () => {
    timer.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  return (
    <>
      <div className="h-[68px]" />

      <header
        className={[
          "fixed top-0 left-0 right-0 z-[1000] h-[68px]",
          "transition-all duration-300",
          "backdrop-blur-xl",
          scrolled
            ? "bg-white/95 border-b border-setu-700/10 shadow-[0_2px_16px_rgba(21,104,57,0.08)]"
            : "bg-white/70 border-b border-transparent",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 no-underline flex-shrink-0 group"
          >
            <div
              className={[
                "relative w-9 h-9 rounded-[10px] flex items-center justify-center",
                "bg-setu-100 group-hover:bg-setu-200",
                "shadow-[0_4px_12px_rgba(21,104,57,0.15)]",
                "transition-all duration-200",
              ].join(" ")}
            >
              <Heart
                className="w-8 h-8 text-setu-700"
                strokeWidth={1.6}
                fill="none"
              />

              <Handshake
                className="absolute w-5 h-5 text-setu-700"
                strokeWidth={1.6}
              />
            </div>

            <span
              className="text-[1.5rem] font-bold text-setu-950 leading-none tracking-[-0.3px]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Setu
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => openDD(link.label)}
                  onMouseLeave={closeDD}
                >
                  <button
                    className={[
                      "flex items-center gap-1 px-3.5 py-2 rounded-lg",
                      "text-sm font-medium text-setu-800",
                      "hover:bg-setu-50 hover:text-setu-700",
                      "bg-transparent border-none cursor-pointer",
                      "transition-colors duration-150",
                    ].join(" ")}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {link.label}
                    <ChevronDown
                      className={[
                        "w-3.5 h-3.5 transition-transform duration-200",
                        activeDropdown === link.label
                          ? "rotate-180"
                          : "rotate-0",
                      ].join(" ")}
                    />
                  </button>

                  {activeDropdown === link.label && (
                    <div
                      onMouseEnter={() => openDD(link.label)}
                      onMouseLeave={closeDD}
                      className={[
                        "absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2",
                        "min-w-[230px] z-[1001]",
                        "bg-white/98 backdrop-blur-2xl",
                        "border border-setu-700/10",
                        "rounded-2xl p-2",
                        "shadow-[0_20px_48px_rgba(21,104,57,0.14),0_4px_16px_rgba(0,0,0,0.06)]",
                      ].join(" ")}
                    >
                      <div
                        className={[
                          "absolute -top-[6px] left-1/2 -translate-x-1/2 rotate-45",
                          "w-3 h-3 bg-white border-l border-t border-setu-700/10",
                        ].join(" ")}
                      />

                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setActiveDropdown(null)}
                          className="block px-3 py-2.5 rounded-xl no-underline hover:bg-setu-50 transition-colors duration-150"
                        >
                          <span className="block text-sm font-semibold text-setu-950">
                            {child.label}
                          </span>
                          <span className="block text-xs text-setu-700/60 mt-0.5">
                            {child.sub}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={[
                    "px-3.5 py-2 rounded-lg",
                    "text-sm font-medium text-setu-800",
                    "hover:bg-setu-50 hover:text-setu-700",
                    "no-underline whitespace-nowrap",
                    "transition-colors duration-150",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <Link
              href="/login"
              className={[
                "flex items-center gap-1.5 px-3.5 py-2 rounded-lg",
                "text-sm font-medium text-setu-700",
                "hover:bg-setu-50",
                "no-underline transition-colors duration-150",
              ].join(" ")}
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </Link>

            <Link
              href="/register"
              className={[
                "px-5 py-2.5 rounded-full",
                "bg-setu-700 hover:bg-setu-600",
                "text-white text-sm font-bold",
                "no-underline whitespace-nowrap",
                "shadow-[0_4px_14px_rgba(21,104,57,0.35)]",
                "hover:shadow-[0_6px_22px_rgba(21,104,57,0.4)]",
                "hover:-translate-y-px",
                "transition-all duration-200",
              ].join(" ")}
            >
              Start a Campaign
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className={[
              "md:hidden flex items-center justify-center",
              "w-10 h-10 rounded-xl",
              "bg-transparent border border-setu-700/20",
              "text-setu-700 hover:bg-setu-50",
              "cursor-pointer transition-colors flex-shrink-0",
            ].join(" ")}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {mobileOpen && (
          <div
            className={[
              "md:hidden",
              "absolute top-[68px] left-0 right-0",
              "bg-white/98 backdrop-blur-2xl",
              "border-b border-setu-700/10",
              "shadow-[0_16px_40px_rgba(21,104,57,0.1)]",
              "px-4 pt-3 pb-5",
              "z-[999]",
              "max-h-[calc(100vh-68px)] overflow-y-auto",
            ].join(" ")}
          >
            <div className="flex flex-col gap-0.5 mb-3">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <p className="px-4 pt-3 pb-1 text-[11px] font-bold uppercase tracking-widest text-setu-500">
                      {link.label}
                    </p>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className={[
                          "flex items-center gap-3 px-4 py-2.5",
                          "text-[14px] font-medium text-setu-800",
                          "hover:bg-setu-50 hover:text-setu-700",
                          "rounded-xl no-underline",
                          "transition-colors duration-150",
                        ].join(" ")}
                      >
                        <span className="text-base">
                          {child.label.split(" ")[0]}
                        </span>
                        <span>{child.label.split(" ").slice(1).join(" ")}</span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={[
                      "flex items-center px-4 py-3",
                      "text-[15px] font-medium text-setu-800",
                      "hover:bg-setu-50 hover:text-setu-700",
                      "rounded-xl no-underline",
                      "transition-colors duration-150",
                    ].join(" ")}
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </div>

            <div className="flex flex-col gap-2 pt-3 border-t border-setu-700/10">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className={[
                  "block text-center py-3",
                  "text-sm font-semibold text-setu-700",
                  "border border-setu-700/25 rounded-full",
                  "no-underline hover:bg-setu-50",
                  "transition-colors duration-150",
                ].join(" ")}
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className={[
                  "block text-center py-3",
                  "text-sm font-bold text-white",
                  "bg-setu-700 hover:bg-setu-600",
                  "rounded-full no-underline",
                  "shadow-[0_4px_14px_rgba(21,104,57,0.3)]",
                  "transition-all duration-200",
                ].join(" ")}
              >
                Start a Campaign
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
