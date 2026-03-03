"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Plus,
  Search,
  Trophy,
  Heart,
  ArrowRight,
  MapPin,
  ChevronRight,
  TrendingUp,
  Star,
  Shield,
  UserPlus,
  Globe,
  Target,
} from "lucide-react";

const teams = [
  {
    id: "1",
    name: "Kathmandu Cares Collective",
    desc: "A group of 24 young professionals raising funds for urban poverty relief and slum rehabilitation.",
    members: 24,
    raised: 480000,
    goal: 600000,
    campaigns: 5,
    avatar:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80&auto=format&fit=crop",
    location: "Kathmandu",
    badge: "Top Team",
    rank: 1,
  },
  {
    id: "2",
    name: "Pokhara Relief Network",
    desc: "Mountain rescue professionals and volunteers coordinating disaster response across Gandaki.",
    members: 18,
    raised: 320000,
    goal: 500000,
    campaigns: 4,
    avatar:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80&auto=format&fit=crop",
    location: "Pokhara",
    badge: "Verified",
    rank: 2,
  },
  {
    id: "3",
    name: "Terai Health Warriors",
    desc: "Doctors and healthcare workers mobilizing medical support for underserved communities in the Terai.",
    members: 31,
    raised: 265000,
    goal: 400000,
    campaigns: 6,
    avatar:
      "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&q=80&auto=format&fit=crop",
    location: "Birgunj",
    badge: "Verified",
    rank: 3,
  },
  {
    id: "4",
    name: "Mountain School Initiative",
    desc: "Teachers and education advocates building schools and libraries in remote Himalayan communities.",
    members: 15,
    raised: 190000,
    goal: 350000,
    campaigns: 3,
    avatar:
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&q=80&auto=format&fit=crop",
    location: "Mustang",
    rank: 4,
  },
  {
    id: "5",
    name: "Nepal Animal Welfare Alliance",
    desc: "Vets and animal lovers rescuing, treating, and rehoming stray animals across Nepal.",
    members: 22,
    raised: 145000,
    goal: 250000,
    campaigns: 4,
    avatar:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80&auto=format&fit=crop",
    location: "Lalitpur",
    rank: 5,
  },
  {
    id: "6",
    name: "Flood Response Force",
    desc: "Emergency volunteers specializing in rapid response to flooding disasters in river delta regions.",
    members: 40,
    raised: 520000,
    goal: 800000,
    campaigns: 8,
    avatar:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&q=80&auto=format&fit=crop",
    location: "Koshi Zone",
    badge: "Top Team",
    rank: 6,
  },
];

const leaderboard = [
  {
    rank: 1,
    name: "Kathmandu Cares Collective",
    amt: "NPR 4,80,000",
    members: 24,
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=80&q=80&auto=format&fit=crop",
  },
  {
    rank: 2,
    name: "Flood Response Force",
    amt: "NPR 5,20,000",
    members: 40,
    img: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=80&q=80&auto=format&fit=crop",
  },
  {
    rank: 3,
    name: "Pokhara Relief Network",
    amt: "NPR 3,20,000",
    members: 18,
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=80&q=80&auto=format&fit=crop",
  },
];

function TeamCard({ t }: { t: (typeof teams)[0] }) {
  const pct = Math.min(Math.round((t.raised / t.goal) * 100), 100);
  return (
    <Link
      href={`/teams/${t.id}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-setu-100 shadow-[0_2px_12px_rgba(21,104,57,0.06)] hover:shadow-[0_20px_48px_rgba(21,104,57,0.14)] hover:-translate-y-1.5 hover:border-setu-200 transition-all duration-300"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={t.avatar}
          alt={t.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {t.badge && (
          <span
            className={`absolute top-3 left-3 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide ${t.badge === "Top Team" ? "bg-amber-400 text-amber-950" : "bg-setu-600 text-white"}`}
          >
            {t.badge === "Top Team" ? "🏆 " : "✓ "}
            {t.badge}
          </span>
        )}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white/90 text-[11px] font-medium px-2.5 py-1 rounded-full">
          <MapPin className="w-3 h-3" />
          {t.location}
        </div>
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white/90 text-[11px] font-medium px-2.5 py-1 rounded-full">
          <Users className="w-3 h-3" />
          {t.members} members
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3
            className="font-bold text-[15px] text-setu-950 leading-snug group-hover:text-setu-700 transition-colors"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.name}
          </h3>
          <span className="text-[12px] font-bold text-setu-600 bg-setu-50 px-2 py-0.5 rounded-lg flex-shrink-0">
            #{t.rank}
          </span>
        </div>
        <p className="text-[13px] text-gray-500 leading-relaxed mb-4 line-clamp-2">
          {t.desc}
        </p>
        <div className="h-1.5 bg-setu-100 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-gradient-to-r from-setu-700 to-setu-400 rounded-full"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex justify-between text-[13px] mb-4">
          <strong className="text-setu-800">
            NPR {t.raised.toLocaleString()}
          </strong>
          <strong className="text-setu-600">{pct}%</strong>
        </div>
        <div className="flex items-center justify-between pt-3.5 border-t border-setu-50">
          <span className="text-[12px] text-gray-500 font-medium">
            {t.campaigns} campaigns
          </span>
          <span className="flex items-center gap-1.5 px-4 py-2 bg-setu-700 group-hover:bg-setu-600 text-white text-[12px] font-bold rounded-full transition-colors">
            View Team <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function TeamsPage() {
  const [search, setSearch] = useState("");

  return (
    <div
      className="bg-cream min-h-screen"
      style={{ fontFamily: "var(--font-body)" }}
    >
      {/* ── HERO ── */}
      <section className="bg-white border-b border-setu-100 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-end">
            <div>
              <div className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-setu-600 mb-4">
                <div className="w-6 h-[2px] bg-setu-500 rounded" />
                Collective Impact
              </div>
              <h1
                className="text-[clamp(34px,4vw,54px)] font-bold text-setu-950 leading-tight tracking-[-1px] mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Stronger Together.
                <br />
                <em className="italic text-setu-600">Team Fundraising.</em>
              </h1>
              <p className="text-[16px] text-setu-800/55 leading-[1.75] max-w-lg mb-8">
                Join or create a team to multiply your impact. Coordinate
                campaigns, track collective progress, and celebrate shared
                milestones.
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link
                  href="/teams/create"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-setu-700 hover:bg-setu-600 text-white text-[14px] font-bold rounded-full no-underline shadow-[0_6px_20px_rgba(21,104,57,0.3)] hover:-translate-y-0.5 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Create a Team
                </Link>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-setu-400" />
                  <input
                    type="text"
                    placeholder="Search teams..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-11 pr-4 py-3.5 bg-setu-50 border border-setu-200 rounded-full text-[14px] text-setu-900 placeholder:text-setu-400 focus:outline-none focus:border-setu-500 focus:ring-2 focus:ring-setu-500/20 w-64 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Leaderboard mini */}
            <div className="bg-setu-950 rounded-3xl p-6 min-w-[280px]">
              <div className="flex items-center gap-2 mb-5">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span className="text-[12px] font-bold text-white/60 uppercase tracking-wide">
                  Top Teams
                </span>
              </div>
              {leaderboard.map((t, i) => (
                <div
                  key={t.rank}
                  className={`flex items-center gap-3 py-3 ${i < 2 ? "border-b border-white/[0.06]" : ""}`}
                >
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-black flex-shrink-0 ${i === 0 ? "bg-amber-400 text-amber-950" : i === 1 ? "bg-slate-400 text-white" : "bg-orange-600 text-white"}`}
                  >
                    {t.rank}
                  </span>
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-white/20 flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-bold text-white truncate">
                      {t.name}
                    </p>
                    <p className="text-[11px] text-setu-400 font-medium">
                      {t.amt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-setu-100">
            {[
              { icon: Users, n: "140+", l: "Active Teams" },
              { icon: Globe, n: "77", l: "Districts Covered" },
              { icon: Target, n: "38+", l: "Team Campaigns" },
              { icon: TrendingUp, n: "NPR 1.2Cr+", l: "Team Raised" },
            ].map(({ icon: Icon, n, l }) => (
              <div key={l} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-setu-50 border border-setu-100 flex items-center justify-center">
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

      {/* ── WHY TEAM ── */}
      <section className="py-16 bg-setu-50 border-b border-setu-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: UserPlus,
                title: "Invite Your Network",
                desc: "Rally friends, colleagues, and community members. Every team member brings new donors.",
                color: "text-setu-600",
                bg: "bg-setu-50",
              },
              {
                icon: Target,
                title: "Set Shared Goals",
                desc: "Create team campaigns with combined targets. Track collective progress in real-time.",
                color: "text-blue-600",
                bg: "bg-blue-50",
              },
              {
                icon: Trophy,
                title: "Earn Recognition",
                desc: "Top teams appear on the Hall of Fame and receive verified badges and exclusive rewards.",
                color: "text-amber-600",
                bg: "bg-amber-50",
              },
            ].map(({ icon: Icon, title, desc, color, bg }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-7 border border-setu-100 hover:shadow-[0_8px_28px_rgba(21,104,57,0.08)] transition-shadow"
              >
                <div
                  className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-5`}
                >
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <h3
                  className="text-[17px] font-bold text-setu-950 mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {title}
                </h3>
                <p className="text-[14px] text-gray-500 leading-[1.7]">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAMS GRID ── */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2
              className="text-[22px] font-bold text-setu-950"
              style={{ fontFamily: "var(--font-display)" }}
            >
              All Teams
            </h2>
            <span className="text-[13px] text-setu-600/60">
              {teams.length} teams
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams
              .filter((t) =>
                t.name.toLowerCase().includes(search.toLowerCase()),
              )
              .map((t) => (
                <TeamCard key={t.id} t={t} />
              ))}
          </div>
        </div>
      </section>

      {/* ── CREATE TEAM CTA ── */}
      <section className="py-16 mx-4 sm:mx-6 lg:mx-8 mb-16">
        <div className="bg-gradient-to-br from-setu-900 to-setu-950 rounded-[28px] p-12 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(34,160,91,0.2) 0%, transparent 70%)",
            }}
          />
          <div className="relative">
            <div className="w-16 h-16 bg-setu-700/40 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-setu-300" />
            </div>
            <h2
              className="text-[clamp(26px,3vw,40px)] font-bold text-white mb-4 tracking-[-0.5px]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Build Your Dream Team
            </h2>
            <p className="text-[15px] text-white/50 max-w-md mx-auto mb-8 leading-[1.75]">
              Unite your community, friends, or organization around causes that
              matter. Create a team and start making collective impact.
            </p>
            <Link
              href="/teams/create"
              className="inline-flex items-center gap-2 px-8 py-4 bg-setu-500 hover:bg-setu-400 text-white text-[15px] font-bold rounded-full no-underline shadow-[0_8px_28px_rgba(34,160,91,0.4)] hover:-translate-y-0.5 transition-all"
            >
              <Plus className="w-5 h-5" />
              Create a Team <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
