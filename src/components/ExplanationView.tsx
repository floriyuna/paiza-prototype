import Link from "next/link";
import { BookOpen, CheckCircle, Info, PlayCircle, Sparkles, Terminal, Video } from "lucide-react";
import CodeBlock from "./CodeBlock";
import GameStage from "./GameStage";
import Mascot from "./Mascot";
import TraceView from "./TraceView";
import { getCourse } from "@/lib/courses";
import type { Question } from "@/lib/types";

/** 解説画面。操作ボタンは children として親から受け取る */
export default function ExplanationView({ question: q, children }: { question: Question; children: React.ReactNode }) {
  const course = getCourse(q.explanation.course.slug);

  return (
    <article className="space-y-6" aria-labelledby="explain-title">
      {/* 1. ヘッダー ＆ ナビゲーター */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <Mascot mood="happy" size="md" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="rounded-full bg-emerald-100 text-emerald-800 px-2.5 py-0.5 text-xs font-bold flex items-center gap-1">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                レッスンクリア！
              </span>
              <span className="text-xs text-slate-400 font-bold">解説・ポイント解説</span>
            </div>
            <h1 id="explain-title" className="text-lg md:text-xl font-black text-slate-900">
              {q.kind === "bug" ? "どうしてバグが起きたの？（原因と解決策）" : "どうしてこの答えになるの？（コードの流れ）"}
            </h1>
            <p className="mt-1 text-xs text-slate-600">
              「プログラムがどう動いていたのか、理由をしっかり理解しておくと次に応用できますよ！」
            </p>
          </div>
        </div>
      </div>

      {/* 2. ビフォーアフター比較（バグ修正）または変数のトレース（クイズ） */}
      {q.kind === "bug" ? (
        <section aria-label="修正前と修正後の比較" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-black text-slate-800 mb-4 flex items-center gap-2">
            <Terminal className="h-4 w-4 text-[#00A3DA]" />
            修正前と修正後のコード比較
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {/* 修正前 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black text-rose-600 flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-rose-500" />
                  修正前（バグあり）
                </h3>
                <span className="text-[10px] text-slate-400">動作不良</span>
              </div>
              <CodeBlock lines={q.code} highlight={q.fixIndex} tone="bug" fileName="Buggy.py" />
              <GameStage key="before" sim={q.buggySim} compact />
              <p className="rounded-lg bg-rose-50 p-2.5 text-xs font-bold text-rose-700 border border-rose-200">
                {q.explanation.resultBefore}
              </p>
            </div>

            {/* 修正後 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black text-emerald-600 flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  修正後（正しい動作）
                </h3>
                <span className="text-[10px] text-emerald-600 font-bold">✓ 正常動作</span>
              </div>
              <CodeBlock
                lines={q.code.map((l, i) => (i === q.fixIndex ? (q.options.find((o) => o.correct)?.line ?? l) : l))}
                highlight={q.fixIndex}
                tone="fixed"
                fileName="Fixed.py"
              />
              <GameStage key="after" sim={q.options.find((o) => o.correct)?.sim ?? q.buggySim} compact />
              <p className="rounded-lg bg-emerald-50 p-2.5 text-xs font-bold text-emerald-800 border border-emerald-200">
                {q.explanation.resultAfter}
              </p>
            </div>
          </div>
        </section>
      ) : (
        <section aria-label="実行結果と変数の流れ" className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-black text-slate-800 mb-2">
              正解の出力結果: <span className="font-mono text-emerald-600 font-black text-lg ml-2">{q.output}</span>
            </h2>
            <p className="text-xs text-slate-600">
              コンピュータはコードを上から1行ずつ順番に実行していきます。変数の値がどのように書き換わったか確認してみよう。
            </p>
          </div>
          <TraceView code={q.code} steps={q.trace} />
        </section>
      )}

      {/* 3. なぜそうなるのか（解説テキスト） */}
      <section aria-label="理由" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xs font-bold text-[#00A3DA] uppercase tracking-wider mb-2">
          HOW IT WORKS
        </h3>
        <h4 className="text-base font-black text-slate-900 mb-3">動作の理由と仕組み</h4>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{q.explanation.why}</p>
      </section>

      {/* 4. おぼえておこう（ポイントまとめカード） */}
      <section aria-label="関連するプログラミング知識" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xs font-bold text-[#FF8800] uppercase tracking-wider mb-2">
          KEY TAKEAWAY
        </h3>
        <h4 className="text-base font-black text-slate-900 mb-3 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-[#FF8800]" />
          プログラミングの重要ポイント
        </h4>
        <ul className="space-y-2">
          {q.explanation.knowledge.map((k) => (
            <li key={k} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="h-2 w-2 rounded-full bg-[#00A3DA] shrink-0 mt-1.5" />
              <span>{k}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 5. 関連動画レッスンへの誘導（paizaラーニング公式動画風） */}
      {course && (
        <section aria-label="関連講座" className="rounded-2xl border border-sky-200 bg-gradient-to-r from-sky-50 via-white to-sky-50 p-6 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#00A3DA] mb-2">
            <Video className="h-4 w-4" />
            paizaラーニングで詳しく学ぶ（3分動画レッスン）
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
            <div>
              <p className="font-black text-slate-900 text-sm md:text-base">{course.title}</p>
              <p className="text-xs text-slate-500 mt-1">動画タイトル：{q.explanation.course.videoTitle}（約3分）</p>
            </div>

            <Link
              href={`/courses/${course.slug}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#00A3DA] hover:bg-[#0085B3] px-5 py-2.5 text-xs font-bold text-white shadow-md transition shrink-0"
            >
              <PlayCircle className="h-4 w-4" />
              この仕組みを動画で見る
            </Link>
          </div>
        </section>
      )}

      {/* アクションボタン（成果を見る / 次へ） */}
      <div className="pt-2">{children}</div>
    </article>
  );
}
