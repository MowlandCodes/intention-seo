"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { ContentPlanResult, SeoPlanData } from "@/components/ContentPlanResult";
import HeroSection from "@/components/Hero";
import EngineCapabilities from "@/components/EngineCapabilities";

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
    <div className="relative w-full flex-1 flex flex-col">
      <HeroSection
        keyword={keyword}
        setKeyword={setKeyword}
        loading={loading}
        onSearch={handleSearch}
      />

      <section className="max-w-5xl w-full mx-auto px-4 pt-8 pb-16">
        {error && (
          <div className="p-4 rounded-xl bg-red-950/30 backdrop-blur-md border border-red-500/30 text-red-300 flex items-center gap-3 text-sm">
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
              <div className="h-24 bg-zinc-900/50 rounded-2xl border border-zinc-800/60" />
              <div className="md:col-span-2 h-24 bg-zinc-900/50 rounded-2xl border border-zinc-800/60" />
            </div>
            <div className="h-28 bg-zinc-900/50 rounded-2xl border border-zinc-800/60" />
            <div className="h-40 bg-zinc-900/50 rounded-2xl border border-zinc-800/60" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-48 bg-zinc-900/50 rounded-2xl border border-zinc-800/60" />
              <div className="h-48 bg-zinc-900/50 rounded-2xl border border-zinc-800/60" />
            </div>
          </div>
        )}

        {!loading && !data && !error && <EngineCapabilities />}

        {!loading && data && <ContentPlanResult data={data} />}
      </section>
    </div>
  );
}
