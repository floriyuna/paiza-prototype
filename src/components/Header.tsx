"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Gamepad2 } from "lucide-react";
import { useGuest } from "@/lib/storage";
import { ALL_QUESTIONS } from "@/lib/questions";

const SERVICES = [
  "転職・キャリア",
  "未経験転職",
  "新卒就活",
  "ラーニング・研修",
  "スキルチェック",
  "ゲーム・マンガ",
  "メディア",
];
const CURRENT_SERVICE = "ラーニング・研修";

const NAV = [
  { label: "ラーニングトップ", href: "/" },
  { label: "講座一覧", href: "/courses" },
  { label: "学習パス一覧", href: "/courses#paths" },
  { label: "問題集", href: "/learn" },
  { label: "4択課題", href: "/learn?type=quiz" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { state, hydrated } = useGuest();
  const clearedCount = Object.keys(state.cleared).length;

  return (
    <header className="sticky top-0 z-40 shadow-card">
      {/* サービス切り替え（デモ用：他サービスはプロトタイプ範囲外） */}
      <div className="hidden bg-[#2b3a45] text-xs text-white/80 md:block">
        <div className="mx-auto flex max-w-6xl items-center gap-1 px-4">
          <span className="mr-3 py-1.5 font-bold text-white">paiza</span>
          <ul className="flex flex-wrap" aria-label="paizaのサービス">
            {SERVICES.map((s) => (
              <li key={s}>
                <span
                  title={s === CURRENT_SERVICE ? "現在のサービス" : "プロトタイプでは未実装です"}
                  aria-current={s === CURRENT_SERVICE ? "page" : undefined}
                  className={`block px-3 py-1.5 ${
                    s === CURRENT_SERVICE
                      ? "bg-paiza-blue font-bold text-white"
                      : "cursor-default text-white/60"
                  }`}
                >
                  {s}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* メインナビ */}
      <div className="bg-paiza-blue text-white">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5">
          <Link href="/" className="flex items-center gap-2 text-lg font-black tracking-tight">
            <span className="rounded bg-white px-1.5 py-0.5 text-sm text-paiza-blue">paiza</span>
            ラーニング
          </Link>

          <nav aria-label="メインナビゲーション" className="ml-4 hidden flex-1 lg:block">
            <ul className="flex gap-1">
              {NAV.map((n) => {
                const active = n.href === pathname;
                return (
                  <li key={n.label}>
                    <Link
                      href={n.href}
                      className={`rounded px-3 py-2 text-sm font-bold hover:bg-white/15 ${
                        active ? "bg-white/20" : ""
                      }`}
                    >
                      {n.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/survey"
              className="hidden items-center gap-1.5 rounded-full bg-paiza-orange px-4 py-1.5 text-sm font-black text-paiza-ink hover:bg-paiza-orange-dark sm:inline-flex"
            >
              <Gamepad2 className="h-4 w-4" aria-hidden />
              登録なしで体験
              {hydrated && clearedCount > 0 && (
                <span className="rounded-full bg-white px-1.5 text-xs">
                  {clearedCount}/{ALL_QUESTIONS.length}
                </span>
              )}
            </Link>
            {/* 登録導線は目立たせすぎない（任意） */}
            <Link
              href="/signup"
              className="hidden rounded border border-white/60 px-3 py-1.5 text-xs font-bold hover:bg-white/15 md:inline-block"
            >
              会員登録（任意）
            </Link>
            <button
              type="button"
              className="rounded p-2 hover:bg-white/15 lg:hidden"
              aria-label={open ? "メニューを閉じる" : "メニューを開く"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
            </button>
          </div>
        </div>

        {open && (
          <nav id="mobile-nav" aria-label="モバイルメニュー" className="border-t border-white/20 bg-paiza-blue-dark lg:hidden">
            <ul className="mx-auto max-w-6xl px-4 py-2">
              <li>
                <Link
                  href="/survey"
                  onClick={() => setOpen(false)}
                  className="my-1 block rounded bg-paiza-orange px-3 py-3 text-center font-black text-paiza-ink"
                >
                  登録なしで体験する
                </Link>
              </li>
              {NAV.map((n) => (
                <li key={n.label}>
                  <Link href={n.href} onClick={() => setOpen(false)} className="block rounded px-3 py-3 text-sm font-bold hover:bg-white/10">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/signup" onClick={() => setOpen(false)} className="block rounded px-3 py-3 text-xs hover:bg-white/10">
                  会員登録（任意）
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
