import { Chip } from "@heroui/chip";
import { Link } from "@heroui/link";
import { useTranslations } from "next-intl";
import { PiGithubLogoDuotone } from "react-icons/pi";

import HomePage from "@/components/Home";
import { subtitle, title } from "@/components/primitives";
import { getApi } from "@/config/env";

export default function Home() {
  const baseApi = getApi();
  const t = useTranslations("HomePage");
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-[80%]">
      <div className="inline-block max-w-xl text-center justify-center">
        <h1 className={title()} >
          <span className={title({ color: "blue" })}>{t("title-color")}&nbsp;</span>
          {t("title-default")}
        </h1>
        <div className={subtitle({ class: "mt-4" })}>{t("subtitle")}</div>
      </div>
      <Link isExternal className="flex items-center gap-1 text-current" href="https://redirect.shovon.me/diu-cgpa-github" title="DIU CGPA source code">
        <Chip avatar={<PiGithubLogoDuotone />} variant="flat">
          {t("github-fork")} &gt;
        </Chip>
      </Link>
      <HomePage baseApi={baseApi} />
    </section>
  );
}
