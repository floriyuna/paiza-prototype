import React from "react";
import { navigate } from "./router";
export default function Link({ href, children, onClick, ...rest }: any) {
  const route = href.split("#")[0] || "/";
  return (
    <a href={"#" + route} {...rest} onClick={(e) => { onClick?.(e); if (e.defaultPrevented || e.metaKey || e.ctrlKey) return; e.preventDefault(); navigate(href, false); }}>
      {children}
    </a>
  );
}
