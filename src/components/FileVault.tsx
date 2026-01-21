"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  File,
  X,
  Lock,
  Zap,
  ShieldCheck,
  Cpu,
  ChevronRight,
} from "lucide-react";

interface FileVaultProps {
  onUploadComplete: (url: string) => void;
}

export function FileVault({ onUploadComplete }: FileVaultProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  }, []);

  const handleEncrypt = async () => {
    if (!file) return;
    setIsEncrypting(true);

    try {
      const wasm = await import("../../wasm-cipher/pkg");
      await wasm.default();

      const fileBuffer = await file.arrayBuffer();
      const fileData = new Uint8Array(fileBuffer);
      const result = wasm.encrypt_file(fileData);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: result.ciphertext,
        headers: { "x-file-name": file.name },
      });

      if (!response.ok) throw new Error("Upload failed");
      const blobData = await response.json();

      const toHex = (bytes: Uint8Array) =>
        Array.from(bytes)
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");

      const secureUrl = `${window.location.origin}/v/${blobData.id}#${toHex(result.key)}${toHex(result.nonce)}`;
      onUploadComplete(secureUrl);
    } catch (err) {
      console.error("Vault Error:", err);
      alert("Encryption or Upload failed.");
    } finally {
      setIsEncrypting(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <div className="absolute -inset-0.5 bg-blue-500/10 rounded-3xl blur-2xl pointer-events-none" />

        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative bg-zinc-900/40 backdrop-blur-xl border rounded-3xl p-8 transition-all duration-500 shadow-2xl overflow-hidden ${
            dragActive ? "border-blue-500 bg-zinc-900/60" : "border-white/5"
          }`}
        >
          <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

          <AnimatePresence mode="wait">
            {!file ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                className="relative z-10 flex flex-col items-center justify-center py-16 border border-dashed border-white/10 rounded-2xl hover:bg-white/[0.02] transition-colors cursor-pointer group"
              >
                <div className="relative mb-6">
                  <div className="absolute -inset-4 bg-blue-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Upload
                    className="relative text-zinc-500 group-hover:text-blue-400 transition-all duration-500 group-hover:-translate-y-1"
                    size={38}
                  />
                </div>

                <div className="text-center">
                  <h3 className="text-white font-mono text-xs uppercase tracking-[0.4em] mb-3">
                    Drop Payload
                  </h3>
                  <p className="text-zinc-500 text-[10px] font-mono tracking-widest uppercase flex items-center gap-2 justify-center">
                    <span className="h-px w-4 bg-zinc-800" />
                    AES_256_GCM Ready
                    <span className="h-px w-4 bg-zinc-800" />
                  </p>
                </div>

                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </motion.div>
            ) : (
              <motion.div
                key="file-selected"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 space-y-6"
              >
                <div className="flex items-center justify-between p-5 bg-black/40 border border-white/5 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                      <File className="text-blue-400" size={20} />
                    </div>
                    <div>
                      <p className="text-white text-xs font-mono font-medium truncate max-w-[180px]">
                        {file.name}
                      </p>
                      <p className="text-zinc-600 text-[10px] font-mono mt-1">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setFile(null)}
                    className="p-2 text-zinc-500 hover:text-white hover:bg-white/5 rounded-full transition-all"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="px-4 py-3 bg-white/[0.03] border border-white/5 rounded-xl flex items-center gap-3 group/meta">
                    <ShieldCheck
                      size={14}
                      className="text-zinc-500 group-hover/meta:text-emerald-500 transition-colors"
                    />
                    <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider">
                      AES-256-GCM
                    </span>
                  </div>
                  <div className="px-4 py-3 bg-white/[0.03] border border-white/5 rounded-xl flex items-center gap-3 group/meta">
                    <Cpu
                      size={14}
                      className="text-zinc-500 group-hover/meta:text-orange-500 transition-colors"
                    />
                    <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider">
                      WASM Engine
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleEncrypt}
                  disabled={isEncrypting}
                  className="w-full relative group/btn h-14 bg-white text-black font-mono text-[10px] font-bold tracking-[0.3em] uppercase transition-all rounded-xl overflow-hidden active:scale-[0.98] disabled:bg-zinc-800 disabled:text-zinc-500"
                >
                  <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[0.16, 1, 0.3, 1]" />

                  <div className="relative flex items-center justify-center gap-3 group-hover/btn:text-white transition-colors duration-300">
                    {isEncrypting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.5,
                            ease: "linear",
                          }}
                        >
                          <Zap size={14} className="text-yellow-400" />
                        </motion.div>
                        <span>Sealing...</span>
                      </>
                    ) : (
                      <>
                        <Lock size={14} />
                        <span>Initialize Protocol</span>
                        <ChevronRight
                          size={14}
                          className="opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300"
                        />
                      </>
                    )}
                  </div>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
