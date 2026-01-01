import { Instagram, Linkedin, Github } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-zinc-900 bg-black px-8 py-12 font-mono">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="space-y-4">
          <div className="text-[11px] text-zinc-500 tracking-wider uppercase">
            © {currentYear} VANISH SYSTEM // CREATED BY{" "}
            <span className="text-white font-bold">PRANJAL PANGING</span>
          </div>

          <div className="flex gap-5 items-center">
            <a
              href="https://github.com/PranjalPanging"
              target="_blank"
              className="text-zinc-600 hover:text-white transition-colors flex items-center gap-1.5 text-[10px]"
            >
              <Github size={14} /> GITHUB
            </a>
            <a
              href="https://linkedin.com/in/pranjalpanging"
              target="_blank"
              className="text-zinc-600 hover:text-white transition-colors flex items-center gap-1.5 text-[10px]"
            >
              <Linkedin size={14} /> LINKEDIN
            </a>
            <a
              href="https://instagram.com/pangnosis"
              target="_blank"
              className="text-zinc-600 hover:text-white transition-colors flex items-center gap-1.5 text-[10px]"
            >
              <Instagram size={14} /> PANGNOSIS
            </a>
          </div>
        </div>

        <div className="max-w-xs border-l border-zinc-800 pl-6">
          <p className="text-[10px] text-zinc-500 italic uppercase leading-relaxed text-left md:text-right">
            "The most secure data is the data that no longer exists." <br />
            <span className="text-zinc-700 not-italic">
              — Vanish Citation v.1.0
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
