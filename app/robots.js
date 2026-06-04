import { siteConfig } from "@/src/config/site";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api"]
    },
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`
  };
}
