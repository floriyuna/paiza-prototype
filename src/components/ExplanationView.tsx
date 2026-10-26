import Link from "next/link";
import { BookOpen, Info, PlayCircle } from "lucide-react";
import CodeBlock from "./CodeBlock";
import GameStage from "./GameStage";
import TraceView from "./TraceView";
import { getCourse } from "@/lib/courses";
import type { Question } from "@/lib/types";

/** 解説画面。操作ボタンは children として親から受け取る */
export default function ExplanationView({ question: q, children }: { question: Question; children: React.ReactNode }) {
  const course = getCourse(q.explanation.course.slug);

  return (
    <article className="space-y-5" aria-labelledby="explain-title">
      <header className="rounded-card bg-white p-4 shadow-card">
        <p className="text-xs font-black text-emerald-600">解説</p>
        <h2 id="explain-title" className="text-lg font-black md:text-xl">
          {q.kind === "bug" ? "どうしてバグが起きたの？" : "どうしてこの答えになるの？"}
        </h2>
        <p className="mt-1 text-sm text-paiza-sub">{q.title}</p>
      </header>

      {q.kind === "bug" ? (
        <section aria-label="修正前と修正後の比較" className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="text-sm font-black text-paiza-ng">修正前（バグあり）</h3>
            <CodeBlock lines={q.code} highlight={q.fixIndex} tone="bug" />
            <GameStage key="before" sim={q.buggySim} compact />
            <p className="rounded bg-red-50 p-2 text-sm font-bold text-red-700">{q.explanation.resultBefore}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-black text-paiza-ok">修正後（正しい動き）</h3>
            <CodeBlock
              lines={q.code.map((l, i) => (i === q.fixIndex ? (q.options.find((o) => o.correct)?.line ?? l) : l))}
              highlight={q.fixIndex}
              tone="fixed"
            />
            <GameStage key="after" sim={q.options.find((o) => o.correct)?.sim ?? q.buggySim} compact />
            <p className="rounded bg-emerald-50 p-2 text-sm font-bold text-emerald-700">{q.explanation.resultAfter}</p>
          </div>
        </section>
      ) : (
        <>
          <section aria-label="実行結果" className="rounded-card bg-white p-4 shadow-card">
            <p className="text-sm">
              正解は <strong className="font-mono text-lg text-emerald-600">{q.output}</strong> でした。コードを1行ずつ動かして、変数の中身が変わっていくようすを見てみよう。
            </p>
          </section>
          <TraceView code={q.code} steps={q.trace} />
        </>
      )}

      <section aria-label="理由" className="rounded-card bg-white p-4 shadow-card">
        <h3 className="mb-2 text-sm font-black text-paiza-blue">理由</h3>
        <p className="leading-relaxed">{q.explanation.why}</p>
      </section>

      <section aria-label="関連するプログラミング知識" className="rounded-card bg-white p-4 shadow-card">
        <h3 className="mb-2 flex items-center gap-1.5 text-sm font-black text-paiza-blue">
          <BookOpen className="h-4 w-4" aria-hidden />
          おぼえておこう
        </h3>
        <ul className="list-disc space-y-1.5 pl-5 leading-relaxed">
          {q.explanation.knowledge.map((k) => (
            <li key={k}>{k}</li>
          ))}
        </ul>
      </section>

      {course && (
        <section aria-label="関連講座" className="rounded-card border border-paiza-line bg-white p-4 shadow-card">
          <p className="mb-1 flex items-center gap-1.5 text-xs text-paiza-sub">
            <Info className="h-3.5 w-3.5" aria-hidden />
            関連講座（デモ用のダミー教材です。実際のpaizaラーニングとは未連携）
          </p>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-black">{course.title}</p>
              <p className="text-sm text-paiza-sub">動画：{q.explanation.course.videoTitle}</p>
            </div>
            <Link
              href={`/courses/${course.slug}`}
              className="inline-flex items-center gap-2 rounded-full border-2 border-paiza-blue px-4 py-2 text-sm font-black text-paiza-blue-dark hover:bg-paiza-blue-soft"
            >
              <PlayCircle className="h-4 w-4" aria-hidden />
              この仕組みを動画で学ぶ
            </Link>
          </div>
        </section>
      )}

      <div className="flex flex-wrap items-center gap-3 pt-1">{children}</div>
    </article>
  );
}
