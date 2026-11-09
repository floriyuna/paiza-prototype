"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Menu,
  X,
  Gamepad2,
  Search,
  BookOpen,
  Compass,
  Code2,
  CheckSquare,
  HelpCircle,
  Sparkles,
  ChevronRight,
  User,
} from "lucide-react";
import { useGuest } from "@/lib/storage";
import { ALL_QUESTIONS } from "@/lib/questions";

const GLOBAL_SERVICES = [
  { name: "転職・キャリア", href: "#", current: false },
  { name: "新卒就活", href: "#", current: false },
  { name: "ラーニング", href: "/", current: true },
  { name: "スキルチェック", href: "#", current: false },
  { name: "ゲーム・マンガ", href: "#", current: false },
  { name: "未経験転職", href: "#", current: false },
];

const MAIN_NAV = [
  { label: "講座一覧", href: "/courses", icon: BookOpen },
  { label: "学習パス", href: "/courses#paths", icon: Compass },
  { label: "問題集", href: "/learn", icon: Code2 },
  { label: "4択課題", href: "/learn?type=quiz", icon: CheckSquare },
  { label: "料金プラン", href: "/courses#pricing", icon: HelpCircle },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { state, hydrated } = useGuest();
  const clearedCount = Object.keys(state.cleared).length;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      {/* 1. 最上部 paiza共通グローバルバー（ダークネイビー） */}
      <div className="bg-[#1f2937] text-xs text-slate-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 h-9">
          {/* サービス切り替えタブ */}
          <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar">
            <Link
              href="/"
              className="mr-3 font-extrabold tracking-tight text-white flex items-center gap-1 hover:text-white"
            >
              <span className="text-[#00A3DA] text-base font-black">paiza</span>
            </Link>

            <nav aria-label="paizaサービス一覧" className="hidden md:flex items-center space-x-1">
              {GLOBAL_SERVICES.map((s) => (
                <span
                  key={s.name}
                  aria-current={s.current ? "page" : undefined}
                  className={`px-2.5 py-1 text-xs rounded transition-colors ${
                    s.current
                      ? "bg-[#00A3DA] font-bold text-white shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
                  }`}
                >
                  {s.name}
                </span>
              ))}
            </nav>
          </div>

          {/* 右側：ログイン・アカウント導線 */}
          <div className="flex items-center space-x-3 text-xs shrink-0">
            {hydrated && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ゲスト受講中（進捗: {clearedCount}/{ALL_QUESTIONS.length}）
              </span>
            )}
            <Link
              href="/signup"
              className="text-slate-300 hover:text-white transition-colors"
            >
              ログイン
            </Link>
            <Link
              href="/signup"
              className="rounded bg-[#FF8800] hover:bg-[#e67a00] text-white px-2.5 py-1 font-bold text-[11px] transition-colors shadow-sm"
            >
              無料会員登録
            </Link>
          </div>
        </div>
      </div>

      {/* 2. paizaラーニング専用 メインヘッダー（ホワイト背景） */}
      <div className="bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 gap-4">
          {/* ロゴ + キャッチコピー */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex items-baseline">
                <span className="text-2xl font-black text-[#00A3DA] tracking-tight group-hover:opacity-90">
                  paiza
                </span>
                <span className="ml-1 text-lg font-bold text-slate-800 tracking-tight">
                  ラーニング
                </span>
              </div>
              <span className="hidden xl:inline-block ml-2 pl-3 border-l border-slate-300 text-[11px] text-slate-500 font-medium">
                動画で学ぶプログラミング学習
              </span>
            </Link>
          </div>

          {/* 検索バー（paizaラーニング公式風） */}
          <div className="hidden lg:flex items-center flex-1 max-w-xs mx-2">
            <div className="relative w-full">
              <input
                type="text"
                readOnly
                placeholder="講座・言語を検索（例: Python）"
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200/70 border border-slate-200 rounded-full text-slate-600 focus:outline-none transition cursor-pointer"
                onClick={() => {
                  window.location.href = "/courses";
                }}
              />
              <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
            </div>
          </div>

          {/* メインナビゲーション */}
          <nav aria-label="ラーニング主要ナビゲーション" className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {MAIN_NAV.map((n) => {
              const active = pathname === n.href;
              const Icon = n.icon;
              return (
                <Link
                  key={n.label}
                  href={n.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-colors ${
                    active
                      ? "text-[#00A3DA] bg-[#E6F6FC]"
                      : "text-slate-700 hover:text-[#00A3DA] hover:bg-slate-50"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {n.label}
                </Link>
              );
            })}
          </nav>

          {/* 新しい学習体験へのハイライトボタン（UX改善の目玉） */}
          <div className="flex items-center gap-2">
            <Link
              href="/survey"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#FF8800] to-[#ff9d2e] px-4 py-2 text-xs md:text-sm font-black text-white hover:brightness-105 shadow-md shadow-orange-500/20 active:scale-95 transition-all"
            >
              <Gamepad2 className="h-4 w-4 shrink-0" aria-hidden />
              <span>登録なしで体験する</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>

            {/* モバイルハンバーガーメニュー */}
            <button
              type="button"
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
              aria-label={open ? "メニューを閉じる" : "メニューを開く"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
            </button>
          </div>
        </div>

        {/* モバイルナビゲーション */}
        {open && (
          <nav
            id="mobile-nav"
            aria-label="モバイルメニュー"
            className="border-t border-slate-200 bg-white px-4 py-3 md:hidden shadow-lg"
          >
            <div className="mb-3">
              <Link
                href="/survey"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 w-full rounded-lg bg-[#FF8800] px-4 py-3 text-center text-sm font-black text-white shadow-md"
              >
                <Gamepad2 className="h-5 w-5" />
                登録なしで体験する（約3分）
              </Link>
            </div>
            <ul className="space-y-1">
              {MAIN_NAV.map((n) => {
                const Icon = n.icon;
                return (
                  <li key={n.label}>
                    <Link
                      href={n.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-100"
                    >
                      <Icon className="h-4 w-4 text-[#00A3DA]" />
                      {n.label}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-2 border-t border-slate-100">
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold text-slate-500 hover:bg-slate-50"
                >
                  <User className="h-3.5 w-3.5" />
                  会員登録・ログイン（任意）
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
