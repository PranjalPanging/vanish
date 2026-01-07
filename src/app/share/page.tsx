"use client";

import React, { useState } from "react";
import { FileVault } from "@/components/FileVault";
import ShareResult from "@/components/ShareResult";
import { Terminal, ShieldAlert } from "lucide-react";

export default function SharePage() {
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen w-full bg-black text-white selection:bg-blue-500/30 overflow-x-hidden pt-32 pb-20">
      <div
        className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-size:3rem_3rem md:bg-size:4rem_4rem 
        mask-radial-at-t mask-from-black mask-to-transparent mask-to-90% md:mask-to-80%"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                {shareUrl ? "Secure_Link_Generated" : "Vault_Awaiting_Payload"}
              </span>
            </div>
          </div>

          {!shareUrl ? (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-center mb-12">
                Secure <span className="text-zinc-600">Upload.</span>
              </h2>
              <FileVault onUploadComplete={(url) => setShareUrl(url)} />
            </div>
          ) : (
            <div className="animate-in zoom-in-95 fade-in duration-500">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-center mb-12">
                Payload <span className="text-blue-500">Locked.</span>
              </h2>
              <ShareResult url={shareUrl} onReset={() => setShareUrl(null)} />
            </div>
          )}

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/5 pt-10">
            {[
              { label: "METHOD", value: "AES-256-GCM-SIV" },
              { label: "RUNTIME", value: "RUST_WASM_EDGE" },
              { label: "STORAGE", value: "VERCEL_BLOB_STORE" },
              { label: "PRIVACY", value: "ZERO_KNOWLEDGE" },
            ].map((item, i) => (
              <div key={i} className="space-y-1">
                <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.2em]">
                  {item.label}
                </p>
                <p className="text-[11px] font-mono text-zinc-300 tracking-wider font-bold">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-800px h-500px bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
}
