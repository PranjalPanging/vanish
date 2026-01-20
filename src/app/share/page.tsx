"use client";

import { useState, useEffect } from "react";
import { FileVault } from "@/components/FileVault";
import ShareResult from "@/components/ShareResult";
import { motion, AnimatePresence } from "framer-motion";

export default function SharePage() {
  const [mounted, setMounted] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen w-full bg-black text-white selection:bg-blue-500/30 overflow-x-hidden pt-24 md:pt-32 pb-12 md:pb-20">
      <div
        className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-size-3rem_3rem] md:bg-size-4rem_4rem] 
mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8 md:mb-12">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${shareUrl ? "bg-emerald-400" : "bg-blue-400"}`}
                ></span>
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${shareUrl ? "bg-emerald-500" : "bg-blue-500"}`}
                ></span>
              </span>
              <span className="text-[9px] md:text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] leading-none">
                {shareUrl ? "Secure_Payload_Ready" : "System_Awaiting_Data"}
              </span>
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            {!shareUrl ? (
              <motion.div
                key="upload-state"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-center mb-4 leading-none">
                  Secure <span className="text-zinc-700">Vault.</span>
                </h1>
                <p className="text-zinc-500 font-mono text-center text-[10px] md:text-xs uppercase tracking-[0.4em] mb-12">
                  Client-Side Sovereignty Enabled
                </p>

                <FileVault onUploadComplete={(url) => setShareUrl(url)} />
              </motion.div>
            ) : (
              <motion.div
                key="result-state"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", damping: 20 }}
              >
                <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-center mb-4 leading-none">
                  Access <span className="text-blue-500">Locked.</span>
                </h1>
                <p className="text-zinc-500 font-mono text-center text-[10px] md:text-xs uppercase tracking-[0.4em] mb-12">
                  Key Fragmented in URL Hash
                </p>

                <ShareResult url={shareUrl} onReset={() => setShareUrl(null)} />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="mt-20 md:mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-12">
            {[
              { label: "Algorithm", value: "AES-256-GCM" },
              { label: "Protocol", value: "WASM_CYPHER_V1" },
              { label: "Infrastructure", value: "EDGE_BLOB" },
              { label: "Security", value: "ZERO_KNOWLEDGE" },
            ].map((item, i) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                key={i}
                className="space-y-2"
              >
                <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.3em]">
                  {item.label}
                </p>
                <p className="text-[10px] md:text-[11px] font-mono text-zinc-300 font-bold tracking-wider">
                  {item.value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-250 h-100 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-75 h-75 bg-blue-500/2 blur-[100px] rounded-full pointer-events-none" />
    </div>
  );
}
