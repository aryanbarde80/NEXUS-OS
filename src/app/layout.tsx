import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NEXUS OS - The Ultimate Open Source Digital Creation Ecosystem",
  description:
    "A revolutionary open-source platform combining project management, AI orchestration, marketplace, Web3, and collaborative tools into a unified ecosystem.",
  keywords: [
    "nexus os",
    "open source",
    "project management",
    "AI",
    "marketplace",
    "web3",
    "dao",
    "collaboration",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
