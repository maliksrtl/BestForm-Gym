import { siteConfig } from "@/src/config/site";
import { localSeoHighlights, seoLandingLinks } from "@/src/features/marketing/content";

export function LocalSeoSection() {
  return (
    <section className="localSeoSection" id="local-seo">
      <div className="sectionIntro">
        <p className="sectionLabel">Konum ve yakın çevre</p>
        <h2>Adana'da spor salonu arayanların BestForm Gym'i hızlı bulması için net adres, net hizmet.</h2>
        <p>
          {siteConfig.address} adresindeki salon; Seyhan, Sümer Mahallesi ve Barajyolu çevresinde fitness, body
          building, pilates ve personal training arayanlar için konum, hizmet ve iletişim bilgisini tek yerde sunar.
        </p>
      </div>

      <div className="localSeoGrid">
        {localSeoHighlights.map((item) => (
          <article className="localSeoCard" key={item.title}>
            <span>Yerel sinyal</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>

      <nav className="areaLinkCloud" aria-label="BestForm Gym yerel hizmet sayfaları">
        {seoLandingLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
    </section>
  );
}
