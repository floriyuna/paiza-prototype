"use client";

import { useState } from "react";
import Link from "next/link";
import { resetGuest } from "@/lib/storage";
import { RefreshCw, ShieldCheck } from "lucide-react";

export default function Footer() {
  const [resetMsg, setResetMsg] = useState(false);

  const handleReset = () => {
    resetGuest();
    setResetMsg(true);
    setTimeout(() => setResetMsg(false), 2000);
    window.location.reload();
  };

  return (
    <footer className="mt-16 bg-[#2b3a45] text-slate-300 text-xs border-t-2 border-[#0d6bd3]">
      <div className="mx-auto max-w-[1240px] px-4 py-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 mb-8">
          {/* ブランド */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-2">
              <span className="text-xl font-black text-white">paiza</span>
              <span className="ml-1 text-sm font-bold text-[#00A3DA]">ラーニング</span>
            </Link>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
              プログラミング学習サイト【paizaラーニング】。Webブラウザがあれば5秒で学習開始できます。
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 bg-slate-800 p-2 rounded">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
              <span>UX改善提案プロトタイプ</span>
            </div>
          </div>

          {/* ラーニングメニュー */}
          <div>
            <p className="font-bold text-white mb-2.5 text-xs">paizaラーニング</p>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
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
                  レベルアップ問題集
                </Link>
              </li>
              <li>
                <Link href="/learn?type=quiz" className="hover:text-white transition">
                  4択課題
                </Link>
              </li>
              <li>
                <Link href="/survey" className="text-[#ff8800] hover:underline font-bold transition">
                  登録なし無料体験
                </Link>
              </li>
            </ul>
          </div>

          {/* 人気言語 */}
          <div>
            <p className="font-bold text-white mb-2.5 text-xs">人気の言語・講座</p>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li>
                <Link href="/courses/python-intro" className="hover:text-white transition">
                  Python体験編 / 入門編
                </Link>
              </li>
              <li>
                <span className="cursor-default hover:text-white">Java体験編 / 入門編</span>
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
            <p className="font-bold text-white mb-2.5 text-xs">paizaサービス一覧</p>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
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

          {/* デモ操作 */}
          <div>
            <p className="font-bold text-white mb-2.5 text-xs">プロトタイプ操作</p>
            <p className="text-[10px] text-slate-400 mb-2">
              ゲストの回答履歴（localStorage）をリセットします。
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-[4px] bg-slate-700 hover:bg-slate-600 text-white px-2.5 py-1.5 text-[11px] font-bold transition"
            >
              <RefreshCw className="h-3 w-3" />
              {resetMsg ? "リセット完了" : "体験データをリセット"}
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-700 flex flex-col md:flex-row items-center justify-between gap-2 text-[10px] text-slate-400">
          <p>
            ※ 本サイトはpaizaラーニングのUX改善を目的とした大学生による<strong>研究・提案プロトタイプ</strong>です。
          </p>
          <p className="font-mono">Copyright Paiza, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
