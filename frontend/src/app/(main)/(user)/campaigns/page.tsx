"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  Users,
  ChevronRight,
  ShieldCheck,
  SlidersHorizontal,
  ArrowRight,
  TrendingUp,
  Heart,
} from "lucide-react";
import { CampaignCard } from "@/src/components/campaign-card";

const campaigns = [
  {
    id: "1",
    title: "Koshi Flood Relief 2024 — Immediate Aid for 500+ Families",
    desc: "Immediate assistance for families who lost everything. Providing shelter, food, and essentials for over 500 families.",
    img: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=85&auto=format&fit=crop",
    raised: 362000,
    goal: 500000,
    donors: 2234,
    cat: "Emergency",
    catClass: "emergency",
    urgent: true,
    location: "Eastern Nepal",
    daysLeft: 8,
  },
  {
    id: "2",
    title: "Help Sunita Beat Cancer",
    desc: "A 32-year-old mother needs treatment at Bir Hospital. Help her fight stage 3 breast cancer.",
    img: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&q=80&auto=format&fit=crop",
    raised: 145000,
    goal: 275000,
    donors: 892,
    cat: "Medical",
    catClass: "medical",
    urgent: true,
    location: "Kathmandu",
    daysLeft: 14,
  },
  {
    id: "3",
    title: "School for Dolakha Children",
    desc: "200+ kids walk 4 hours daily. Help build a school in this remote mountain village.",
    img: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&q=80&auto=format&fit=crop",
    raised: 128000,
    goal: 250000,
    donors: 345,
    cat: "Education",
    catClass: "education",
    location: "Dolakha",
    daysLeft: 32,
  },
  {
    id: "4",
    title: "Janakpur Food Bank Initiative",
    desc: "Feeding 500+ families facing food insecurity in Janakpur through a sustainable food bank.",
    img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80&auto=format&fit=crop",
    raised: 88500,
    goal: 125000,
    donors: 412,
    cat: "Charity",
    catClass: "charity",
    location: "Janakpur",
    daysLeft: 21,
  },
  {
    id: "5",
    title: "Music Therapy for Special Needs Kids",
    desc: "Helping children with autism find their voice through the healing power of music therapy.",
    img: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&q=80&auto=format&fit=crop",
    raised: 38900,
    goal: 80000,
    donors: 156,
    cat: "Education",
    catClass: "education",
    location: "Pokhara",
    daysLeft: 45,
  },
  {
    id: "6",
    title: "Kathmandu Animal Rescue Shelter",
    desc: "Renovating facilities to provide better care and medical attention for 300+ rescued animals.",
    img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80&auto=format&fit=crop",
    raised: 65000,
    goal: 150000,
    donors: 267,
    cat: "Animals",
    catClass: "animals",
    location: "Kathmandu",
    daysLeft: 60,
  },
  {
    id: "7",
    title: "Rebuild Homes in Jajarkot Earthquake Zone",
    desc: "Over 200 families are still without permanent shelter after the devastating earthquake.",
    img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80&auto=format&fit=crop",
    raised: 290000,
    goal: 600000,
    donors: 1540,
    cat: "Emergency",
    catClass: "emergency",
    urgent: true,
    location: "Jajarkot",
    daysLeft: 5,
  },
  {
    id: "8",
    title: "Clean Water for Humla Villages",
    desc: "Installing water purification systems to bring clean drinking water to 12 remote villages.",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop",
    raised: 56000,
    goal: 120000,
    donors: 198,
    cat: "Charity",
    catClass: "charity",
    location: "Humla",
    daysLeft: 28,
  },
  {
    id: "9",
    title: "Dialysis Machine for Nepalgunj Hospital",
    desc: "The only government hospital in Banke district needs 2 dialysis machines for kidney patients.",
    img: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&q=80&auto=format&fit=crop",
    raised: 175000,
    goal: 220000,
    donors: 634,
    cat: "Medical",
    catClass: "medical",
    location: "Nepalgunj",
    daysLeft: 10,
  },
];

const categories = [
  "All",
  "Emergency",
  "Medical",
  "Education",
  "Charity",
  "Animals",
];
const sortOptions = [
  "Most Recent",
  "Most Funded",
  "Urgent First",
  "Ending Soon",
];

export default function CampaignsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSort, setActiveSort] = useState("Most Recent");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = campaigns.filter((c) => {
    const matchCat = activeCategory === "All" || c.cat === activeCategory;
    const matchSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div
      className="bg-cream min-h-screen"
      style={{ fontFamily: "var(--font-body)" }}
    >
      {/* ── PAGE HERO ── */}
      <section className="bg-white border-b border-setu-100 py-14 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
            {/* Left: text + search */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-setu-600 mb-4">
                <div className="w-6 h-[2px] bg-setu-500 rounded" />
                Browse All Causes
              </div>
              <h1
                className="text-[clamp(34px,4vw,54px)] font-bold text-setu-950 leading-tight tracking-[-1px] mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Find a Campaign
                <br />
                <em className="italic text-setu-600">Worth Fighting For</em>
              </h1>
              <p className="text-[16px] text-setu-800/55 leading-[1.75] mb-8 max-w-lg">
                From disaster relief to education, browse verified campaigns
                making a real difference across Nepal.
              </p>

              {/* Search bar */}
              <div className="relative max-w-xl mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-setu-400" />
                <input
                  type="text"
                  placeholder="Search campaigns, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-setu-50 border border-setu-200 rounded-full text-[14px] text-setu-900 placeholder:text-setu-400 focus:outline-none focus:border-setu-500 focus:ring-2 focus:ring-setu-500/20 transition-all"
                />
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-3 flex-wrap">
                <Link
                  href="/campaigns/create"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-setu-700 hover:bg-setu-600 text-white text-[14px] font-bold rounded-full no-underline shadow-[0_4px_14px_rgba(21,104,57,0.35)] hover:shadow-[0_6px_22px_rgba(21,104,57,0.4)] hover:-translate-y-px transition-all duration-200"
                >
                  Start a Campaign <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-setu-200 text-setu-700 text-[14px] font-semibold rounded-full no-underline hover:bg-setu-50 hover:border-setu-400 transition-all duration-200"
                >
                  How It Works
                </Link>
              </div>
            </div>

            {/* Right: Nepal campaign image collage */}
            <div className="hidden lg:block flex-shrink-0 w-[440px]">
              <div className="relative h-[320px]">
                {/* Main large image */}
                <div className="absolute left-0 top-0 w-[260px] h-[280px] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(21,104,57,0.18)] border-4 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=85&auto=format&fit=crop"
                    alt="Flood relief Nepal"
                    className="w-full h-full object-cover"
                  />
                  {/* Urgent badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-red-500 text-white text-[10px] font-bold rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    Urgent
                  </div>
                  {/* Progress overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-3">
                    <p className="text-white text-[11px] font-bold truncate mb-1.5">
                      Koshi Flood Relief 2024
                    </p>
                    <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                      <div className="h-full w-[72%] bg-setu-400 rounded-full" />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-white/80 text-[10px]">
                        NPR 3.6L raised
                      </span>
                      <span className="text-setu-300 text-[10px] font-bold">
                        72%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Top-right smaller image */}
                <div className="absolute right-0 top-0 w-[165px] h-[150px] rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(21,104,57,0.15)] border-4 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&q=80&auto=format&fit=crop"
                    alt="Education Nepal"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-2.5 py-2">
                    <p className="text-white text-[10px] font-bold truncate">
                      School for Dolakha
                    </p>
                  </div>
                </div>

                {/* Bottom-right smaller image */}
                <div className="absolute right-0 bottom-0 w-[165px] h-[150px] rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(21,104,57,0.15)] border-4 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&q=80&auto=format&fit=crop"
                    alt="Medical Nepal"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-2.5 py-2">
                    <p className="text-white text-[10px] font-bold truncate">
                      Help Sunita Beat Cancer
                    </p>
                  </div>
                </div>

                {/* Floating donor count pill */}
                <div className="absolute bottom-[148px] right-[148px] translate-x-1/2 translate-y-1/2 z-10 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.12)] border border-setu-100 px-3 py-2 flex items-center gap-2">
                  <div className="flex -space-x-1.5">
                    {[11, 12, 13].map((i) => (
                      <img
                        key={i}
                        src={`https://i.pravatar.cc/24?img=${i}`}
                        className="w-6 h-6 rounded-full border-2 border-white object-cover"
                        alt=""
                      />
                    ))}
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-setu-950 leading-none">
                      18,400+
                    </p>
                    <p className="text-[9px] text-gray-400 leading-none mt-0.5">
                      donors
                    </p>
                  </div>
                </div>

                {/* Verified badge */}
                <div className="absolute top-[72px] left-[248px] z-10 bg-setu-700 text-white rounded-xl shadow-[0_4px_16px_rgba(21,104,57,0.3)] px-3 py-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                  <p className="text-[11px] font-bold leading-none">Verified</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-setu-100">
            {[
              { icon: TrendingUp, n: "1,200+", l: "Active Campaigns" },
              { icon: Users, n: "18,400+", l: "Total Donors" },
              { icon: Heart, n: "NPR 2.4Cr+", l: "Total Raised" },
              { icon: MapPin, n: "77 Districts", l: "Across Nepal" },
            ].map(({ icon: Icon, n, l }) => (
              <div key={l} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-setu-50 border border-setu-100 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-setu-600" />
                </div>
                <div>
                  <p
                    className="text-[16px] font-bold text-setu-900 leading-none"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {n}
                  </p>
                  <p className="text-[11px] text-setu-600/60 font-medium mt-0.5">
                    {l}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILTERS + GRID ── */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={[
                    "px-4 py-2 rounded-full text-[13px] font-semibold border transition-all duration-150",
                    activeCategory === cat
                      ? "bg-setu-700 text-white border-setu-700 shadow-[0_2px_8px_rgba(21,104,57,0.25)]"
                      : "bg-white text-setu-700 border-setu-200 hover:border-setu-400 hover:bg-setu-50",
                  ].join(" ")}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-setu-500 flex-shrink-0" />
              <select
                value={activeSort}
                onChange={(e) => setActiveSort(e.target.value)}
                className="text-[13px] font-semibold text-setu-700 bg-white border border-setu-200 rounded-full px-4 py-2 focus:outline-none focus:border-setu-500 cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Result count */}
          <p className="text-[13px] text-setu-600/60 font-medium mb-6">
            Showing <strong className="text-setu-800">{filtered.length}</strong>{" "}
            campaigns
            {activeCategory !== "All" && (
              <>
                {" "}
                in <span className="text-setu-700">{activeCategory}</span>
              </>
            )}
          </p>

          {/* Campaign grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c) => (
              <CampaignCard key={c.id} c={c} />
            ))}
          </div>

          {/* Load more */}
          <div className="flex justify-center mt-12">
            <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-white hover:bg-setu-50 border border-setu-200 hover:border-setu-400 text-setu-700 text-[14px] font-semibold rounded-full transition-all duration-200">
              Load More Campaigns <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── START A CAMPAIGN CTA ── */}
      <section className="py-16 bg-setu-900 mx-4 sm:mx-6 lg:mx-8 rounded-[28px] mb-16 overflow-hidden relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(34,160,91,0.15) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-8 sm:px-14 relative flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-setu-400 mb-3">
              Have a cause?
            </p>
            <h2
              className="text-[clamp(26px,3vw,40px)] font-bold text-white leading-tight tracking-[-0.5px]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Start your own
              <br />
              <em className="italic text-setu-300">fundraiser today</em>
            </h2>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-setu-800 text-[14px] font-bold rounded-full no-underline hover:bg-setu-50 transition-colors shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
            >
              Start a Campaign <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/25 text-white text-[14px] font-semibold rounded-full no-underline hover:bg-white/10 transition-colors"
            >
              How It Works
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
