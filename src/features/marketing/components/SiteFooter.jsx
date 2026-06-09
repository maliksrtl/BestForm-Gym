import { siteConfig } from "@/src/config/site";
import { seoLandingLinks } from "@/src/features/marketing/content";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div>
        <span>{siteConfig.name}</span>
        <p>{siteConfig.locationLabel}</p>
      </div>
      <nav className="footerLinks" aria-label="Yerel spor salonu sayfaları">
        {seoLandingLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <p className="developerCredit">
        Developed by{" "}
        <a href="https://yusuf-sertel-portfolio.vercel.app/tr" target="_blank" rel="noreferrer">
          Yusuf Sertel
        </a>{" "}
        and{" "}
        <a href="https://github.com/maliksrtl" target="_blank" rel="noreferrer">
          Malik Can Sertel
        </a>
      </p>
    </footer>
  );
}
