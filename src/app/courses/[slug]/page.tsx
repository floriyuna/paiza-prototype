import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  Clock,
  Code2,
  Gamepad2,
  Play,
  PlayCircle,
  Sparkles,
  Volume2,
} from "lucide-react";
import Mascot from "@/components/Mascot";
import { COURSES, getCourse } from "@/lib/courses";

export function generateStaticParams() {
  return COURSES.map((c) => ({ slug: c.slug }));
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  return (
    <div className="min-h-screen bg-[#F4F7F9] py-8">
      <div className="mx-auto max-w-5xl px-4">
        {/* パンくず */}
        <div className="mb-4 flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#00A3DA] transition">
            ラーニングトップ
          </Link>
          <span>/</span>
          <Link href="/courses" className="hover:text-[#00A3DA] transition">
            講座一覧
          </Link>
          <span>/</span>
          <span className="font-bold text-slate-800 truncate">{course.title}</span>
        </div>

        {/* 講座タイトルヘッダー */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="rounded bg-black/60 px-2 py-0.5 text-[10px] font-bold text-white uppercase">
              {course.level}
            </span>
            <span className="rounded bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">
              完全無料
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1 ml-auto">
              <Clock className="h-3.5 w-3.5" />
              所要時間: 約{course.minutes}分
            </span>
          </div>

          <h1 className="text-xl md:text-2xl font-black text-slate-900">{course.title}</h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">{course.summary}</p>
        </div>

        {/* paizaラーニング公式風 3分動画プレイヤー */}
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl">
          {/* プレイヤータイトルバー */}
          <div className="flex items-center justify-between border-b border-slate-800 bg-[#151c24] px-4 py-2 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-slate-200 text-xs">
                paiza learning player: Chapter 01
              </span>
            </div>
            <span className="text-[11px] text-[#00A3DA] font-bold">1動画 約3分</span>
          </div>

          {/* ビデオ画面領域 */}
          <div
            className="relative flex aspect-video items-center justify-center text-white"
            style={{
              background: `radial-gradient(circle, ${course.color}22 0%, #0b1120 100%)`,
            }}
          >
            {/* ナビゲーター霧島京子のミニ表示 */}
            <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-black/60 backdrop-blur-xs px-3 py-1 border border-white/10">
              <Mascot mood="happy" size="sm" />
              <span className="text-[11px] text-slate-300 font-bold">ナビゲーター：きょうこ</span>
            </div>

            {/* 中央再生ボタン */}
            <div className="text-center z-10">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#FF8800] text-white shadow-xl shadow-orange-500/30 hover:scale-105 transition cursor-pointer">
                <Play className="h-9 w-9 fill-current translate-x-1" />
              </div>
              <p className="mt-4 font-bold text-sm text-white drop-shadow-sm">
                Chapter 1: はじめのプログラミング
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                ※ 本プロトタイプでは動画再生はモックです
              </p>
            </div>

            {/* 下部動画コントロールバー */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <Play className="h-4 w-4 fill-current text-white cursor-pointer" />
                <Volume2 className="h-4 w-4 cursor-pointer" />
                <span className="font-mono text-[11px] text-slate-400">00:00 / 03:15</span>
              </div>
              <span className="rounded bg-white/20 px-2 py-0.5 text-[10px] font-bold text-white">
                1080p 60fps
              </span>
            </div>
          </div>
        </div>

        {/* チャプターリスト */}
        <section aria-labelledby="chapters" className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 id="chapters" className="text-base font-black text-slate-900 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[#00A3DA]" />
              レッスンチャプター一覧（全{course.chapters.length}回）
            </h2>
            <span className="text-xs text-slate-400">すべて演習課題付き</span>
          </div>

          <ol className="space-y-2.5">
            {course.chapters.map((c, i) => (
              <li
                key={c}
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-[#F4F7F9] hover:bg-sky-50/60 hover:border-[#00A3DA]/40 transition"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00A3DA] text-white font-mono text-xs font-black shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 truncate">{c}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0 text-xs">
                  <span className="hidden sm:inline text-slate-400 text-[11px]">約3分</span>
                  <span className="rounded bg-sky-100 text-[#00A3DA] px-2 py-0.5 text-[10px] font-bold">
                    演習あり
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* 下部ナビゲーション */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            講座一覧へ戻る
          </Link>

          <Link
            href="/learn"
            className="inline-flex items-center gap-2 rounded-full bg-[#FF8800] hover:bg-[#e67a00] px-6 py-3 text-sm font-black text-white shadow-md shadow-orange-500/20 active:scale-95 transition"
          >
            <Gamepad2 className="h-4 w-4" />
            登録なしでゲーム・クイズを体験する
          </Link>
        </div>
      </div>
    </div>
  );
}
