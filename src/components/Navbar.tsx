import { Terminal, Github } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-zinc-800 bg-black/80 backdrop-blur-sm px-6 py-4 flex justify-between items-center font-mono">
      <div className="flex items-center gap-3">
        <div className="bg-white p-1 rounded-sm">
          <Terminal className="text-black" size={16} />
        </div>
        <span className="font-bold tracking-tighter text-lg italic uppercase text-white">
          VANISH
        </span>
      </div>

      <div className="flex items-center">
        <a
          href="https://github.com/PranjalPanging/vanish"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[11px] text-zinc-400 hover:text-white transition-colors tracking-widest uppercase border border-zinc-800 px-3 py-1.5 rounded-sm bg-zinc-900/50"
        >
          <Github size={14} />
          <span>source_code</span>
        </a>
      </div>
    </nav>
  );
}
