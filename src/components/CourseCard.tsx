import Link from "next/link";
import { Clock, Layers } from "lucide-react";
import type { DummyCourse } from "@/lib/courses";

export default function CourseCard({ course }: { course: DummyCourse }) {
  return (
    <li>
      <Link
        href={`/courses/${course.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-card border border-paiza-line bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-pop"
      >
        <div className="flex h-24 items-end p-3" style={{ backgroundColor: course.color }}>
          <span className="rounded bg-white/90 px-2 py-0.5 text-xs font-black" style={{ color: course.color === "#777777" ? "#333" : course.color }}>
            {course.level}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="font-black group-hover:text-paiza-blue-dark">{course.title}</h3>
          <p className="mt-1 flex-1 text-sm text-paiza-sub">{course.summary}</p>
          <p className="mt-3 flex items-center gap-3 text-xs text-paiza-sub">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" aria-hidden />約{course.minutes}分
            </span>
            <span className="inline-flex items-center gap-1">
              <Layers className="h-3.5 w-3.5" aria-hidden />全{course.chapters.length}章
            </span>
            <span className="ml-auto rounded bg-paiza-bg px-1.5 py-0.5 font-bold">デモ</span>
          </p>
        </div>
      </Link>
    </li>
  );
}
