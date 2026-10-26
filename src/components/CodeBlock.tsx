interface Props {
  lines: string[];
  /** 強調する行（0始まり） */
  highlight?: number;
  /** highlight の行の見た目 */
  tone?: "bug" | "fixed" | "run";
  label?: string;
}

const TONE: Record<NonNullable<Props["tone"]>, string> = {
  bug: "bg-red-500/25 border-l-4 border-red-400",
  fixed: "bg-emerald-500/25 border-l-4 border-emerald-400",
  run: "bg-amber-400/25 border-l-4 border-amber-300",
};

export default function CodeBlock({ lines, highlight, tone = "bug", label = "Python" }: Props) {
  return (
    <figure className="overflow-hidden rounded-card bg-[#1e2a33] text-sm text-slate-100 shadow-card">
      <figcaption className="flex items-center justify-between bg-[#15202a] px-3 py-1.5 text-[11px] text-slate-400">
        <span>{label}</span>
        <span className="flex gap-1" aria-hidden>
          <i className="h-2 w-2 rounded-full bg-red-400" />
          <i className="h-2 w-2 rounded-full bg-amber-300" />
          <i className="h-2 w-2 rounded-full bg-emerald-400" />
        </span>
      </figcaption>
      <pre className="overflow-x-auto py-2 font-mono leading-7" tabIndex={0} aria-label="コード">
        <code>
          {lines.map((line, i) => (
            <span
              key={i}
              className={`flex border-l-4 border-transparent px-3 ${i === highlight ? TONE[tone] : ""}`}
            >
              <span className="mr-4 w-5 shrink-0 select-none text-right text-slate-500">{i + 1}</span>
              <span className="whitespace-pre">{line === "" ? " " : line}</span>
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
