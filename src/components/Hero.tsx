"use client";

import { MapPin, TrendingUp, Share2 } from "lucide-react";

const pills = [
  { icon: MapPin, label: "Local SEO Blog Posts" },
  { icon: TrendingUp, label: "Google Business Updates" },
  { icon: Share2, label: "Social Media Captions" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient orbs */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-emerald-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 top-20 h-[400px] w-[400px] rounded-full bg-cyan-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl px-6 pb-16 pt-24 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Hyper-Local Content Optimization
        </div>

        <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Turn Any Topic Into{" "}
          <span className="gradient-text">Local-SEO Gold</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
          Paste an article or topic, pick your city, and let CityPulse AI
          generate an optimized blog post, Google Business Profile update, and
          social media captions — all geo-targeted to your market.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {pills.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300"
            >
              <Icon className="h-4 w-4 text-emerald-400" />
              {label}
            </div>
          ))}
        </div>

        <div className="mt-10">
          <a
            href="#try-it"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:shadow-emerald-500/40 hover:brightness-110"
          >
            Try It Free
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
