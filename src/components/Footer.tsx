import { Instagram, Linkedin, Github, Cpu, Lock, Terminal } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/5 bg-black px-6 py-10 md:px-12 md:py-16 font-mono overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3 group cursor-default">
              <div className="p-2 bg-zinc-900 border border-zinc-800 rounded group-hover:border-blue-500/50 transition-colors">
                <Terminal
                  size={16}
                  className="text-zinc-400 group-hover:text-blue-400"
                />
              </div>
              <span className="text-sm font-bold tracking-tighter text-white uppercase">
                Vanish{" "}
                <span className="text-zinc-600 font-medium">Protocol</span>
              </span>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3 items-center">
              <a
                href="https://github.com/PranjalPanging"
                target="_blank"
                className="group text-zinc-500 hover:text-white transition-all flex items-center gap-2 text-[10px] tracking-widest"
              >
                <Github
                  size={14}
                  className="group-hover:scale-110 transition-transform"
                />{" "}
                GITHUB
              </a>
              <a
                href="https://linkedin.com/in/pranjalpanging"
                target="_blank"
                className="group text-zinc-500 hover:text-white transition-all flex items-center gap-2 text-[10px] tracking-widest"
              >
                <Linkedin
                  size={14}
                  className="group-hover:scale-110 transition-transform"
                />{" "}
                LINKEDIN
              </a>
              <a
                href="https://instagram.com/pangnosis"
                target="_blank"
                className="group text-zinc-500 hover:text-white transition-all flex items-center gap-2 text-[10px] tracking-widest"
              >
                <Instagram
                  size={14}
                  className="group-hover:scale-110 transition-transform"
                />{" "}
                INSTAGRAM
              </a>
            </div>
          </div>

          <div className="relative group max-w-sm">
            <div className="absolute -left-4 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-blue-500/50 to-transparent" />
            <p className="text-[11px] md:text-xs text-zinc-400 italic leading-relaxed pl-6">
              "The most secure data is the data that no longer exists."
              <span className="block mt-2 text-zinc-600 not-italic text-[10px] font-bold tracking-widest">
                — VANISH_V1
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/5">
          <div className="text-[10px] text-zinc-500 tracking-wider uppercase">
            © {currentYear} VANISH SYSTEM // CREATED BY{" "}
            <span className="text-zinc-200 font-bold hover:text-blue-400 transition-colors cursor-pointer">
              PRANJAL PANGING
            </span>
          </div>

          <div className="flex items-center gap-4 text-[9px] font-mono text-zinc-600">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-zinc-950 border border-zinc-900">
              <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
              SYSTEM_READY
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded bg-zinc-950 border border-zinc-900">
              <Cpu size={10} />
              WASM_AES_256_GCM
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
