import { useMemo } from "react";
import { navigate, useUrl } from "./router";
export function useRouter() { return useMemo(() => ({ push: (h: string) => navigate(h, false), replace: (h: string) => navigate(h, true) }), []); }
export function usePathname() { return useUrl().split("?")[0]; }
export function useSearchParams() { const u = useUrl(); return new URLSearchParams(u.split("?")[1] ?? ""); }
export function notFound(): never { throw new Error("notFound"); }
