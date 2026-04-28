"use client";

import { useState } from "react";
import {
  Send,
  ChevronDown,
  Loader2,
  FileText,
  Building2,
  Share2,
  Copy,
  Check,
} from "lucide-react";
import { DEFAULT_CITIES } from "@/lib/cities";
import type { OptimizeResult } from "@/lib/ai-service";

type Tab = "blog" | "gbp" | "social";

export default function Optimizer() {
  const [topic, setTopic] = useState("");
  const [city, setCity] = useState(DEFAULT_CITIES[0].value);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<OptimizeResult | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("blog");
  const [copied, setCopied] = useState<string | null>(null);

  async function handleOptimize() {
    if (!topic.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic.trim(), city }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Request failed (${res.status})`);
      }

      const data: OptimizeResult = await res.json();
      setResult(data);
      setActiveTab("blog");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function copyToClipboard(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  const tabs: { key: Tab; label: string; icon: typeof FileText }[] = [
    { key: "blog", label: "Blog Post", icon: FileText },
    { key: "gbp", label: "GBP Update", icon: Building2 },
    { key: "social", label: "Social Captions", icon: Share2 },
  ];

  return (
    <section id="try-it" className="mx-auto max-w-4xl px-6 py-20">
      <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
        <span className="gradient-text">Try It</span> Now
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-gray-400">
        Enter your topic and select a target city to generate your local-SEO
        content kit.
      </p>

      {/* Input Card */}
      <div className="card-glass mt-10 p-6 sm:p-8">
        <div className="space-y-5">
          {/* Topic */}
          <div>
            <label
              htmlFor="topic"
              className="mb-1.5 block text-sm font-medium text-gray-300"
            >
              Topic / Article
            </label>
            <textarea
              id="topic"
              rows={4}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Best brunch spots in Uptown, home renovation tips, small business marketing strategies…"
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-100 placeholder-gray-500 outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          {/* City */}
          <div>
            <label
              htmlFor="city"
              className="mb-1.5 block text-sm font-medium text-gray-300"
            >
              Target City
            </label>
            <div className="relative">
              <select
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-10 text-sm text-gray-100 outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20"
              >
                {DEFAULT_CITIES.map((c) => (
                  <option key={c.value} value={c.value} className="bg-gray-900">
                    {c.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleOptimize}
            disabled={loading || !topic.trim()}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:shadow-emerald-500/40 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Optimizing…
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Optimize
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-300">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="card-glass mt-8 space-y-4 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <div className="flex gap-1">
              <span className="pulse-dot h-2 w-2 rounded-full bg-emerald-400" />
              <span className="pulse-dot h-2 w-2 rounded-full bg-emerald-400" />
              <span className="pulse-dot h-2 w-2 rounded-full bg-emerald-400" />
            </div>
            Generating your local-SEO content kit…
          </div>
          <div className="shimmer h-4 w-3/4 rounded" />
          <div className="shimmer h-4 w-full rounded" />
          <div className="shimmer h-4 w-5/6 rounded" />
          <div className="shimmer h-4 w-2/3 rounded" />
          <div className="shimmer h-4 w-full rounded" />
          <div className="shimmer h-4 w-4/5 rounded" />
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <div className="card-glass mt-8 overflow-hidden">
          {/* Tab bar */}
          <div className="flex border-b border-white/10">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex flex-1 items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium transition ${
                  activeTab === key
                    ? "border-b-2 border-emerald-400 text-emerald-400"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-6 sm:p-8">
            {activeTab === "blog" && (
              <ResultBlock
                content={result.blogPost}
                copyKey="blog"
                copied={copied}
                onCopy={copyToClipboard}
              />
            )}

            {activeTab === "gbp" && (
              <ResultBlock
                content={result.gbpUpdate}
                copyKey="gbp"
                copied={copied}
                onCopy={copyToClipboard}
              />
            )}

            {activeTab === "social" && (
              <div className="space-y-4">
                {result.socialCaptions.map((caption, i) => (
                  <ResultBlock
                    key={i}
                    content={caption}
                    copyKey={`social-${i}`}
                    copied={copied}
                    onCopy={copyToClipboard}
                    label={`Caption ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function ResultBlock({
  content,
  copyKey,
  copied,
  onCopy,
  label,
}: {
  content: string;
  copyKey: string;
  copied: string | null;
  onCopy: (text: string, key: string) => void;
  label?: string;
}) {
  return (
    <div className="group relative rounded-xl border border-white/5 bg-white/[0.02] p-5">
      {label && (
        <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-emerald-400/70">
          {label}
        </span>
      )}
      <div className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap text-sm leading-relaxed text-gray-300">
        {content}
      </div>
      <button
        onClick={() => onCopy(content, copyKey)}
        className="absolute right-3 top-3 rounded-lg border border-white/10 bg-white/5 p-2 text-gray-500 opacity-0 transition hover:text-white group-hover:opacity-100"
        aria-label="Copy to clipboard"
      >
        {copied === copyKey ? (
          <Check className="h-4 w-4 text-emerald-400" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
