"use client";

import { useState } from "react";
import {
  Copy,
  Check,
  Sparkles,
  Target,
  Layers,
  AlertCircle,
  FileText,
} from "lucide-react";

interface MetaTags {
  title: string;
  description: string;
}

interface OutlineItem {
  level: "H2" | "H3";
  heading: string;
  points: string[];
}

export interface SeoPlanData {
  searchIntent:
    "Informational" | "Commercial" | "Transactional" | "Navigational";
  targetAudience: string[];
  seoTitles: string[];
  metaTags: MetaTags;
  relatedKeywords: string[];
  contentOutline: OutlineItem[];
  contentGapAnalysis: string[];
}

export function ContentPlanResult({ data }: { data: SeoPlanData }) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const intentColor =
    {
      Informational: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      Commercial: "bg-purple-500/10 text-purple-400 border-purple-500/30",
      Transactional: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      Navigational: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    }[data.searchIntent] || "bg-zinc-800 text-zinc-300 border-zinc-800";

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 text-zinc-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
            <Target className="w-4 h-4 text-emerald-400" /> Search Intent
          </span>
          <div className="flex h-full justify-center items-center">
            <span
              className={`text-2xl font-bold px-4 py-2 border rounded-full ${intentColor}`}
            >
              {data.searchIntent}
            </span>
          </div>
        </div>

        <div className="md:col-span-2 p-5 rounded-xl bg-zinc-900 border border-zinc-800">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" /> Target Audience
          </span>
          <div className="mt-3 flex flex-wrap gap-2">
            {data.targetAudience.map((aud, i) => (
              <span
                key={i}
                className="px-2.5 py-1 text-xs bg-zinc-800 border border-zinc-700 rounded-md text-zinc-300"
              >
                {aud}
              </span>
            ))}
          </div>
        </div>
      </div>

      {data.contentGapAnalysis?.length > 0 && (
        <div className="p-5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-200">
          <h3 className="text-sm font-semibold flex items-center gap-2 text-amber-400 mb-2">
            <AlertCircle className="w-4 h-4" /> Content Gap Opportunities
            (Versus Top SERP Competitors)
          </h3>
          <ul className="list-disc list-inside space-y-1 text-xs text-amber-200/80">
            {data.contentGapAnalysis.map((gap, i) => (
              <li key={i}>{gap}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" /> Optimized Meta Tags
          </h3>
          <button
            onClick={() =>
              copyToClipboard(
                `Title: ${data.metaTags.title}\nDescription: ${data.metaTags.description}`,
                "meta",
              )
            }
            className="text-xs bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-md border border-zinc-700 transition flex items-center gap-1.5"
          >
            {copiedField === "meta" ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            {copiedField === "meta" ? "Copied All" : "Copy Meta Tags"}
          </button>
        </div>

        <div className="space-y-3 text-sm">
          <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800">
            <span className="text-xs text-zinc-500 block mb-1">
              Meta Title ({data.metaTags.title.length} chars)
            </span>
            <p className="font-mono text-emerald-400 text-xs">
              {data.metaTags.title}
            </p>
          </div>
          <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800">
            <span className="text-xs text-zinc-500 block mb-1">
              Meta Description ({data.metaTags.description.length} chars)
            </span>
            <p className="text-zinc-300 text-xs">{data.metaTags.description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
          <h3 className="text-sm font-semibold text-zinc-300 mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-400" /> Catchy Article Titles
          </h3>
          <ul className="space-y-2">
            {data.seoTitles.map((title, i) => (
              <li
                key={i}
                className="p-2.5 bg-zinc-950 rounded-md border border-zinc-800/80 text-xs text-zinc-200 hover:border-zinc-700 transition flex justify-between items-center group"
              >
                <span>{title}</span>
                <button
                  onClick={() => copyToClipboard(title, `title-${i}`)}
                  className="opacity-0 group-hover:opacity-100 transition p-1 hover:bg-zinc-800 rounded"
                >
                  {copiedField === `title-${i}` ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3 text-zinc-400" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
          <h3 className="text-sm font-semibold text-zinc-300 mb-3">
            Long-Tail Related Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.relatedKeywords.map((kw, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-zinc-950 border border-zinc-800 text-xs text-zinc-400 rounded-lg hover:text-zinc-200 transition cursor-default"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4">
        <h3 className="text-sm font-semibold text-zinc-300">
          Suggested Structured Article Outline
        </h3>
        <div className="space-y-3">
          {data.contentOutline.map((item, i) => (
            <div
              key={i}
              className={`p-4 rounded-lg bg-zinc-950 border border-zinc-800 ${
                item.level === "H3"
                  ? "ml-6 border-l-2 border-l-indigo-500/50"
                  : ""
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    item.level === "H2"
                      ? "bg-indigo-500/20 text-indigo-300"
                      : "bg-zinc-800 text-zinc-400"
                  }`}
                >
                  {item.level}
                </span>
                <h4 className="text-sm font-medium text-zinc-200">
                  {item.heading}
                </h4>
              </div>
              <ul className="list-disc list-inside space-y-1 text-xs text-zinc-400 pl-2">
                {item.points.map((pt, j) => (
                  <li key={j}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
