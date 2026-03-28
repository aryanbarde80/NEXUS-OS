import type { Metadata } from "next";
import "./globals.css";
import { AppBootstrap } from "@/components/providers/AppBootstrap";

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
      <body className="antialiased">
        <AppBootstrap>{children}</AppBootstrap>
      </body>
    </html>
  );
}
