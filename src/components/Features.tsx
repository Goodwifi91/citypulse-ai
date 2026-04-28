"use client";

import { FileText, Building2, Share2, Sparkles } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "SEO Blog Posts",
    desc: "Hyper-local blog content packed with city-specific keywords, landmarks, and long-tail phrases that rank.",
  },
  {
    icon: Building2,
    title: "GBP Updates",
    desc: "Concise, emoji-rich Google Business Profile posts that drive engagement and map-pack visibility.",
  },
  {
    icon: Share2,
    title: "Social Captions",
    desc: "Three platform-ready captions with local hashtags designed for maximum community reach.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered",
    desc: "Modular LLM backbone — swap in OpenAI, Anthropic, or any provider with a single env variable.",
  },
];

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
        Everything You Need for{" "}
        <span className="gradient-text">Local Dominance</span>
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-gray-400">
        One click turns your topic into a complete local-SEO content kit.
      </p>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="card-glass glow-ring p-6 transition hover:border-emerald-500/30"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
              <Icon className="h-5 w-5 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-400">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
