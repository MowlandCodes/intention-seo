"use client";

import { useState, useRef } from "react";
import {
  Search,
  Sparkles,
  Loader2,
  AlertTriangle,
  Terminal,
  TrendingUp,
  Target,
  Layers,
} from "lucide-react";
import { ContentPlanResult, SeoPlanData } from "@/components/ContentPlanResult";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const SUGGESTED_KEYWORDS = [
  "photobooth jakarta",
  "sewa villa bali",
  "belajar golang gratis",
  "jas hujan terbaik",
];

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<SeoPlanData | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);

  // Pake useGSAP gantiin useEffect manual
  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out", duration: 0.5 }, // duration 0.5s lebih snappy
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
          { y: 0, opacity: 1, stagger: 0.05 }, // Stagger lebih cepat (0.05s)
          "-=0.2",
        );
    },
    { scope: heroRef },
  );

  const handleSearch = async (targetKeyword?: string) => {
    const queryKeyword = (targetKeyword || keyword).trim();
    if (!queryKeyword) return;

    if (targetKeyword) setKeyword(targetKeyword);

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: queryKeyword }),
      });

      const result = await res.json();

      if (!res.ok || result.status === "failure") {
        throw new Error(
          result.message || "Gagal mengambil data dari AI server.",
        );
      }

      setData(result.data);
    } catch (err) {
      setError(
        (err as Error).message || "Terjadi kesalahan sistem, coba lagi nanti.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-indigo-500 selection:text-white pb-20">
      <section
        ref={heroRef}
        className="relative overflow-hidden pt-16 pb-12 px-4 border-b border-zinc-800/60 bg-linear-to-b from-zinc-900/50 to-zinc-950"
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-1">
          <div className="absolute top-[-30%] left-[15%] w-125 h-125 rounded-full bg-indigo-600/15 blur-[130px] animate-aurora-1" />
          <div className="absolute top-[10%] right-[-10%] w-112.5 h-112.5 rounded-full bg-purple-600/15 blur-[130px] animate-aurora-2" />
          <div className="absolute bottom-[-20%] left-[30%] w-100 h-100 rounded-full bg-pink-600/10 blur-[130px] animate-aurora-3" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25" />
        </div>
        <div className="relative z-2 max-w-4xl mx-auto text-center space-y-4">
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
            <strong>content gaps</strong>, dan racik strategi SEO berbasis
            intent dalam hitungan detik.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="gsap-search opacity-0 mt-6 max-w-2xl mx-auto relative flex items-center"
          >
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Masukkan keyword (misal: photobooth jakarta)..."
                disabled={loading}
                className="w-full pl-12 pr-32 py-4 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading || !keyword.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs sm:text-sm transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                onClick={() => handleSearch(item)}
                disabled={loading}
                className="gsap-chip opacity-0 px-3 py-1.5 rounded-full bg-zinc-900/80 hover:bg-indigo-950/40 border border-zinc-800 hover:border-indigo-500/40 text-zinc-300 hover:text-indigo-300 text-[11px] transition-all duration-200 cursor-pointer disabled:opacity-50 shadow-sm"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 pt-10">
        {error && (
          <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/30 text-red-300 flex items-center gap-3 text-sm">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-red-200">Terjadi kesalahan</p>
              <p className="text-xs text-red-300/80">{error}</p>
            </div>
            <button
              onClick={() => handleSearch()}
              className="px-3 py-1 bg-red-900/50 hover:bg-red-800/50 border border-red-700/50 rounded-lg text-xs transition"
            >
              Retry
            </button>
          </div>
        )}

        {loading && (
          <div className="space-y-6 animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="h-24 bg-zinc-900 rounded-xl border border-zinc-800" />
              <div className="md:col-span-2 h-24 bg-zinc-900 rounded-xl border border-zinc-800" />
            </div>
            <div className="h-28 bg-zinc-900 rounded-xl border border-zinc-800" />
            <div className="h-40 bg-zinc-900 rounded-xl border border-zinc-800" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-48 bg-zinc-900 rounded-xl border border-zinc-800" />
              <div className="h-48 bg-zinc-900 rounded-xl border border-zinc-800" />
            </div>
          </div>
        )}

        {!loading && !data && !error && (
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                Engine Capabilities
              </h3>
              <p className="text-sm text-zinc-400">
                Apa yang dapat diracik oleh Intention AI untuk keyword yang kamu
                berikan:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 space-y-2 hover:border-zinc-700/80 transition">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Target className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-semibold text-zinc-200">
                  Intent Classification
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Deteksi <strong>search intent</strong> (Informational,
                  Transactional, Commercial) beserta profil{" "}
                  <strong>target audience</strong>-nya.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 space-y-2 hover:border-zinc-700/80 transition">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-semibold text-zinc-200">
                  SERP Gap Analysis
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Ekstrak data Google SERP <strong>real-time</strong> untuk
                  mencari topik dan sudut pandang yang dilewati kompetitor.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 space-y-2 hover:border-zinc-700/80 transition">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Layers className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-semibold text-zinc-200">
                  Structured Outline & Meta
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Generasi judul harian SEO-friendly, Meta Tags siap-copy, dan
                  struktur heading H2/H3 terencana.
                </p>
              </div>
            </div>
          </div>
        )}

        {!loading && data && <ContentPlanResult data={data} />}
      </section>
    </main>
  );
}
