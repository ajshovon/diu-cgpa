"use client";

import { MoonIcon, SunIcon } from "@/components/icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-default-100 hover:bg-default-200" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
      {resolvedTheme === "dark" ? <SunIcon size={22} /> : <MoonIcon size={22} />}{" "}
    </button>
  );
}
