import type { Metadata } from "next";
import { pageMetadata } from "@/shared/seo";
import { FaqPage } from "@/features/faq/faq-page";
import { FAQ_ITEMS } from "@/features/home/sections/faq/faq-data";
import { EXTENDED_FAQ_ITEMS } from "@/features/faq/extended-faq-data";
import { JsonLd } from "@/shared/json-ld";

const TITLE = "FAQ";
const DESCRIPTION = "Answers to the objections you haven't voiced yet.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/faq",
});

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [...FAQ_ITEMS, ...EXTENDED_FAQ_ITEMS].map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function Page() {
  return (
    <>
      <JsonLd data={FAQ_JSON_LD} />
      <FaqPage />
    </>
  );
}
