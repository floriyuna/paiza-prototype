import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Info, PlayCircle } from "lucide-react";
import { COURSES, getCourse } from "@/lib/courses";

export function generateStaticParams() {
  return COURSES.map((c) => ({ slug: c.slug }));
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <p className="mb-5 flex items-start gap-2 rounded-card bg-amber-50 p-3 text-sm">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden />
        プロトタイプ用のダミー画面です。動画は再生できず、実際のpaizaラーニングの教材とは連携していません。
      </p>

      <h1 className="text-2xl font-black">{course.title}</h1>
      <p className="mt-1 text-paiza-sub">{course.summary}</p>

      <div
        className="mt-5 flex aspect-video items-center justify-center rounded-card text-white shadow-card"
        style={{ backgroundColor: course.color }}
        role="img"
        aria-label="動画プレーヤーのイメージ（再生できません）"
      >
        <div className="text-center">
          <PlayCircle className="mx-auto h-16 w-16 opacity-90" aria-hidden />
          <p className="mt-2 text-sm font-bold">ここに学習動画が入る想定です</p>
        </div>
      </div>

      <section aria-labelledby="chapters" className="mt-6 rounded-card bg-white p-4 shadow-card">
        <h2 id="chapters" className="mb-2 font-black">
          この講座の内容（ダミー）
        </h2>
        <ol className="list-decimal space-y-1.5 pl-5">
          {course.chapters.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ol>
      </section>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/learn"
          className="inline-flex items-center gap-2 rounded-full bg-paiza-orange px-6 py-3 font-black text-paiza-ink hover:bg-paiza-orange-dark"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          ゲーム・クイズにもどる
        </Link>
        <Link
          href="/courses"
          className="rounded-full border-2 border-paiza-blue px-6 py-3 font-black text-paiza-blue-dark hover:bg-paiza-blue-soft"
        >
          講座一覧へ
        </Link>
      </div>
    </div>
  );
}
