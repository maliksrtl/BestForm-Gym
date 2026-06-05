import { siteConfig } from "@/src/config/site";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div>
        <span>{siteConfig.name}</span>
        <p>{siteConfig.locationLabel}</p>
      </div>
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
