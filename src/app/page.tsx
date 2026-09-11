"use client";

import { useState } from "react";
import {
  Search,
  Sparkles,
  Loader2,
  AlertTriangle,
  Terminal,
} from "lucide-react";
import { ContentPlanResult, SeoPlanData } from "@/components/ContentPlanResult";

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
      <section className="relative overflow-hidden pt-16 pb-12 px-4 border-b border-zinc-800/60 bg-linear-to-b from-zinc-900/50 to-zinc-950">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            Intention AI v1.0 • SERP-Enriched Content Engine
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Transform Keywords into <br />
            <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Intent-Driven SEO Plans
            </span>
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
            Analisis <strong>real-time SERP data</strong>, temukan{" "}
            <strong>content gaps</strong>, dan racik strategi SEO berbasis
            intent dalam hitungan detik.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="mt-6 max-w-2xl mx-auto relative flex items-center"
          >
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Masukkan keyword (misal: photobooth jakarta)..."
                disabled={loading}
                className="w-full pl-12 pr-32 py-4 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition disabled:opacity-50"
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

          <div className="pt-2 flex items-center justify-center gap-2 text-xs text-zinc-500 flex-wrap">
            <span>Coba keyword:</span>
            {SUGGESTED_KEYWORDS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleSearch(item)}
                disabled={loading}
                className="px-2.5 py-1 rounded-md bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 transition text-[11px]"
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
          <div className="text-center py-20 border border-dashed border-zinc-800/80 rounded-2xl bg-zinc-900/20 space-y-3">
            <Terminal className="w-10 h-10 text-zinc-600 mx-auto" />
            <h3 className="text-base font-semibold text-zinc-300">
              Ready to Analyze
            </h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              Ketikkan keyword atau klik salah satu keyword pilihan di atas
              untuk memulai analisis intent dan SERP.
            </p>
          </div>
        )}

        {!loading && data && <ContentPlanResult data={data} />}
      </section>
    </main>
  );
}
