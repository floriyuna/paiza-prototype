"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Info, ShieldCheck } from "lucide-react";

export default function SignupPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mx-auto max-w-lg px-4 py-8 md:py-12">
      <p className="mb-5 flex items-start gap-2 rounded-card bg-amber-50 p-3 text-sm">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden />
        <span>
          <strong>プロトタイプのデモ画面です。</strong>
          入力した内容は送信・保存されず、実際にアカウントは作成されません。
        </span>
      </p>

      {!submitted ? (
        <section aria-labelledby="signup-title" className="rounded-card bg-white p-6 shadow-card">
          <h1 id="signup-title" className="text-xl font-black">
            アカウントを作成して本格的に学ぶ
          </h1>
          <p className="mt-1 text-sm text-paiza-sub">学習履歴の保存や、発展的な講座を使いたくなったときに。</p>

          <form
            className="mt-5 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-bold">
                メールアドレス
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="off"
                placeholder="example@mail.com"
                className="w-full rounded border border-paiza-line px-3 py-2.5 focus:border-paiza-blue"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-bold">
                パスワード
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                placeholder="8文字以上"
                className="w-full rounded border border-paiza-line px-3 py-2.5 focus:border-paiza-blue"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-paiza-blue px-6 py-3 font-black text-white hover:bg-paiza-blue-dark"
            >
              登録する（デモ）
            </button>
          </form>

          <p className="mt-4 flex items-start gap-1.5 text-xs text-paiza-sub">
            <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
            登録しなくても、ゲストとして学習を続けられます。
          </p>
        </section>
      ) : (
        <section aria-labelledby="done-title" className="rounded-card bg-white p-6 text-center shadow-card">
          <h1 id="done-title" className="text-xl font-black">
            デモ画面はここまでです
          </h1>
          <p className="mt-2 text-sm text-paiza-sub">
            実際のサービスでは、ここでアカウントが作成され、これまでの学習記録が引き継がれる想定です。このプロトタイプでは何も保存されていません。
          </p>
        </section>
      )}

      <div className="mt-6 text-center">
        <Link
          href="/learn"
          className="inline-flex items-center gap-2 rounded-full border-2 border-paiza-blue bg-white px-6 py-3 font-black text-paiza-blue-dark hover:bg-paiza-blue-soft"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          登録せずに学習をつづける
        </Link>
      </div>
    </div>
  );
}
