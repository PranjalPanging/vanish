import React from "react";
import Link from "next/link";
import {
  Terminal,
  Cpu,
  ShieldCheck,
  Globe,
  Fingerprint,
  ArrowRight,
} from "lucide-react";

const VanishHero = () => {
  return (
    <div className="relative min-h-screen w-full bg-black text-white selection:bg-blue-500/30 overflow-x-hidden pt-24 md:pt-32 pb-12 md:pb-20">
      <div
        className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-size-[3rem_3rem] md:bg-size-[4rem_4rem] 
        [mask:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 md:gap-3 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6 md:mb-8 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full v-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-[9px] md:text-[10px] font-mono text-zinc-500 uppercase tracking-widest leading-none">
              Protocol v1.0.4 Active
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 md:mb-8 leading-[1.1] md:leading-[0.85]">
            <span className="group relative inline-block transition-colors duration-500">
              Vanish
              <span className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-px bg-blue-500/50"></span>
            </span>
            <br />
            <span className="text-zinc-600">Privacy by Architecture.</span>
          </h1>

          <div className="text-lg md:text-xl lg:text-2xl text-zinc-400 max-w-3xl leading-relaxed mb-8 md:mb-12">
            An end-to-end encrypted protocol leveraging
            <span className="inline-block mx-1 px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-200 font-mono text-base md:text-lg">
              Rust (WASM)
            </span>
            for client-side
            <span className="inline-block mx-1 px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-200 font-mono text-base md:text-lg">
              AES-256-GCM
            </span>
            encryption.
          </div>

          <div className="mb-16 md:mb-24">
            <Link
              href="/share"
              className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-xl font-mono text-xs font-bold tracking-[0.2em] uppercase hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-[0_0_30px_-10px_rgba(255,255,255,0.3)] hover:shadow-blue-500/40"
            >
              Initialize Vault
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8 p-6 md:p-10 rounded-2xl md:rounded-3xl border border-white/5 bg-zinc-900/10 backdrop-blur-sm group hover:border-blue-500/20 transition-all">
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

          <div className="md:col-span-4 p-6 md:p-10 rounded-2xl md:rounded-3xl border border-white/5 bg-zinc-900/10 backdrop-blur-sm group hover:border-orange-500/20 transition-all">
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
      </div>
    </div>
  );
};

export default VanishHero;
