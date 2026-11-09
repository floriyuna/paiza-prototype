"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Gift,
  Info,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function SignupPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-[#F4F7F9] py-8 md:py-14">
      <div className="mx-auto max-w-xl px-4">
        {/* プロトタイプの注記 */}
        <div className="mb-6 flex items-start gap-3 rounded-2xl bg-amber-50 p-4 border border-amber-200 text-amber-900 text-xs leading-relaxed shadow-sm">
          <Info className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
          <div>
            <strong className="font-bold">UX改善提案プロトタイプのデモ画面です。</strong>
            <p className="mt-0.5 text-amber-800">
              実際の通信やアカウント登録は行われません。登録せずともすべての体験問題をプレイできます。
            </p>
          </div>
        </div>

        {!submitted ? (
          <section
            aria-labelledby="signup-title"
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
          >
            {/* ヘッダー */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-1 mb-1">
                <span className="text-2xl font-black text-[#00A3DA]">paiza</span>
                <span className="text-lg font-bold text-slate-800">アカウント登録</span>
              </div>
              <h1 id="signup-title" className="text-lg font-black text-slate-900">
                アカウントを作成して本格的に学ぶ
              </h1>
              <p className="mt-1 text-xs text-slate-500">
                学習履歴の保存や、全120講座を受講したいときに
              </p>
            </div>

            {/* paiza会員特典 */}
            <div className="mb-6 rounded-2xl bg-[#E6F6FC] p-4 border border-sky-100">
              <p className="text-xs font-bold text-[#00A3DA] mb-2 flex items-center gap-1.5">
                <Gift className="h-4 w-4" />
                無料会員登録でできること
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#00A3DA] shrink-0" />
                  <span>学習進捗や回答履歴のクラウド自動保存</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#00A3DA] shrink-0" />
                  <span>Python, Java, Webなど全120講座が受講可能</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#00A3DA] shrink-0" />
                  <span>スキルチェックでエンジニアランク（S〜E）測定</span>
                </li>
              </ul>
            </div>

            {/* 登録フォーム */}
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <div>
                <label htmlFor="email" className="mb-1 block text-xs font-bold text-slate-700">
                  メールアドレス
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="off"
                    placeholder="example@paiza.jp"
                    className="w-full rounded-xl border border-slate-300 pl-9 pr-3 py-2.5 text-xs focus:border-[#00A3DA] focus:ring-1 focus:ring-[#00A3DA] outline-none"
                  />
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="mb-1 block text-xs font-bold text-slate-700">
                  パスワード（8文字以上）
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    required
                    minLength={8}
                    autoComplete="new-password"
                    placeholder="半角英数字8文字以上"
                    className="w-full rounded-xl border border-slate-300 pl-9 pr-3 py-2.5 text-xs focus:border-[#00A3DA] focus:ring-1 focus:ring-[#00A3DA] outline-none"
                  />
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#00A3DA] hover:bg-[#0085B3] py-3 text-sm font-black text-white shadow-md shadow-sky-500/20 transition active:scale-95"
              >
                無料で会員登録する（デモ）
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="h-3.5 w-3.5 text-slate-400" />
              <span>登録しなくてもゲストとして学習を継続できます</span>
            </div>
          </section>
        ) : (
          <section
            aria-labelledby="done-title"
            className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h1 id="done-title" className="text-xl font-black text-slate-900 mb-2">
              デモ登録完了のシミュレーション
            </h1>
            <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto mb-6">
              実際のpaizaラーニングでは、ここでアカウントが作成され、ゲスト時の回答記録がアカウントに同期されます。
              このプロトタイプでは何も送信・保存されていません。
            </p>
          </section>
        )}

        <div className="mt-6 text-center">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#00A3DA] bg-white px-6 py-3 text-xs md:text-sm font-black text-[#00A3DA] hover:bg-[#E6F6FC] transition shadow-xs"
          >
            <ArrowLeft className="h-4 w-4" />
            登録せずにゲストとして学習をつづける
          </Link>
        </div>
      </div>
    </div>
  );
}
