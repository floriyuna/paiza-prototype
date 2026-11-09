import Link from "next/link";
import { Clock, BookOpen, CheckCircle, Play, Star } from "lucide-react";
import type { DummyCourse } from "@/lib/courses";

export default function CourseCard({ course }: { course: DummyCourse }) {
  return (
    <li>
      <Link
        href={`/courses/${course.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#00A3DA] hover:shadow-lg"
      >
        {/* サムネイル画像ヘッダー（paizaラーニング公式動画サムネイル風） */}
        <div
          className="relative flex h-32 flex-col justify-between p-4 text-white overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${course.color} 0%, #1e293b 120%)`,
          }}
        >
          {/* 背景装飾 */}
          <div className="absolute right-0 bottom-0 opacity-15 font-mono font-black text-6xl select-none translate-x-2 translate-y-2">
            CODE
          </div>

          <div className="flex items-center justify-between z-10">
            <span className="rounded bg-black/40 backdrop-blur-xs px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
              {course.level}
            </span>
            <span className="rounded-full bg-emerald-500 px-2.5 py-0.5 text-[10px] font-black text-white shadow-xs">
              完全無料
            </span>
          </div>

          <div className="z-10 flex items-center justify-between">
            <span className="font-mono text-sm font-black tracking-wide text-white/90">
              paiza learning
            </span>
            <div className="h-7 w-7 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center group-hover:scale-110 group-hover:bg-[#FF8800] transition">
              <Play className="h-3.5 w-3.5 fill-current text-white translate-x-0.5" />
            </div>
          </div>
        </div>

        {/* カード本文 */}
        <div className="flex flex-1 flex-col p-4">
          <h3 className="font-black text-slate-800 text-sm leading-snug group-hover:text-[#00A3DA] transition line-clamp-2">
            {course.title}
          </h3>

          <p className="mt-2 flex-1 text-xs text-slate-500 leading-relaxed line-clamp-2">
            {course.summary}
          </p>

          {/* メタ情報（時間、チャプター、演習問題） */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3 text-slate-400" aria-hidden />
                約{course.minutes}分
              </span>
              <span className="inline-flex items-center gap-1">
                <BookOpen className="h-3 w-3 text-slate-400" aria-hidden />
                全{course.chapters.length}レッスン
              </span>
            </div>
            <span className="rounded bg-sky-50 text-[#00A3DA] px-1.5 py-0.5 font-bold text-[10px]">
              演習課題あり
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
