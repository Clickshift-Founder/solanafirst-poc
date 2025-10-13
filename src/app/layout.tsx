// src/app/layout.tsx
import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SolanaFirst - Universal Onboarding Infrastructure | ClickShift",
  description: "Open-source SDK that enables any wallet, DEX, or protocol to safely onboard users before they lose money",
  icons: {
    icon: "/favicon.ico", // ✅ points to /public/favicon.ico
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
