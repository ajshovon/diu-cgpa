"use client";
import { Accordion, AccordionItem } from "@heroui/accordion";

import { useTranslations } from "next-intl";

// const faqs = [
//   {
//     title: "What is CGPA?",
//     content: "CGPA stands for Cumulative Grade Point Average. It is used to measure a student's academic performance.",
//   },
//   {
//     title: "How do I calculate my CGPA?",
//     content: "You can calculate your CGPA by dividing the total grade points earned by the total credit hours.",
//   },
//   {
//     title: "Can I improve my CGPA?",
//     content: "Yes, by scoring higher grades in upcoming semesters, you can improve your CGPA.",
//   },
// ];

export default function Home() {
  const t = useTranslations("faq");
  const faqs = t.raw("list") as Array<{ title: string; content: string }>;
  // console.log(faqs);
  return (
    <div className="w-full max-w-xl p-4 mx-auto">
      <h1 className="text-3xl font-bold mb-6">{t("faq-title")}</h1>
      <div className="space-y-2">
        <Accordion variant="splitted">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} aria-label={faq.title} title={faq.title}>
              {faq.content}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
