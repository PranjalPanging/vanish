"use client";

import {
  Check,
  Copy,
  RefreshCcw,
  ShieldCheck,
  ArrowRight,
  Lock,
} from "lucide-react";
import { useState } from "react";

export default function ShareResult({
  url,
  onReset,
}: {
  url: string;
  onReset: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setHasCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 md:p-12 rounded-3xl border border-white/5 bg-zinc-900/10 backdrop-blur-sm group hover:border-blue-500/20 transition-all">
      <div className="flex items-start justify-between mb-12">
        <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
          <Lock className="w-8 h-8 text-blue-500" />
        </div>
        <div className="text-right">
          <p className="text-[10px] font-mono text-zinc-600 tracking-widest uppercase">
            Encryption_Success
          </p>
          <p className="text-xs font-mono text-zinc-400">0xFD_SECURE_LINK</p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="relative">
          <input
            readOnly
            value={url}
            className="w-full bg-black border border-white/10 rounded-xl px-4 py-5 font-mono text-sm text-blue-400 outline-none pr-32"
          />
          <button
            onClick={copy}
            className="absolute right-2 top-2 bottom-2 px-6 bg-white text-black font-mono text-[10px] font-bold uppercase rounded-lg hover:bg-zinc-200 transition-colors"
          >
            {copied ? "COPIED" : "COPY_LINK"}
          </button>
        </div>

        {hasCopied && (
          <div className="animate-in slide-in-from-top-4 fade-in duration-700">
            <button
              onClick={onReset}
              className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold tracking-[0.3em] uppercase flex items-center justify-center gap-3 rounded-xl"
            >
              <span>Ready / Destroy Session</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
