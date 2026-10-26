import { useSyncExternalStore } from "react";
/** file:// でも動くよう、URLのハッシュ（#/learn?type=quiz）で画面遷移する */
const EVT = "stub-nav";
function sub(cb: () => void) { window.addEventListener(EVT, cb); window.addEventListener("hashchange", cb); return () => { window.removeEventListener(EVT, cb); window.removeEventListener("hashchange", cb); }; }
export const current = () => (location.hash.startsWith("#/") ? location.hash.slice(1) : "/");
export function navigate(href: string, replace: boolean) {
  const [route, anchor] = href.split("#");
  const next = "#" + (route || "/");
  if (replace) history.replaceState(null, "", next); else history.pushState(null, "", next);
  window.dispatchEvent(new Event(EVT));
  if (anchor) setTimeout(() => document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" }), 50);
  else if (!replace) window.scrollTo(0, 0);
}
export const useUrl = () => useSyncExternalStore(sub, current, () => "/");
