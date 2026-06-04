import { siteConfig } from "@/src/config/site";

export function SiteFooter() {
  return (
    <footer className="footer">
      <span>{siteConfig.name}</span>
      <p>{siteConfig.locationLabel}</p>
    </footer>
  );
}
