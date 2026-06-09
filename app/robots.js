import { siteConfig } from "@/src/config/site";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/", "/api", "/api/"]
    },
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`
  };
}
