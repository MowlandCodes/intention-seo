import { Target, Sparkles, Layers } from "lucide-react";

export default function EngineCapabilities() {
  return (
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
        <div className="p-5 rounded-2xl bg-zinc-900/30 backdrop-blur-md border border-zinc-800/60 space-y-3 hover:border-indigo-500/40 hover:bg-zinc-900/50 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
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

        <div className="p-5 rounded-2xl bg-zinc-900/30 backdrop-blur-md border border-zinc-800/60 space-y-3 hover:border-amber-500/40 hover:bg-zinc-900/50 hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-300">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-semibold text-zinc-200">
            SERP Gap Analysis
          </h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Ekstrak data Google SERP <strong>real-time</strong> untuk mencari
            topik dan sudut pandang yang dilewati kompetitor.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/30 backdrop-blur-md border border-zinc-800/60 space-y-3 hover:border-emerald-500/40 hover:bg-zinc-900/50 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Layers className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-semibold text-zinc-200">
            Structured Outline & Meta
          </h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Merekomendasikan judul serta outline konten yang SEO-friendly, Meta
            Tags siap-copy, dan struktur heading H2/H3 yang terencana.
          </p>
        </div>
      </div>
    </div>
  );
}
