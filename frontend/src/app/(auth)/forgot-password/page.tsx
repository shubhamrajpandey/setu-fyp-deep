"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Mail,
  ArrowRight,
  ArrowLeft,
  Loader2,
  CheckCircle2,
} from "lucide-react";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen flex bg-setu-950">
      {/* ── LEFT: Image panel ── */}
      <div className="hidden lg:block lg:w-[58%] relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1400&q=90&auto=format&fit=crop"
          alt="Helping hands in Nepal community"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-setu-950 via-setu-950/55 to-setu-950/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-setu-950/25" />

        {/* Top-left logo */}
        <div className="absolute top-10 left-10 z-10">
          <Link href="/" className="flex items-center gap-3 no-underline group">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-white/25 transition-all duration-200">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <span
              className="text-2xl font-bold text-white leading-none"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Setu
            </span>
          </Link>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-12 z-10">
          <p className="text-setu-300 text-sm font-semibold uppercase tracking-[0.15em] mb-4">
            We've got you covered
          </p>
          <h2
            className="text-5xl font-bold text-white leading-[1.08] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Back in minutes,
            <br />
            <em className="italic text-setu-300">giving in seconds.</em>
          </h2>
          <p className="text-white/55 text-base leading-relaxed max-w-sm mb-10">
            We'll send a secure reset link to your inbox. Your campaigns and
            donor history are safe and waiting for you.
          </p>

          {/* Steps */}
          <div className="flex flex-col gap-4 max-w-sm">
            {[
              { n: "01", label: "Enter your email address below" },
              { n: "02", label: "Check your inbox for the reset link" },
              { n: "03", label: "Set a new password and sign in" },
            ].map(({ n, label }) => (
              <div key={n} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-setu-700/60 border border-setu-600/50 flex items-center justify-center flex-shrink-0">
                  <span
                    className="text-xs font-bold text-setu-300"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {n}
                  </span>
                </div>
                <p className="text-sm text-white/65">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT: Form panel ── */}
      <div className="flex-1 flex flex-col bg-cream relative overflow-y-auto">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-setu-700 via-setu-400 to-setu-600" />

        <div className="flex-1 flex flex-col items-center justify-center px-8 py-16 max-w-[440px] mx-auto w-full">
          {/* Mobile logo */}
          <div className="lg:hidden mb-10 w-full">
            <Link href="/" className="flex items-center gap-2.5 no-underline">
              <div className="w-9 h-9 rounded-xl bg-setu-700 flex items-center justify-center shadow-[0_4px_12px_rgba(26,110,57,0.35)]">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
              <span
                className="text-2xl font-bold text-setu-950"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Setu
              </span>
            </Link>
          </div>

          {!sent ? (
            <>
              {/* Back link */}
              <div className="w-full mb-8">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-setu-600 hover:text-setu-500 no-underline transition-colors group"
                >
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-150" />
                  Back to Sign In
                </Link>
              </div>

              {/* Header */}
              <div className="w-full mb-9">
                <div className="w-12 h-12 bg-setu-50 border border-setu-200 rounded-2xl flex items-center justify-center mb-5">
                  <Mail className="w-5 h-5 text-setu-600" />
                </div>
                <p className="text-setu-600 text-xs font-bold uppercase tracking-[0.15em] mb-2">
                  Password reset
                </p>
                <h1
                  className="text-4xl font-bold text-setu-950 leading-tight mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Forgot your
                  <br />
                  <em className="italic text-setu-700">password?</em>
                </h1>
                <p className="text-gray-500 text-sm leading-relaxed">
                  No worries — enter your email and we'll send you a secure link
                  to reset it.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="w-full space-y-5">
                <div>
                  <label className="block text-xs font-bold text-setu-800 uppercase tracking-[0.1em] mb-2">
                    Email Address
                  </label>
                  <div
                    className={`relative rounded-xl transition-all duration-200 ${focused ? "ring-2 ring-setu-500/30" : ""}`}
                  >
                    <Mail
                      className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${focused ? "text-setu-600" : "text-gray-400"}`}
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocused(true)}
                      onBlur={() => setFocused(false)}
                      placeholder="you@example.com"
                      className="w-full pl-11 pr-4 py-3.5 bg-white border border-setu-200 rounded-xl text-sm text-setu-950 placeholder-gray-300 focus:outline-none focus:border-setu-500 transition-colors"
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-400">
                    We'll send a reset link to this address if it's registered.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2.5 py-4 bg-setu-700 hover:bg-setu-600 disabled:bg-setu-300 text-white font-bold rounded-xl text-sm transition-all duration-200 hover:shadow-[0_8px_24px_rgba(26,110,57,0.35)] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:transform-none active:translate-y-0"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending link…</span>
                    </>
                  ) : (
                    <>
                      <span>Send Reset Link</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-gray-500">
                  Remembered it?{" "}
                  <Link
                    href="/login"
                    className="text-setu-700 font-semibold hover:text-setu-600 transition-colors no-underline"
                  >
                    Back to Sign In →
                  </Link>
                </p>
              </form>
            </>
          ) : (
            /* ── Success state ── */
            <>
              <div className="w-full mb-8">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-setu-600 hover:text-setu-500 no-underline transition-colors group"
                >
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-150" />
                  Back to Sign In
                </Link>
              </div>

              <div className="w-full text-center">
                <div className="w-16 h-16 bg-setu-50 border-2 border-setu-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-setu-600" />
                </div>

                <p className="text-setu-600 text-xs font-bold uppercase tracking-[0.15em] mb-2">
                  Check your inbox
                </p>
                <h1
                  className="text-4xl font-bold text-setu-950 leading-tight mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Email sent
                  <br />
                  <em className="italic text-setu-700">successfully.</em>
                </h1>
                <p className="text-gray-500 text-sm leading-relaxed mb-2">
                  We've sent a password reset link to
                </p>
                <p className="text-setu-700 font-semibold text-sm mb-8 bg-setu-50 border border-setu-200 rounded-xl px-4 py-3 inline-block">
                  {email}
                </p>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-left">
                  <p className="text-xs font-semibold text-amber-800 mb-1">
                    Didn't receive it?
                  </p>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    Check your spam or junk folder. The link expires in{" "}
                    <strong>15 minutes</strong>. Make sure the email address is
                    correct.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSent(false);
                    setEmail("");
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border border-setu-200 hover:border-setu-300 hover:bg-setu-50 rounded-xl text-sm font-semibold text-setu-700 transition-all duration-150 mb-4"
                >
                  Try a different email
                </button>

                <Link
                  href="/login"
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-setu-700 hover:bg-setu-600 rounded-xl text-sm font-bold text-white no-underline transition-all duration-200 hover:shadow-[0_8px_24px_rgba(26,110,57,0.35)] hover:-translate-y-0.5"
                >
                  Back to Sign In
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </>
          )}

          {/* Trust */}
          <div className="w-full mt-10 flex items-center justify-center gap-2">
            <svg
              className="w-3.5 h-3.5 text-setu-500 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
              />
            </svg>
            <span className="text-xs text-gray-400">
              256-bit SSL encrypted · Your data is safe
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
