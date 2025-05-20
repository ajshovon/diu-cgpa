import { NavbarBrand, NavbarContent, NavbarItem, Navbar as NextUINavbar } from "@heroui/navbar";
import NextLink from "next/link";

// import { Logo } from "@/components/icons";
import Logo from "@/app/icon0.svg";
import { ThemeSwitch } from "@/components/theme-switch";
import { useTranslations } from "next-intl";
import Image from "next/image";
import LanguageSwitcher from "./lang-switcher";

export const Navbar = () => {
  const t = useTranslations("HomePage");
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full sm:ml-0 -ml-2" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image src={Logo} alt="Logo" width={30} height={30} className="p-[4px]" />
            <p className="font-bold text-inherit">CGPA Calculator</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full " justify="end">
        <NavbarItem className="hidden sm:flex gap-2 text-sm">
          <NextLink className="flex justify-start items-center gap-1" href="/faq">
            {t("faq")}
          </NextLink>
        </NavbarItem>
        <ThemeSwitch />
        <LanguageSwitcher />
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4 text-xs gap-2 sm:mr-0 -mr-2" justify="end">
        <NextLink className="flex justify-start items-center" href="/faq">
          {t("faq")}
        </NextLink>
        <ThemeSwitch />
        <LanguageSwitcher />
      </NavbarContent>
    </NextUINavbar>
  );
};
