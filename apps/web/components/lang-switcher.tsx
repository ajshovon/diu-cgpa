"use client";
import { Button, ButtonGroup } from "@heroui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LanguageSwitcher() {
  const router = useRouter();
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("locale="))
      ?.split("=")[1];
    if (cookieLocale) setLocale(cookieLocale);
  }, []);

  const switchLanguage = (lang: string) => {
    document.cookie = `locale=${lang}; path=/; max-age=31536000`;
    setLocale(lang);
    router.refresh();
  };

  return (
    <>
      {/* <select value={locale} onChange={(e) => switchLanguage(e.target.value)} className="border rounded px-2 py-1 mx-2" aria-label="Select language">
        <option value="en">English</option>
        <option value="bn">বাংলা</option>
      </select> */}
      <ButtonGroup variant="flat" size="sm" radius="sm">
        <Button color={locale === "bn" ? "primary" : "default"} className="p-0 min-w-10" onPress={() => switchLanguage("bn")}>
          Bn
        </Button>
        <Button color={locale === "en" ? "primary" : "default"} className="p-0 min-w-10" onPress={() => switchLanguage("en")}>
          En
        </Button>
      </ButtonGroup>
    </>
  );
}
