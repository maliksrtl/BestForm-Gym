import { siteConfig } from "@/src/config/site";
import { AdminIcon } from "@/src/features/marketing/components/AdminIcon";
import { navItems } from "@/src/features/marketing/content";
import { AdminIcon } from "@/src/features/marketing/components/AdminIcon";

export function SiteHeader({ menuOpen, onAdminOpen, onMenuToggle, onNavClick }) {
  return (
    <header className="siteHeader">
      <a className="brand" href="#top" onClick={() => onMenuToggle(false)}>
        <span className="brandMark">BF</span>
        <span>
          BESTFORM
          <strong>GYM & HEALTH CENTER</strong>
        </span>
      </a>

      <button
        className="menuButton"
        type="button"
        aria-label="Menüyü aç veya kapat"
        aria-expanded={menuOpen}
        onClick={() => onMenuToggle((value) => !value)}
      >
        <span />
        <span />
      </button>

      <nav className={menuOpen ? "nav navOpen" : "nav"} aria-label="Site bölümleri">
        {navItems.map(([label, id]) => (
          <button key={id} type="button" onClick={() => onNavClick(id)}>
            {label}
          </button>
        ))}
        <button className="mobileAdminLink" type="button" onClick={onAdminOpen} aria-label="Admin paneli girişi">
          <AdminIcon />
        </button>
      </nav>

      <div className="headerActions">
        <button className="adminLoginButton" type="button" onClick={onAdminOpen} aria-label="Admin paneli girişi">
          <AdminIcon />
        </button>
        <a className="headerCta" href={siteConfig.phoneHref}>
          Ara
        </a>
      </div>
    </header>
  );
}
