import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "@/assets/styles/globals.css";
import { Sparkles } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Intention - AI SEO Content Planner & SERP Intelligence",
  description:
    "Transform keywords into actionable, intent-driven SEO content plans powered by Gemini 3.6 & Live SERP Analysis.",
  keywords: [
    "SEO Planner",
    "AI Content Strategy",
    "SERP Analysis",
    "Content Intelligence",
  ],
  authors: [{ name: "M. Faridh Maulana" }],
  openGraph: {
    title: "Intention — AI SEO Content Planner",
    description:
      "Transform raw search keywords into intent-focused content plans in seconds.",
    type: "website",
    siteName: "Intention AI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-zinc-950 text-zinc-100 antialiased selection:bg-indigo-500 selection:text-white min-h-screen flex flex-col justify-between`}
      >
        <header className="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-sm font-mono">
                IN
              </div>
              <div>
                <span className="font-bold text-white flex items-center tracking-tight gap-0.5 text-lg">
                  Intention
                  <span className="bg-linear-to-r from-indigo-800 via-indigo-500 to-indigo-400 bg-clip-text text-transparent">
                    AI
                  </span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://github.com/MowlandCodes/intention-seo"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 transition text-xs font-medium text-zinc-300"
              >
                <FaGithub className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">GitHub Repository</span>
              </a>
            </div>
          </div>
        </header>

        {/* Main Content Viewport */}
        <div className="flex-1">{children}</div>

        {/* Footer */}
        <footer className="border-t border-zinc-800/60 bg-zinc-950/50 py-6 text-center text-xs text-zinc-500">
          <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>© 2026 Intention AI. Built by Mowland Codes.</p>
            <div className="flex items-center gap-2 text-zinc-400 font-mono text-[11px]">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              <span>Next.js 16 • Gemini 3.6 • Serper.dev</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
