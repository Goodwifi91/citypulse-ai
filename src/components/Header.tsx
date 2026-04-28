"use client";

import { Zap, ExternalLink } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-gray-950/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            CityPulse{" "}
            <span className="gradient-text">AI</span>
          </span>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-gray-400 sm:flex">
          <a href="#features" className="transition hover:text-white">
            Features
          </a>
          <a href="#try-it" className="transition hover:text-white">
            Try&nbsp;It
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 transition hover:text-white"
          >
            GitHub
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </nav>
      </div>
    </header>
  );
}
