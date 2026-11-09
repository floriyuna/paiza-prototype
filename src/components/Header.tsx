"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Menu,
  X,
  Search,
  BookOpen,
  Compass,
  Code2,
  CheckSquare,
  HelpCircle,
  Play,
  User,
  LogIn,
  Gamepad2,
} from "lucide-react";
import { useGuest } from "@/lib/storage";
import { ALL_QUESTIONS } from "@/lib/questions";

/** 本家paizaの全サービス一覧 */
const GLOBAL_SERVICES = [
  { name: "転職・キャリア", href: "#", current: false },
  { name: "未経験転職", href: "#", current: false },
  { name: "新卒就活", href: "#", current: false },
  { name: "ラーニング・研修", href: "/", current: true },
  { name: "スキルチェック", href: "#", current: false },
  { name: "ゲーム・マンガ", href: "#", current: false },
  { name: "メディア", href: "#", current: false },
];

/** ラーニング配下のナビゲーション */
const LEARNING_NAV = [
  { label: "ラーニングトップ", href: "/" },
  { label: "講座一覧", href: "/courses" },
  { label: "学習パス一覧", href: "/courses#paths" },
  { label: "問題集", href: "/learn" },
  { label: "4択課題", href: "/learn?type=quiz" },
  { label: "プラン一覧", href: "/courses#pricing" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { state, hydrated } = useGuest();
  const clearedCount = Object.keys(state.cleared).length;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#ededed] shadow-xs">
      {/* 1. 本家 paiza グローバルヘッダー (高さ約64px, 白背景) */}
      <div className="border-b border-[#ededed] bg-white">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-4 h-16">
          {/* 左：paiza ロゴ + サービス切り替えタブ */}
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              {/* paiza 公式ロゴ表現 */}
              <div className="flex items-baseline font-black tracking-tighter text-[#333333]">
                <span className="text-2xl text-[#0d6bd3] font-black">paiza</span>
                <span className="ml-1 text-sm font-bold text-[#6e7687]">ラーニング</span>
              </div>
            </Link>

            {/* 本家サービス切り替え（PC） */}
            <nav aria-label="paiza主要サービス" className="hidden xl:flex items-center space-x-1">
              {GLOBAL_SERVICES.map((s) => (
                <span
                  key={s.name}
                  aria-current={s.current ? "page" : undefined}
                  className={`relative px-3 py-4 text-xs font-bold transition-colors cursor-pointer select-none ${
                    s.current
                      ? "text-[#0d6bd3] border-b-2 border-[#0d6bd3]"
                      : "text-[#6e7687] hover:text-[#333333]"
                  }`}
                >
                  {s.name}
                </span>
              ))}
            </nav>
          </div>

          {/* 右：本家アカウントアクション ＆ 体験CTA */}
          <div className="flex items-center space-x-3 text-xs shrink-0">
            {hydrated && clearedCount > 0 && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#f6faff] border border-[#d2e3fc] text-[#0d6bd3] text-[11px] font-bold">
                <span className="h-2 w-2 rounded-full bg-[#0d6bd3] animate-pulse" />
                ゲスト進捗: {clearedCount}/{ALL_QUESTIONS.length}
              </span>
            )}

            {/* 今回の新しい学習体験CTA（本家スタイル） */}
            <Link
              href="/survey"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-[4px] bg-[#ff8800] hover:bg-[#e67a00] text-white px-3.5 py-2 font-bold text-xs shadow-xs transition"
            >
              <Gamepad2 className="h-4 w-4" />
              登録なしで体験する
            </Link>

            <Link
              href="/signup"
              className="text-[#6e7687] hover:text-[#333333] font-bold px-2 py-1.5 hidden md:inline-block"
            >
              ログイン
            </Link>

            <Link
              href="/signup"
              className="rounded-[4px] bg-[#0d6bd3] hover:bg-[#0b58ad] text-white px-3.5 py-2 font-bold text-xs shadow-xs transition"
            >
              無料会員登録
            </Link>

            {/* スマホ用メニューボタン */}
            <button
              type="button"
              className="p-2 text-[#6e7687] hover:text-[#333333] xl:hidden"
              onClick={() => setOpen(!open)}
              aria-label="メニュー"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 2. ラーニング専用サブナビゲーションバー（本家の講座一覧・学習パスなどのタブ） */}
      <div className="bg-[#fafbfc] border-b border-[#ededed]">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-4 h-11 text-xs">
          <nav className="flex items-center space-x-1 md:space-x-3 overflow-x-auto no-scrollbar">
            {LEARNING_NAV.map((n) => {
              const active = pathname === n.href;
              return (
                <Link
                  key={n.label}
                  href={n.href}
                  className={`px-2.5 py-1.5 rounded-[4px] font-bold transition whitespace-nowrap ${
                    active
                      ? "text-[#0d6bd3] bg-[#eef5fc]"
                      : "text-[#555555] hover:text-[#0d6bd3] hover:bg-white"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          {/* 検索バー（本家仕様） */}
          <div className="hidden lg:flex items-center w-56">
            <div className="relative w-full">
              <input
                type="text"
                readOnly
                placeholder="講座を検索..."
                onClick={() => {
                  window.location.href = "/courses";
                }}
                className="w-full bg-white border border-[#d7e0e2] rounded-[4px] py-1 pl-7 pr-2 text-xs text-[#333] placeholder-[#999] cursor-pointer"
              />
              <Search className="absolute left-2 top-1.5 h-3.5 w-3.5 text-[#999]" />
            </div>
          </div>
        </div>
      </div>

      {/* モバイルメニュー */}
      {open && (
        <div className="border-b border-[#ededed] bg-white px-4 py-3 xl:hidden text-xs">
          <div className="mb-3">
            <Link
              href="/survey"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 w-full rounded-[4px] bg-[#ff8800] p-3 text-white font-bold"
            >
              <Gamepad2 className="h-4 w-4" />
              登録なしでプログラミング体験する（約3分）
            </Link>
          </div>
          <p className="font-bold text-[#6e7687] mb-2 text-[11px]">paizaラーニングメニュー</p>
          <ul className="space-y-1">
            {LEARNING_NAV.map((n) => (
              <li key={n.label}>
                <Link
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 px-2 text-[#333] hover:bg-slate-50 font-bold rounded"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
