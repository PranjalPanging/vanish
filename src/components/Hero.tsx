import React from "react";
import {
  Terminal,
  Cpu,
  ShieldCheck,
  Globe,
  Fingerprint,
  Code2,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

const VanishHero = () => {
  return (
    <div className="relative min-h-screen w-full bg-black text-white selection:bg-blue-500/30 overflow-x-hidden pt-24 md:pt-32 pb-12 md:pb-20">
      <div
        className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-size:3rem_3rem md:bg-size:4rem_4rem 
        mask-radial-at-t mask-from-black mask-to-transparent mask-to-90% md:mask-to-80%"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 md:gap-3 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6 md:mb-8 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-9px md:text-10px font-mono text-zinc-500 uppercase tracking-widest leading-none">
              Protocol v1.0.4 Active
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 md:mb-8 leading-[1.1] md:leading-[0.85]">
            <a
              href="#"
              className="group relative inline-block hover:text-blue-400 transition-colors duration-500"
            >
              Vanish
              <span className="absolute -bottom-1 md:-bottom-2 left-0 w-0 h-px bg-blue-500 transition-all duration-700 group-hover:w-full"></span>
            </a>
            <br />
            <span className="text-zinc-600">Privacy by Architecture.</span>
          </h1>

          <div className="text-lg md:text-xl lg:text-2xl text-zinc-400 max-w-3xl leading-relaxed mb-12 md:mb-16">
            An end-to-end encrypted protocol leveraging
            <span className="inline-block mx-1 px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-200 font-mono text-base md:text-lg">
              Rust (WASM)
            </span>
            for client-side
            <span className="inline-block mx-1 px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-200 font-mono text-base md:text-lg">
              AES-256-GCM
            </span>
            encryption and Next.js for edge delivery.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8 p-6 md:p-10 rounded-2xl md:rounded-3xl border border-white/5 bg-zinc-900/10 backdrop-blur-sm group hover:border-blue-500/20 transition-all cursor-pointer">
            <div className="flex items-start justify-between mb-12 md:mb-20">
              <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
                <Fingerprint className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />
              </div>
              <div className="hidden sm:flex items-center gap-2 text-zinc-600 font-mono text-[10px]">
                <span>SPEC_0xAF</span>
                <div className="w-8 h-px bg-zinc-800" />
                <span>E2EE</span>
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-3 tracking-tight">
              Client-Side Sovereignty
            </h3>
            <p className="text-zinc-500 leading-relaxed text-base md:text-lg max-w-md">
              Encryption occurs entirely within the browser. Private keys never
              transit the network, ensuring zero-knowledge storage.
            </p>
          </div>

          <div className="md:col-span-4 p-6 md:p-10 rounded-2xl md:rounded-3xl border border-white/5 bg-zinc-900/10 backdrop-blur-sm group hover:border-orange-500/20 transition-all cursor-pointer">
            <div className="mb-12 md:mb-20">
              <div className="p-3 w-fit rounded-xl bg-orange-500/5 border border-orange-500/10">
                <Cpu className="w-6 h-6 md:w-8 md:h-8 text-orange-500" />
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-3 tracking-tight">
              Speed by Rust
            </h3>
            <p className="text-zinc-500 leading-relaxed text-base md:text-lg">
              Native performance via WASM for high-throughput encryption cycles.
            </p>
          </div>

          {[
            {
              icon: <Globe />,
              title: "Edge Optimized",
              desc: "Next.js Edge Runtime metadata orchestration.",
            },
            {
              icon: <ShieldCheck />,
              title: "Audit Ready",
              desc: "Transparent AES-256-GCM implementation.",
            },
            {
              icon: <Terminal />,
              title: "Open Source",
              desc: "Verifiable security for the modern web.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="md:col-span-4 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/5 bg-zinc-950/50 flex flex-row md:flex-col items-center md:items-start gap-4 transition-colors hover:bg-zinc-900/40"
            >
              <div className="shrink-0 text-zinc-500 p-2 bg-zinc-900 rounded-lg">
                {React.cloneElement(item.icon, { size: 18 })}
              </div>
              <div>
                <h4 className="text-white text-sm md:text-base font-medium">
                  {item.title}
                </h4>
                <p className="text-zinc-500 text-xs md:text-sm leading-snug mt-1">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-20 flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-white/5 pt-8 md:pt-10">
          <div className="flex flex-wrap items-center gap-6 md:gap-8">
            <button className="text-sm font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-2 group">
              Whitepaper{" "}
              <ChevronRight
                size={14}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </button>
            <button className="text-sm font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
              Protocol <ExternalLink size={12} />
            </button>
          </div>
          <p className="text-zinc-600 text-10px md:text-xs font-mono tracking-wider text-center md:text-right">
            SECURITY ARCHITECTURE: AES-256-GCM-SIV // CLIENT-SIDE ONLY
          </p>
        </div>
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-800px h-300px md:h-500px bg-blue-600/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
};

export default VanishHero;
