import Link from "next/link";
import {
  BookOpen,
  ChevronRight,
  Code2,
  Compass,
  Filter,
  Gamepad2,
  Info,
  Sparkles,
} from "lucide-react";
import CourseCard from "@/components/CourseCard";
import { COURSES, LEARNING_PATHS, getCourse } from "@/lib/courses";

export const metadata = {
  title: "講座一覧｜paizaラーニング UX改善プロトタイプ",
  description: "paizaラーニングの動画講座・学習パス一覧（プロトタイプ）",
};

const CATEGORIES = ["すべて", "Python", "Web開発", "基礎文法", "アルゴリズム", "新着"];

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-[#F4F7F9] py-8">
      <div className="mx-auto max-w-7xl px-4">
        {/* パンくず */}
        <div className="mb-4 flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#00A3DA] transition">
            ラーニングトップ
          </Link>
          <span>/</span>
          <span className="font-bold text-slate-800">講座一覧</span>
        </div>

        {/* ヘッダーエリア */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="rounded bg-[#00A3DA] px-2 py-0.5 text-xs font-black text-white">
                  paiza learning
                </span>
                <span className="text-xs font-bold text-slate-400">全120講座・演習課題付き</span>
              </div>
              <h1 className="text-2xl font-black text-slate-900">
                プログラミング講座一覧
              </h1>
              <p className="mt-1 text-xs text-slate-600">
                1本3分の動画レッスンと、ブラウザ完結の演習問題でサクサク学べるカリキュラム
              </p>
            </div>

            <Link
              href="/survey"
              className="inline-flex items-center gap-2 rounded-full bg-[#FF8800] hover:bg-[#e67a00] px-6 py-3 text-sm font-black text-white shadow-md shadow-orange-500/20 transition self-start md:self-auto"
            >
              <Gamepad2 className="h-4 w-4" />
              登録なしで体験する
            </Link>
          </div>

          {/* 簡易カテゴリーフィルター */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <Filter className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="text-xs text-slate-500 shrink-0 mr-1">絞り込み:</span>
            {CATEGORIES.map((cat, idx) => (
              <button
                key={cat}
                type="button"
                className={`rounded-full px-3.5 py-1 text-xs font-bold transition shrink-0 ${
                  idx === 0
                    ? "bg-[#00A3DA] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 講座カード一覧 */}
        <section aria-labelledby="courses-list-title" className="mb-14">
          <h2 id="courses-list-title" className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#00A3DA]" />
            入門・実践講座
          </h2>

          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {COURSES.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </ul>
        </section>

        {/* 学習パス一覧 */}
        <section id="paths" aria-labelledby="paths-list-title" className="scroll-mt-24 mb-14">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              <Compass className="h-5 w-5 text-[#E05397]" />
              <h2 id="paths-list-title" className="text-lg font-black text-slate-900">
                目的別・学習パス一覧
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              なりたいエンジニア像や開発目標に合わせて、体系的にステップアップできます
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {LEARNING_PATHS.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-[#00A3DA] transition"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="rounded bg-[#E05397] px-2 py-0.5 text-[11px] font-black text-white">
                    学習パス
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    全{p.courseSlugs.length}講座
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-900 mb-2">{p.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{p.summary}</p>

                <div className="rounded-xl bg-[#F4F7F9] p-3 border border-slate-100">
                  <p className="text-[11px] font-bold text-slate-400 mb-2">ステップ順：</p>
                  <ol className="space-y-1.5 text-xs">
                    {p.courseSlugs.map((s, i) => {
                      const c = getCourse(s);
                      return c ? (
                        <li key={s} className="flex items-center justify-between">
                          <Link
                            href={`/courses/${s}`}
                            className="font-bold text-[#00A3DA] hover:underline truncate"
                          >
                            STEP {i + 1}. {c.title}
                          </Link>
                          <ChevronRight className="h-3.5 w-3.5 text-slate-300 shrink-0" />
                        </li>
                      ) : null;
                    })}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 体験へのCTA */}
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-[#E6F6FC] via-white to-orange-50 p-8 text-center shadow-sm">
          <Sparkles className="mx-auto h-8 w-8 text-[#FF8800] mb-2" />
          <h2 className="text-xl font-black text-slate-900 mb-2">
            まずは登録不要のプログラミング体験から！
          </h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto mb-6">
            バグ修正ゲームや実行結果予想クイズで、コードが動く面白さを体感してみましょう。
          </p>
          <Link
            href="/survey"
            className="inline-flex items-center gap-2 rounded-full bg-[#FF8800] hover:bg-[#e67a00] px-8 py-3.5 text-base font-black text-white shadow-md shadow-orange-500/20 active:scale-95 transition"
          >
            <Gamepad2 className="h-5 w-5" />
            さっそく体験する（無料）
          </Link>
        </div>
      </div>
    </div>
  );
}
