import { compile } from "/opt/npm-tools/node_modules/tailwindcss/dist/lib.mjs";
import fs from "fs"; import path from "path";
const root = "/opt/npm-tools/node_modules/tailwindcss";
const css = `@import "tailwindcss"; @config "./tailwind.config.ts";`;
const compiler = await compile(css, {
  base: process.cwd(),
  loadStylesheet: async (id, base) => { const p = id === "tailwindcss" ? path.join(root, "index.css") : path.resolve(base, id.replace(/^tailwindcss\//, root + "/")); return { path: p, base: path.dirname(p), content: fs.readFileSync(p, "utf8") }; },
  loadModule: async (id, base) => { const mod = await import(path.resolve(base, id)); return { path: id, base, module: mod.default ?? mod }; },
});
const files = []; (function walk(d){ for (const f of fs.readdirSync(d,{withFileTypes:true})) { const p=path.join(d,f.name); f.isDirectory()?walk(p):/\.tsx?$/.test(f.name)&&files.push(p);} })("src");
const cands = new Set(); for (const f of files) for (const t of fs.readFileSync(f,"utf8").split(/[\s"'`<>{}()]+/)) if (t) cands.add(t);
let out = compiler.build([...cands]);
out += "\n" + fs.readFileSync("src/app/globals.css","utf8").replace(/@tailwind [a-z]+;/g,"");
fs.writeFileSync("out/style.css", out); console.log("css bytes", out.length);
