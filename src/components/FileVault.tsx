"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, File, X, Lock, Zap, ShieldCheck, Cpu } from "lucide-react";

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
    <div className="w-full max-w-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group"
      >
        <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative bg-zinc-950 border rounded-2xl p-8 transition-all duration-300 shadow-2xl ${
            dragActive ? "border-blue-500 scale-[1.02]" : "border-white/10"
          } ${file ? "border-blue-500/50" : ""}`}
        >
          <AnimatePresence mode="wait">
            {!file ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-white/5 rounded-xl hover:bg-white/2 transition-colors cursor-pointer relative"
              >
                <div className="relative mb-6">
                  <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-xl group-hover:bg-blue-500/30 transition-colors"></div>
                  <Upload
                    className="relative text-zinc-400 group-hover:text-blue-400 transition-colors"
                    size={40}
                  />
                </div>

                <h3 className="text-white font-mono text-xs uppercase tracking-[0.3em] mb-2">
                  Drop Encrypted Payload
                </h3>
                <p className="text-zinc-500 text-[10px] font-mono tracking-widest uppercase">
                  Zero Knowledge Infrastructure
                </p>

                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </motion.div>
            ) : (
              <motion.div
                key="file-selected"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between p-5 bg-zinc-900/50 border border-white/5 rounded-xl backdrop-blur-md">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                      <File className="text-blue-500" size={24} />
                    </div>
                    <div>
                      <p className="text-white text-sm font-mono font-medium truncate max-w-50">
                        {file.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-zinc-500 text-[10px] font-mono">
                          {(file.size / 1024).toFixed(2)} KB
                        </span>
                        <span className="text-zinc-700 text-[10px]">•</span>
                        <span className="text-emerald-500/80 text-[9px] font-mono font-bold uppercase tracking-tighter">
                          Verified
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setFile(null)}
                    className="p-2 text-zinc-500 hover:text-white hover:bg-white/5 rounded-full transition-all"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Technical Specs Rows */}
                <div className="grid grid-cols-2 gap-3 pb-2">
                  <div className="p-3 bg-white/2 border border-white/5 rounded-lg flex items-center gap-3">
                    <ShieldCheck size={14} className="text-zinc-500" />
                    <span className="text-[9px] font-mono text-zinc-400 uppercase">
                      AES-256-GCM
                    </span>
                  </div>
                  <div className="p-3 bg-white/2 border border-white/5 rounded-lg flex items-center gap-3">
                    <Cpu size={14} className="text-zinc-500" />
                    <span className="text-[9px] font-mono text-zinc-400 uppercase">
                      Rust Engine
                    </span>
                  </div>
                </div>

                {/* Primary Action Button */}
                <button
                  onClick={handleEncrypt}
                  disabled={isEncrypting}
                  className="w-full relative group/btn h-14 bg-white text-black font-mono text-xs font-bold tracking-[0.2em] uppercase transition-all rounded-lg overflow-hidden active:scale-[0.98]"
                >
                  <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>

                  <div className="relative flex items-center justify-center gap-3 group-hover/btn:text-white transition-colors">
                    {isEncrypting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            repeat: Infinity,
                            duration: 1,
                            ease: "linear",
                          }}
                        >
                          <Zap size={16} className="text-yellow-400" />
                        </motion.div>
                        <span>Sealing Vault...</span>
                      </>
                    ) : (
                      <>
                        <Lock size={16} />
                        <span>Encrypt & Vanish</span>
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
