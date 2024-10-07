import { Chip } from "@nextui-org/chip";
import { Link } from "@nextui-org/link";
import { PiGithubLogoDuotone } from "react-icons/pi";

import HomePage from "@/components/Home";
import { subtitle, title } from "@/components/primitives";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-[80%]">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>
          <span className={title({ color: "blue" })}>DIU&nbsp;</span>CGPA Calculator
        </span>
        <div className={subtitle({ class: "mt-4" })}>Calculate your CGPA with ease.</div>
      </div>
      <Link isExternal className="flex items-center gap-1 text-current" href="https://redirect.shovon.me/diu-cgpa-github" title="DIU CGPA source code">
        <Chip avatar={<PiGithubLogoDuotone />} variant="flat">
          Fork on GitHub &gt;
        </Chip>
      </Link>
      <HomePage />
    </section>
  );
}
