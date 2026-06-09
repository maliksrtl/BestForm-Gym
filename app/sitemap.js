import { siteConfig } from "@/src/config/site";
import { seoLandingPages } from "@/src/features/marketing/seoLandingPages";

export default function sitemap() {
  const now = new Date();

  return [
    {
      url: `${siteConfig.siteUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1
    },
    ...seoLandingPages.map((page) => ({
      url: `${siteConfig.siteUrl}/${page.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: page.slug.includes("adana") ? 0.9 : 0.82
    }))
  ];
}
