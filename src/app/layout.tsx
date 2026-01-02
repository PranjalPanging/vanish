import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vanish",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="bg-black antialiased selection:bg-blue-500/30">
          <Navbar />
          <main className="flex flex-col items-center">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
