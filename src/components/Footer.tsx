"use client";

import { useState } from "react";
import { resetGuest } from "@/lib/storage";

export default function Footer() {
  const [done, setDone] = useState(false);

  return (
    <footer className="mt-12 border-t border-paiza-line bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-paiza-sub md:flex-row md:items-center md:justify-between">
        <p>
          これは大学の課題で制作した<strong className="text-paiza-ink">UX提案プロトタイプ</strong>です。paizaラーニングの公式サイトではなく、実際の教材・アカウントとは連携していません。
        </p>
        <button
          type="button"
          onClick={() => {
            resetGuest();
            setDone(true);
          }}
          className="self-start rounded border border-paiza-line px-3 py-1.5 font-bold text-paiza-ink hover:bg-paiza-bg md:self-auto"
        >
          {done ? "リセットしました" : "デモ用：学習状況をリセット"}
        </button>
      </div>
    </footer>
  );
}
