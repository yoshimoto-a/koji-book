import type { Metadata } from "next";
import { Header } from "./_components/Header";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "koji-book",
  description: "麹を使ったレシピの共有サイトです",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-dark_brown`}
      >
        <Header />
        <div className="pt-[70px]">{children}</div>
      </body>
    </html>
  );
}
