import * as esbuild from "esbuild";
import fs from "fs";
import path from "path";

const here = process.cwd();

console.log("Bundling harness...");
const result = await esbuild.build({
  entryPoints: [path.join(here, "standalone/harness.tsx")],
  bundle: true,
  minify: true,
  write: false,
  jsx: "automatic",
  format: "iife",
  define: {
    "process.env.NODE_ENV": '"production"',
  },
  alias: {
    "@": path.join(here, "src"),
    "next/link": path.join(here, "standalone/stubs/next-link.tsx"),
    "next/navigation": path.join(here, "standalone/stubs/next-navigation.ts"),
  },
  logLevel: "warning",
});

const bundleJs = result.outputFiles[0].text;
console.log(`Bundle JS generated: ${bundleJs.length} bytes`);

// CSSの読み込み
const cssDir = path.join(here, ".next/static/css");
const cssFiles = fs.readdirSync(cssDir).filter((f) => f.endsWith(".css"));
// 大きい方のCSSファイル（Tailwind全体のスタイルが含まれる方）
let allCss = "";
for (const f of cssFiles) {
  allCss += fs.readFileSync(path.join(cssDir, f), "utf8") + "\n";
}

// globals.css のキーフレームアニメーション等の追加
const globalsCss = fs.readFileSync(path.join(here, "src/app/globals.css"), "utf8");
allCss += "\n" + globalsCss.replace(/@tailwind [a-z]+;/g, "");

console.log(`Total CSS size: ${allCss.length} bytes`);

// index.html の生成
const html = `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>学習サービストップ | プログラミング学習サイト【paizaラーニング】UX改善プロトタイプ</title>
<meta name="description" content="paizaラーニングの新しい学習導線プロトタイプ。登録不要、Webブラウザがあれば5秒で学習が開始できます。">
<link rel="icon" href="https://paiza.jp/favicon.ico">
<style>
${allCss}
</style>
</head>
<body class="bg-[#f5f7fa] text-[#333333]">
<div id="root"></div>
<script>
${bundleJs}
</script>
</body>
</html>`;

fs.writeFileSync(path.join(here, "index.html"), html, "utf8");
console.log("index.html updated successfully!");

