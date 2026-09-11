export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/60 bg-zinc-950/50 py-6 text-center text-xs text-zinc-500">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© 2026 Intention AI. Built by Mowland Codes.</p>
        <div className="flex items-center gap-2 text-zinc-400 font-mono text-[11px]">
          <span>Next.js 16 • Gemini 3.6 • Serper.dev</span>
        </div>
      </div>
    </footer>
  );
}
