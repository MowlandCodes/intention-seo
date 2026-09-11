"use client";

import { useRef } from "react";
import { Search, Sparkles, Loader2, TrendingUp } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const SUGGESTED_KEYWORDS = [
  "photobooth jakarta",
  "sewa villa bali",
  "belajar golang gratis",
  "jas hujan terbaik",
];

interface HeroSectionProps {
  keyword: string;
  setKeyword: (value: string) => void;
  loading: boolean;
  onSearch: (targetKeyword?: string) => void;
}

export default function HeroSection({
  keyword,
  setKeyword,
  loading,
  onSearch,
}: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out", duration: 0.5 },
      });

      tl.fromTo(
        ".gsap-badge",
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, delay: 0.05 },
      )
        .fromTo(
          ".gsap-title",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1 },
          "-=0.3",
        )
        .fromTo(
          ".gsap-subtitle",
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1 },
          "-=0.35",
        )
        .fromTo(
          ".gsap-search",
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1 },
          "-=0.3",
        )
        .fromTo(
          ".gsap-chip",
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05 },
          "-=0.2",
        );
    },
    { scope: heroRef },
  );

  return (
    <section
      ref={heroRef}
      className="relative pt-16 pb-12 px-4 border-b border-zinc-800/60"
    >
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <div className="gsap-badge opacity-0 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          Intention AI | SERP-Enriched Content Engine
        </div>

        <h1 className="gsap-title opacity-0 text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Transform Keywords into <br />
          <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Intent-Driven SEO Plans
          </span>
        </h1>

        <p className="gsap-subtitle opacity-0 text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
          Analisis <strong>real-time SERP data</strong>, temukan{" "}
          <strong>content gaps</strong>, dan racik strategi SEO berbasis intent
          dalam hitungan detik.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSearch();
          }}
          className="gsap-search opacity-0 mt-6 max-w-2xl mx-auto relative flex items-center"
        >
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 z-1" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Masukkan keyword (misal: photobooth jakarta)..."
              disabled={loading}
              className="w-full pl-12 pr-32 py-4 rounded-xl bg-zinc-900/80 backdrop-blur-md border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !keyword.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Analyze"
              )}
            </button>
          </div>
        </form>

        <div className="pt-3 flex items-center justify-center gap-2 text-xs flex-wrap">
          <span className="gsap-chip opacity-0 flex items-center gap-1.5 text-zinc-200 font-mono text-[11px] mr-1">
            <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
            Try keywords:
          </span>
          {SUGGESTED_KEYWORDS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onSearch(item)}
              disabled={loading}
              className="gsap-chip opacity-0 px-3 py-1.5 rounded-full bg-zinc-900/80 backdrop-blur-md hover:bg-indigo-950/40 border border-zinc-800 hover:border-indigo-500/40 text-zinc-300 hover:text-indigo-300 text-[11px] transition-all duration-200 cursor-pointer disabled:opacity-50 shadow-sm"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
