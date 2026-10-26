import { build } from "/opt/npm-tools/node_modules/esbuild/lib/main.js";
import path from "path";
const here = process.cwd();
await build({
  entryPoints: ["harness.tsx"], bundle: true, minify: true, outfile: "out/bundle.js", jsx: "automatic", format: "iife",
  define: { "process.env.NODE_ENV": '"production"' },
  alias: { "@": path.join(here, "src"), "next/link": path.join(here, "stubs/next-link.tsx"), "next/navigation": path.join(here, "stubs/next-navigation.ts"), "lucide-react": path.join(here, "stubs/lucide-react.js") },
  nodePaths: ["/home/claude/.npm-global/lib/node_modules"], logLevel: "warning",
});
console.log("bundle ok");
