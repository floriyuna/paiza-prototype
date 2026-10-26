import { chromium } from "/home/claude/.npm-global/lib/node_modules/playwright/index.mjs";
const B = "file:///tmp/claude-0/-home-claude/4d1cf4a3-1a86-5d1e-a1d4-4d68d3de16c4/scratchpad/h/out/standalone.html";
const errors = []; let fails = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fails++; };
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
page.on("pageerror", (e) => errors.push("PAGEERR " + e.message));
const shot = (n) => page.screenshot({ path: `out/${n}.png`, fullPage: true });
const url = () => new URL(page.url()).hash.slice(1);

await page.goto(B + "#/"); await page.waitForSelector("h1");
ok((await page.textContent("h1")).includes("まずは遊んでみよう"), "top: catchphrase");
ok(await page.getByRole("link", { name: "さっそく体験する" }).first().isVisible(), "top: main CTA");
ok(await page.getByRole("link", { name: "講座一覧を見る" }).isVisible(), "top: sub CTA");
await shot("01-top");

await page.getByRole("link", { name: "さっそく体験する" }).first().click();
ok(url() === "/survey", "CTA -> /survey");
await shot("02-survey");
await page.getByRole("button", { name: "初めて触れる" }).click();
await page.getByText("Q2.").waitFor();
await page.getByRole("button", { name: /何が書いてあるか分からない/ }).click();
await page.waitForURL(/learn/);
ok(url() === "/learn?type=bug", "survey -> /learn?type=bug : " + url());
const lv = await page.evaluate(() => JSON.parse(localStorage.getItem("paiza-proto-guest-v1")).level);
ok(lv === "beginner", "level judged beginner (" + lv + ")");
ok(await page.getByText("このバグを直して！").isVisible(), "bug game shown w/ message");

// --- beginner bug ---
await page.getByRole("button", { name: "jump_power = 0" }).click();
await page.waitForTimeout(3500);
ok(await page.getByText("ぜんぜん跳べない").isVisible(), "wrong(0): feedback");
await page.getByRole("button", { name: "jump_power = -5" }).click();
await page.waitForTimeout(1800);
ok(await page.getByText("地面にめり込んだ").isVisible(), "wrong(-5): feedback");
ok(await page.getByText("バグを直せた！").count() === 0, "not solved yet");
await shot("03-bug-wrong");
await page.getByRole("button", { name: "jump_power = 5" }).click();
await page.waitForTimeout(2500);
ok(await page.getByText("バグを直せた！").isVisible(), "correct(5): solved");
ok(await page.locator("pre").first().textContent().then(t => t.includes("jump_power = 5")), "code line updated to chosen fix");
await shot("04-bug-solved");
await page.getByRole("button", { name: "なぜ直ったのか見る" }).click();
ok(await page.getByText("どうしてバグが起きたの？").isVisible(), "explanation shown");
ok(await page.getByText("修正前（バグあり）").isVisible() && await page.getByText("修正後（正しい動き）").isVisible(), "before/after shown");
ok(await page.getByRole("link", { name: "この仕組みを動画で学ぶ" }).isVisible(), "video button");
ok(await page.getByText("未連携").first().isVisible(), "dummy course disclosed");
await shot("05-explain");
await page.getByRole("button", { name: /クリアの成果を見る/ }).click();
ok(await page.getByText("初めてのプログラミング体験クリア！").isVisible(), "achievement shown");
ok(await page.getByText("ゲストとして学習を続ける").isVisible() && await page.getByText("アカウントを作成して本格的に学ぶ").isVisible(), "two choices shown");
await shot("06-achievement");
await page.getByRole("button", { name: /ゲストとして学習を続ける/ }).click();
await page.waitForTimeout(300);
ok(url() === "/learn?type=quiz", "guest continue -> next question (quiz): " + url());

// --- beginner quiz ---
await page.getByRole("button", { name: "5", exact: true }).click();
ok(await page.getByText("おしい！").isVisible(), "quiz wrong feedback");
await page.getByRole("button", { name: "8", exact: true }).click();
ok(await page.getByText("正解！").first().isVisible(), "quiz correct");
ok(await page.getByText("実際の実行結果").isVisible(), "actual output shown");
await shot("07-quiz-solved");
await page.getByRole("button", { name: /変数の動きを見る/ }).click();
ok(await page.getByText("いまの変数の中身").isVisible(), "trace view");
await page.getByRole("button", { name: /次のステップ/ }).click();
ok(await page.getByText("ステップ 2/3").isVisible(), "trace steps forward");
await shot("08-quiz-explain");
ok(await page.getByRole("button", { name: /もう一問挑戦する/ }).isVisible() && await page.getByRole("button", { name: /別のゲームを遊ぶ/ }).isVisible(), "post-first buttons (another / other game)");

// other game -> bug at same level
await page.getByRole("button", { name: /別のゲームを遊ぶ/ }).click();
ok(url() === "/learn?type=bug", "other game -> bug");
// another -> goes to uncleared next
await page.getByRole("button", { name: "jump_power = 5" }).click();
await page.waitForTimeout(500);
await page.getByRole("button", { name: "なぜ直ったのか見る" }).click();
await page.getByRole("button", { name: /もう一問挑戦する/ }).click();
await page.waitForTimeout(300);
const act = await page.locator('[role="radio"][aria-checked="true"]').textContent();
ok(act === "中級者", "もう一問 moves to next level: " + act);

// --- intermediate bug ---
await page.getByRole("button", { name: "if obstacle_distance > 2:" }).click();
await page.waitForTimeout(2800);
ok(await page.getByText("ジャンプが早すぎて").isVisible(), "run early: crash message");
await page.getByRole("button", { name: "if obstacle_distance <= 2:" }).click();
await page.waitForTimeout(3800);
ok(await page.getByText("障害物を飛び越えた").isVisible(), "run right: success message");
await shot("09-run-solved");
await page.getByRole("button", { name: "なぜ直ったのか見る" }).click();
await page.getByRole("button", { name: /別のゲームを遊ぶ/ }).click();
// --- intermediate quiz ---
await page.getByRole("button", { name: "10", exact: true }).click();
await page.getByRole("button", { name: "6", exact: true }).click();
ok(await page.getByText("実際の実行結果").isVisible(), "intermediate quiz solved");
await page.getByRole("button", { name: /変数の動きを見る/ }).click();

// --- level switch to advanced via switcher ---
await page.getByRole("radio", { name: "上級者" }).click();
await page.getByRole("tab", { name: /バグ修正ゲーム/ }).click();
ok(await page.getByText("結果を予想しよう").isVisible(), "advanced: predict step");
ok(await page.getByText("先に結果を予想してみよう").isVisible(), "advanced: stage hidden until predicted");
await shot("10-advanced-predict");
await page.getByRole("button", { name: "30", exact: true }).click();
ok(await page.getByText("実際は 20 でした").isVisible(), "predict wrong feedback");
await page.getByRole("button", { name: /バグを直しに行く/ }).click();
await page.getByRole("button", { name: "for i in range(coins + 1):" }).click();
await page.waitForTimeout(4200);
ok(await page.getByText("score が 40").isVisible(), "coins +1: score 40 message");
await shot("11-coins-wrong");
await page.getByRole("button", { name: "for i in range(coins):" }).click();
await page.waitForTimeout(3500);
ok(await page.getByText("score は 30！").isVisible(), "coins correct: 30");
await page.getByRole("button", { name: "なぜ直ったのか見る" }).click();
await page.getByRole("button", { name: /別のゲームを遊ぶ/ }).click();
await page.getByRole("button", { name: "13", exact: true }).click();
await page.getByRole("button", { name: "10", exact: true }).click();
await page.getByRole("button", { name: "9", exact: true }).click();
ok(await page.getByText("実際の実行結果").isVisible(), "advanced quiz solved");
const cleared = await page.evaluate(() => Object.keys(JSON.parse(localStorage.getItem("paiza-proto-guest-v1")).cleared).length);
ok(cleared === 6, "all 6 questions cleared in localStorage: " + cleared);

// persistence after reload
await page.reload(); await page.waitForSelector("h2");
ok((await page.getByText("6 / 6").count()) > 0, "progress persists after reload");
await page.goto(B + "#/"); await page.waitForSelector("h1");
ok(await page.getByText("前回の続きから始まります").isVisible(), "returning guest: resume link");

// --- survey level judgement ---
for (const [a, b, want] of [[3, 3, "advanced"], [1, 1, "beginner"], [0, 3, "intermediate"], [0, 1, "beginner"], [2, 1, "intermediate"], [3, 2, "advanced"]]) {
  await page.evaluate(() => localStorage.clear());
  await page.goto(B + "#/survey"); await page.waitForSelector("h1");
  await page.locator("section ul li button").nth(a).click(); await page.getByText("Q2.").waitFor();
  await page.locator("section ul li button").nth(b).click(); await page.waitForURL(/learn/);
  const l = await page.evaluate(() => JSON.parse(localStorage.getItem("paiza-proto-guest-v1")).level);
  ok(l === want, `survey (${a},${b}) -> ${want} got ${l}`);
}

// --- signup path from achievement ---
await page.evaluate(() => localStorage.clear());
await page.goto(B + "#/survey"); await page.waitForSelector("h1");
await page.getByRole("button", { name: /質問をとばして/ }).click(); await page.waitForURL(/learn/);
await page.getByRole("button", { name: "jump_power = 5" }).click(); await page.waitForTimeout(300);
await page.getByRole("button", { name: "なぜ直ったのか見る" }).click();
await page.getByRole("button", { name: /クリアの成果を見る/ }).click();
await page.getByRole("button", { name: /アカウントを作成して本格的に学ぶ/ }).click();
ok(url() === "/signup", "signup choice -> /signup");
ok(await page.getByText("プロトタイプのデモ画面です").isVisible(), "signup flagged as prototype");
await shot("12-signup");
await page.getByRole("link", { name: /登録せずに学習をつづける/ }).click();
ok(url().startsWith("/learn"), "back to learning without registering");

// --- courses / course detail ---
await page.goto(B + "#/courses"); await page.waitForSelector("h1");
await page.getByRole("link", { name: /Python入門：変数と計算/ }).first().click();
await page.waitForSelector("h1");
ok((await page.textContent("h1")).includes("変数と計算"), "course detail renders");

// --- mobile ---
const m = await browser.newContext({ viewport: { width: 375, height: 800 } });
const mp = await m.newPage(); mp.on("pageerror", (e) => errors.push("MOBILE " + e.message));
await mp.goto(B + "#/"); await mp.waitForSelector("h1");
const overflow = await mp.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
ok(!overflow, "mobile top: no horizontal overflow");
await mp.screenshot({ path: "out/13-mobile-top.png", fullPage: true });
await mp.goto(B + "#/learn?type=bug"); await mp.waitForSelector("h2");
ok(!(await mp.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1)), "mobile learn: no horizontal overflow");
await mp.getByRole("button", { name: "jump_power = 5" }).click(); await mp.waitForTimeout(2200);
await mp.screenshot({ path: "out/14-mobile-learn.png", fullPage: true });
await mp.getByRole("button", { name: "メニューを開く" }).click();
ok(await mp.getByRole("link", { name: "講座一覧" }).isVisible(), "mobile menu opens");

console.log("console errors:", errors.length ? errors : "none");
console.log(fails ? `${fails} FAILED` : "ALL PASSED");
await browser.close();
