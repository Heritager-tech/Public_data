import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EDM - Consulting | Business Architecture & Enterprise Modeling",
  description: "Бизнес-архитектура и моделирование предприятия. Стратегическое моделирование, процессная оптимизация и технологическая трансформация.",
  keywords: ["EDM Consulting", "business architecture", "enterprise modeling", "BPMN", "бизнес-архитектура"],
  authors: [{ name: "EDM Consulting" }],
  icons: {
    icon: "/tree-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
