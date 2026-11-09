import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const noto = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
  variable: "--font-noto",
});

export const metadata: Metadata = {
  title: "paizaラーニング UX改善プロトタイプ｜登録なしでプログラミング体験",
  description:
    "アカウントを作る前に、まずプログラミングの楽しさを体験する。ゲームとクイズで学べる学習導線の提案プロトタイプです。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={noto.variable}>
      <body className="flex min-h-screen flex-col bg-paiza-bg font-sans text-paiza-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2"
        >
          本文へスキップ
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
