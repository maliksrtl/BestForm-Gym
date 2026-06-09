import { MarketingPage } from "@/src/features/marketing/MarketingPage";
import { createHomeJsonLd } from "@/src/features/marketing/structuredData";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(createHomeJsonLd()) }}
      />
      <MarketingPage />
    </>
  );
}
