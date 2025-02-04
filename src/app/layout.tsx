import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { Header } from "./_components/Header";
import { Footer } from "./_components/Footer";
import "./globals.css";

const notSansJp = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "麹帳",
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
        className={`${notSansJp.className} antialiased text-dark_brown flex flex-col min-h-screen`}
      >
        <Header />
        <div className="flex-grow pt-[70px]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
