"use client";

import React, { useState, useCallback } from "react";
import { Upload, File, X, Lock, Zap } from "lucide-react";

interface FileVaultProps {
  onUploadComplete: (url: string) => void;
}

export function FileVault({ onUploadComplete }: FileVaultProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isEncrypting, setIsEncrypting] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  }, []);


  const handleEncrypt = async () => {
    if (!file) return;
    setIsEncrypting(true);

    try {
      const wasm = await import("../../wasm-cipher/pkg");      await wasm.default();

      const fileBuffer = await file.arrayBuffer();
      const fileData = new Uint8Array(fileBuffer);
      const result = wasm.encrypt_file(fileData);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: result.ciphertext,
        headers: {
          "x-file-name": file.name,
        },
      });

if (!response.ok) {
  const errorText = await response.text();
  console.error("Server responded with:", errorText);
  throw new Error("Upload failed");
}
      const blobData = await response.json();

      const toHex = (bytes: Uint8Array) =>
        Array.from(bytes)
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");
      const keyHex = toHex(result.key);
      const nonceHex = toHex(result.nonce);

      const secureUrl = `${window.location.origin}/v/${blobData.id}#${keyHex}${nonceHex}`;

      onUploadComplete(secureUrl);
    } catch (err) {
      console.error("Vault Error:", err);
      alert("Encryption or Upload failed. Check console.");
    } finally {
      setIsEncrypting(false);
    }
  };



  return (
    <div className="w-full max-w-2xl mx-auto group">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-12 transition-all duration-500 
          ${
            file
              ? "border-blue-500/50 bg-blue-500/5"
              : "border-white/10 bg-zinc-900/20 hover:border-blue-500/30 hover:bg-zinc-900/40"
          }`}
      >
        {!file ? (
          <div className="flex flex-col items-center justify-center text-center cursor-pointer">
            <div className="p-4 rounded-full bg-zinc-900 border border-white/5 mb-4">
              <Upload
                className="text-zinc-500 group-hover:text-blue-400 transition-colors"
                size={32}
              />
            </div>
            <p className="text-white font-mono text-sm uppercase tracking-widest mb-1">
              Drop Payload
            </p>
            <p className="text-zinc-600 text-[10px] font-mono tracking-tighter uppercase">
              AES_256_GCM_READY
            </p>
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-black/60 border border-white/5 rounded-xl">
              <div className="flex items-center gap-4">
                <File className="text-blue-500" size={24} />
                <div className="text-left">
                  <p className="text-white text-xs font-mono truncate max-w-180px">
                    {file.name}
                  </p>
                  <p className="text-zinc-500 text-[9px] font-mono">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={() => setFile(null)}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <button
              onClick={handleEncrypt}
              disabled={isEncrypting}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 text-white font-mono text-[11px] tracking-[0.3em] uppercase transition-all flex items-center justify-center gap-3 rounded-lg overflow-hidden relative group"
            >
              {isEncrypting ? (
                <>
                  <Zap size={14} className="animate-pulse text-yellow-400" />
                  <span>Processing_WASM...</span>
                </>
              ) : (
                <>
                  <Lock size={14} />
                  <span>Encrypt & Vanish</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
