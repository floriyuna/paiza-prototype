import Link from "next/link";
import { Clock, BookOpen, Play } from "lucide-react";
import type { DummyCourse } from "@/lib/courses";

export default function CourseCard({ course }: { course: DummyCourse }) {
  return (
    <li>
      <Link
        href={`/courses/${course.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-[4px] bg-white text-[#333333] shadow-[0_0_4px_rgba(0,0,0,0.25)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.25)] transition duration-200"
      >
        {/* カード上部：本家のアイコン＆ヘッダーカラー */}
        <div
          className="relative flex h-28 items-center justify-between p-4 text-white"
          style={{ backgroundColor: course.color }}
        >
          <div className="flex flex-col justify-between h-full">
            <span className="inline-block self-start rounded-[2px] bg-black/40 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
              {course.level}
            </span>
            <span className="font-bold text-base tracking-tight text-white drop-shadow-xs">
              {course.title.split(":")[0]}
            </span>
          </div>

          <div className="flex flex-col items-end justify-between h-full">
            <span className="rounded-[2px] bg-[#1fa463] px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
              完全無料
            </span>
            <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-[#ff8800] group-hover:scale-105 transition">
              <Play className="h-4 w-4 fill-current text-white translate-x-0.5" />
            </div>
          </div>
        </div>

        {/* カード本文（本家のタイポグラフィとタグ） */}
        <div className="flex flex-1 flex-col p-4 bg-white">
          <h3 className="font-bold text-[#333333] text-sm leading-snug group-hover:text-[#0d6bd3] transition line-clamp-1">
            {course.title}
          </h3>

          <p className="mt-1.5 flex-1 text-xs text-[#6e7687] leading-relaxed line-clamp-2">
            {course.summary}
          </p>

          {/* タグと所要時間（本家スタイル） */}
          <div className="mt-3 pt-2.5 border-t border-[#ededed] flex items-center justify-between text-[11px] text-[#6e7687]">
            <div className="flex items-center gap-2">
              <span className="rounded-[2px] bg-[#f5f5f5] px-1.5 py-0.5 text-[#6e7687] text-[10px] border border-[#e5e5e5]">
                {course.slug.includes("python") ? "Python3" : "Web"}
              </span>
              <span className="text-[10px]">全{course.chapters.length}レッスン</span>
            </div>
            <span className="text-[10px] text-[#6e7687]">約{course.minutes}分</span>
          </div>
        </div>
      </Link>
    </li>
  );
}
