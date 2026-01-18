# 🛡️ Vanish

**Privacy by Architecture. Speed by Rust.**

Vanish is an end-to-end encrypted (E2EE) file-sharing protocol designed for the modern web. It leverages **Rust (WebAssembly)** for high-performance, client-side encryption and **Next.js** for edge-optimized delivery.

By scrambling data in the browser before it ever hits the network, Vanish ensures that your files remain private. Even the host (Vercel) cannot access your content—only the person with the unique cryptographic link can unlock the vault.



---

## 🚀 Features

- **Zero-Knowledge Storage**: Plaintext never leaves your machine. Encryption happens entirely in the browser.
- **Rust-Powered Performance**: Uses AES-256-GCM implemented in Rust and compiled to WASM for native-speed cryptographic cycles.
- **Edge Delivery**: Built on Next.js and Vercel Blob for lightning-fast uploads and global availability.
- **No Database Required**: Metadata is orchestrated via secure URL fragments (`#`), keeping the server state-free.
- **Ephemeral by Nature**: Designed for "Vanish" logic where files exist only as long as the link is active.

---

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | Next.js (App Router), Tailwind CSS, Framer Motion |
| **Cryptography** | Rust, `wasm-bindgen`, `aes-gcm` crate |
| **Storage** | Vercel Blob Storage |
| **Runtime** | WebAssembly (WASM) |

---

## 📂 Project Structure

```text
├── app/                  # Next.js App Router (UI & API)
│   ├── api/upload/       # Secure endpoint for Vercel Blob
│   ├── share/            # Upload interface
│   └── v/[id]/           # Secure decryption gateway
├── wasm-cipher/          # Rust source code
│   ├── src/lib.rs        # AES-256-GCM Logic
│   └── pkg/              # Compiled WASM & JS bridge
├── components/           # React UI components (FileVault, etc.)
└── next.config.mjs       # WASM & Webpack configuration
```

## ⚡ Quick Start

### 1. Prerequisites
* **Rust**: [Install Rust](https://www.rust-lang.org/tools/install) (latest stable)
* **wasm-pack**: [Install wasm-pack](https://rustwasm.github.io/wasm-pack/installer/) for compiling Rust to WebAssembly.

### 2. Build the WASM Module
The Rust logic must be compiled into a WebAssembly package before the Next.js app can use it. From the project root, run:

```bash
cd wasm-cipher
wasm-pack build --target web
```

### 3. Setup Environment
Create a `.env.local` file in the root directory to connect to your Vercel Blob storage:

```env
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
```
### 4. Run the Development Server
Install dependencies and start the Next.js environment:
```bash
npm install
npm run dev
```
## 🔒 Security Protocol

Vanish implements a **Zero-Knowledge Architecture**. The server is never aware of the encryption keys or the unencrypted file contents.



### The Encryption Cycle

1.  **Entropy Generation**: A random **256-bit key** and **96-bit nonce** are generated using cryptographically secure entropy (`getrandom` with the `js` feature) directly in the browser.
2.  **WASM Transformation**: The raw file buffer is passed into the **Rust WASM module**, where it is encrypted using **AES-256-GCM**.
3.  **Ciphertext Ingestion**: The resulting encrypted `ciphertext` is sent to the `/api/upload` route and stored in Vercel Blob.
4.  **Non-Leaking URL Construction**: The `key` and `nonce` are encoded and appended to the URL as a **fragment identifier** (the portion after the `#`).

### Why Fragment Identifiers?

According to **RFC 3986**, fragment identifiers are handled strictly on the client side. When a user visits a Vanish link, the browser **does not send** the part of the URL containing the key to the server.

> **Result**: The decryption key exists only in the sender's browser and the recipient's address bar. It never touches our logs, our databases, or Vercel's infrastructure.

---

## 📜 License

This project is licensed under the **MIT License**.

### Summary
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
* **THE SOFTWARE IS PROVIDED "AS IS"**, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.

For more details, see the [LICENSE](LICENSE) file in the root of this repository.
