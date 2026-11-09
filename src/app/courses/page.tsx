import Link from "next/link";
import { Info } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import { COURSES, LEARNING_PATHS, getCourse } from "@/lib/courses";

export const metadata = { title: "講座一覧（デモ）｜paizaラーニング UX改善プロトタイプ" };

export default function CoursesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <p className="mb-5 flex items-start gap-2 rounded-card bg-amber-50 p-3 text-sm">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden />
        この画面はデモ用のダミーです。実際のpaizaラーニングの講座とは連携していません。
      </p>

      <h1 className="mb-4 text-2xl font-black">講座一覧</h1>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COURSES.map((c) => (
          <CourseCard key={c.slug} course={c} />
        ))}
      </ul>

      <h2 id="paths" className="mb-3 mt-10 scroll-mt-32 text-xl font-black">
        学習パス一覧
      </h2>
      <ul className="grid gap-4 md:grid-cols-2">
        {LEARNING_PATHS.map((p) => (
          <li key={p.title} className="rounded-card border-l-4 border-paiza-pink bg-white p-4 shadow-card">
            <h3 className="font-black">{p.title}</h3>
            <p className="mt-1 text-sm text-paiza-sub">{p.summary}</p>
            <ol className="mt-3 space-y-1 text-sm">
              {p.courseSlugs.map((s, i) => {
                const c = getCourse(s);
                return c ? (
                  <li key={s}>
                    <Link href={`/courses/${s}`} className="font-bold text-paiza-blue-dark hover:underline">
                      {i + 1}. {c.title}
                    </Link>
                  </li>
                ) : null;
              })}
            </ol>
          </li>
        ))}
      </ul>

      <div className="mt-10 rounded-card bg-white p-5 text-center shadow-card">
        <p className="mb-3 font-bold">まだ体験していないなら、まずは遊んでみよう！</p>
        <Link
          href="/survey"
          className="inline-block rounded-full bg-paiza-orange px-7 py-3 font-black text-paiza-ink hover:bg-paiza-orange-dark"
        >
          さっそく体験する
        </Link>
      </div>
    </div>
  );
}
