"use client";

import { useState } from "react";
import Link from "next/link";
import { resetGuest } from "@/lib/storage";
import { RefreshCw, ExternalLink, ShieldCheck } from "lucide-react";

export default function Footer() {
  const [resetMsg, setResetMsg] = useState(false);

  const handleReset = () => {
    resetGuest();
    setResetMsg(true);
    setTimeout(() => setResetMsg(false), 2500);
    window.location.reload();
  };

  return (
    <footer className="mt-20 bg-[#1e293b] text-slate-300 text-xs border-t-4 border-[#00A3DA]">
      {/* サービス紹介・サイトマップ */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* ブランド */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-3">
              <span className="text-2xl font-black text-white">paiza</span>
              <span className="ml-1 text-base font-bold text-[#00A3DA]">ラーニング</span>
            </Link>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
              1動画3分で学べるプログラミング学習サービス。環境構築不要、ブラウザだけでコードを実行しながら学べます。
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 bg-slate-800/80 p-2.5 rounded border border-slate-700">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>本サイトはUX改善提案プロトタイプです</span>
            </div>
          </div>

          {/* ラーニングメニュー */}
          <div>
            <p className="font-bold text-white mb-3 text-sm">paizaラーニング</p>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/courses" className="hover:text-white transition">
                  講座一覧
                </Link>
              </li>
              <li>
                <Link href="/courses#paths" className="hover:text-white transition">
                  学習パス一覧
                </Link>
              </li>
              <li>
                <Link href="/learn" className="hover:text-white transition">
                  問題集・練習問題
                </Link>
              </li>
              <li>
                <Link href="/learn?type=quiz" className="hover:text-white transition">
                  4択プログラミング課題
                </Link>
              </li>
              <li>
                <Link href="/survey" className="text-[#FF8800] hover:underline font-bold transition">
                  登録なし無料体験
                </Link>
              </li>
            </ul>
          </div>

          {/* 人気の学習言語 */}
          <div>
            <p className="font-bold text-white mb-3 text-sm">人気のプログラミング言語</p>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/courses/python-intro" className="hover:text-white transition">
                  Python入門編
                </Link>
              </li>
              <li>
                <span className="cursor-default hover:text-white">Java入門編</span>
              </li>
              <li>
                <span className="cursor-default hover:text-white">JavaScript入門編</span>
              </li>
              <li>
                <span className="cursor-default hover:text-white">C#入門編 / Ruby入門編</span>
              </li>
              <li>
                <span className="cursor-default hover:text-white">SQL入門編 / Webデザイン</span>
              </li>
            </ul>
          </div>

          {/* paizaサービス */}
          <div>
            <p className="font-bold text-white mb-3 text-sm">paizaサービス群</p>
            <ul className="space-y-2 text-slate-400">
              <li>
                <span className="cursor-default hover:text-white">paiza転職・キャリア</span>
              </li>
              <li>
                <span className="cursor-default hover:text-white">paiza新卒（学生向け）</span>
              </li>
              <li>
                <span className="cursor-default hover:text-white">スキルチェック（S〜Eランク）</span>
              </li>
              <li>
                <span className="cursor-default hover:text-white">プログラミングゲーム</span>
              </li>
              <li>
                <span className="cursor-default hover:text-white">paiza開発日誌（ブログ）</span>
              </li>
            </ul>
          </div>

          {/* サポート・プロトタイプ操作 */}
          <div>
            <p className="font-bold text-white mb-3 text-sm">プロトタイプ操作</p>
            <p className="text-[11px] text-slate-400 mb-3">
              ゲストの進捗データ（localStorage）をリセットして、最初から体験をやり直せます。
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 text-xs font-bold transition"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              {resetMsg ? "リセット完了！" : "体験データをリセット"}
            </button>
          </div>
        </div>

        {/* 下部コピーライト & 注記 */}
        <div className="mt-10 pt-6 border-t border-slate-700/80 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>
            ※ このWebアプリはpaizaラーニングのUX改善を目的とした大学生による<strong>研究・提案プロトタイプ</strong>です。
            公式のpaiza株式会社とは連携していません。
          </p>
          <p className="shrink-0 font-mono text-slate-500">
            © 2026 paiza Learning UX Prototype Project
          </p>
        </div>
      </div>
    </footer>
  );
}
