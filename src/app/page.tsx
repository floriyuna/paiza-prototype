import Link from "next/link";
import { Brain, Bug, Clock, Gift, ListChecks } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import Mascot from "@/components/Mascot";
import StartButton from "@/components/StartButton";
import { COURSES, LEARNING_PATHS, getCourse } from "@/lib/courses";

const STEPS = [
  { icon: ListChecks, title: "かんたんな質問", text: "2問だけ。タップするだけで、あなたに合う難しさが決まります。" },
  { icon: Bug, title: "ゲームで体験", text: "動かないゲームのバグを直したり、結果を予想したり。" },
  { icon: Brain, title: "「なぜ？」が分かる", text: "動きの理由を、図とアニメーションで解説します。" },
  { icon: Gift, title: "登録はあとから", text: "楽しかったら、好きなタイミングで。しなくても続けられます。" },
];

export default function Home() {
  return (
    <>
      {/* ヒーロー：学習体験への入り口を最も目立たせる */}
      <section aria-labelledby="hero-title" className="bg-gradient-to-br from-paiza-blue-soft via-white to-sky-100">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-[1.2fr_1fr] md:py-16">
          <div>
            <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-black text-paiza-blue-dark shadow-card">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              登録なし・約3分で体験できます
            </p>
            <h1 id="hero-title" className="text-3xl font-black leading-tight md:text-4xl md:leading-tight lg:text-5xl lg:leading-tight">
              まずは遊んでみよう。
              <br />
              <span className="text-paiza-blue">登録なしでプログラミング体験！</span>
            </h1>
            <p className="mt-4 max-w-xl text-base text-paiza-ink/80 md:text-lg">
              ゲームやクイズを通して、プログラミングの楽しさを体験してみよう。初心者でも大丈夫！
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
              <StartButton />
              <Link
                href="/courses"
                className="rounded-full border-2 border-paiza-blue bg-white px-6 py-3 font-black text-paiza-blue-dark hover:bg-paiza-blue-soft"
              >
                講座一覧を見る
              </Link>
            </div>
          </div>

          {/* ゲーム体験のプレビュー（静的なイメージ） */}
          <div aria-hidden className="relative mx-auto w-full max-w-sm">
            <div className="rounded-card border border-paiza-line bg-white p-3 shadow-pop">
              <div className="relative h-36 overflow-hidden rounded bg-gradient-to-b from-sky-200 to-white">
                <div className="absolute inset-x-0 bottom-0 h-8 bg-emerald-300" />
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                  <Mascot mood="sad" />
                </div>
                <p className="absolute left-2 top-2 rounded bg-white/90 px-2 py-1 text-xs font-black text-red-600">ジャンプできない！</p>
              </div>
              <pre className="mt-2 rounded bg-[#1e2a33] p-3 font-mono text-xs leading-6 text-slate-100">
                <span className="block border-l-4 border-red-400 bg-red-500/25 pl-2">jump_power = 0</span>
                <span className="block pl-3 text-slate-400">jump(jump_power)</span>
              </pre>
              <p className="mt-2 text-center text-xs font-black text-paiza-orange-dark">このバグを直して！</p>
            </div>
          </div>
        </div>
      </section>

      {/* 体験の流れ */}
      <section aria-labelledby="flow-title" className="mx-auto max-w-6xl px-4 py-10">
        <h2 id="flow-title" className="mb-5 text-center text-xl font-black">
          体験の流れ
        </h2>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="relative rounded-card bg-white p-4 shadow-card">
              <span className="absolute -top-2 left-3 rounded-full bg-paiza-blue px-2 py-0.5 text-xs font-black text-white">STEP {i + 1}</span>
              <s.icon className="mb-2 mt-2 h-6 w-6 text-paiza-blue" aria-hidden />
              <h3 className="font-black">{s.title}</h3>
              <p className="mt-1 text-sm text-paiza-sub">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 既存の学習プラットフォームのイメージ（ダミー） */}
      <section aria-labelledby="courses-title" className="mx-auto max-w-6xl px-4 pb-6">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 id="courses-title" className="text-xl font-black">
              体験のあとに学べる講座
            </h2>
            <p className="text-xs text-paiza-sub">※ デモ用のダミー講座です（実際のpaizaラーニングとは未連携）</p>
          </div>
          <Link href="/courses" className="text-sm font-bold text-paiza-blue-dark hover:underline">
            すべて見る
          </Link>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.slice(0, 3).map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </ul>
      </section>

      <section aria-labelledby="paths-title" className="mx-auto max-w-6xl px-4 py-6">
        <h2 id="paths-title" className="mb-3 text-xl font-black">
          学習パス（ダミー）
        </h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {LEARNING_PATHS.map((p) => (
            <li key={p.title} className="rounded-card border-l-4 border-paiza-pink bg-white p-4 shadow-card">
              <h3 className="font-black">{p.title}</h3>
              <p className="mt-1 text-sm text-paiza-sub">{p.summary}</p>
              <p className="mt-2 text-xs text-paiza-sub">
                {p.courseSlugs.map((s) => getCourse(s)?.title).filter(Boolean).join(" → ")}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
