import { Terminal, Github, ShieldCheck } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-100 border-b border-white/5 bg-black/60 backdrop-blur-xl px-6 py-3 md:px-12 flex justify-between items-center font-mono transition-all duration-300">
      <div className="flex items-center gap-4 group">
        <div className="relative">
          <div className="bg-white p-1.5 rounded-sm transition-transform duration-500 group-hover:rotate-12">
            <Terminal className="text-black" size={18} />
          </div>
          <div className="absolute inset-0 bg-white/20 blur-md rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <div className="flex flex-col">
          <span className="font-black tracking-tighter text-xl uppercase text-white leading-none">
            VANISH
          </span>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
            </span>
            <span className="text-[9px] text-zinc-500 tracking-[0.2em] uppercase font-bold">
              Encrypted_Link
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-white/5 bg-zinc-900/30 rounded-full">
          <ShieldCheck size={12} className="text-blue-500" />
          <span className="text-[10px] text-zinc-400 tracking-wider">
            AES_256_ACTIVE
          </span>
        </div>

        <a
          href="https://github.com/PranjalPanging/vanish"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 text-[11px] text-zinc-400 hover:text-white transition-all tracking-widest uppercase border border-white/10 px-4 py-2 rounded-md bg-zinc-950 hover:bg-zinc-900 hover:border-blue-500/30 shadow-sm"
        >
          <Github
            size={14}
            className="group-hover:scale-110 transition-transform"
          />
          <span className="hidden xs:inline">view_source</span>
          <span className="xs:hidden">src</span>
        </a>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1px bg-linear-to-r from-transparent via-blue-500/20 to-transparent" />
    </nav>
  );
}
