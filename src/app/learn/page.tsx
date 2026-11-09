import { Suspense } from "react";
import LearnClient from "@/components/LearnClient";

export const metadata = { title: "学習体験｜paizaラーニング UX改善プロトタイプ" };

export default function LearnPage() {
  return (
    <Suspense fallback={<p className="p-8 text-center text-paiza-sub">読み込み中…</p>}>
      <LearnClient />
    </Suspense>
  );
}
