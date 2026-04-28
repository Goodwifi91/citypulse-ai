"use client";

import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/5 bg-gray-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Zap className="h-4 w-4 text-emerald-500" />
          <span>CityPulse AI</span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">
            Local-SEO optimization powered by AI
          </span>
        </div>
        <p className="text-xs text-gray-600">
          © {new Date().getFullYear()} CityPulse AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
