import { FaGithub } from "react-icons/fa6";
import Logo from "@/components/Logo";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-zinc-800/80 bg-zinc-750/60 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer">
            <Logo size={42} />
            <div>
              <span className="font-bold text-white flex items-center tracking-tight gap-0.5 text-lg">
                Intention
                <span className="bg-linear-to-r from-indigo-800 via-indigo-500 to-indigo-400 bg-clip-text text-transparent">
                  AI
                </span>
              </span>
            </div>
          </div>
        </Link>

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
  );
}
