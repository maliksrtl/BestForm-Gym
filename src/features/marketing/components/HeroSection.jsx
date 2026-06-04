import { siteConfig } from "@/src/config/site";
import { gallery, profile } from "@/src/features/marketing/content";

export function HeroSection({ onServicesClick }) {
  return (
    <section className="hero" id="top">
      <div className="heroMedia" style={{ backgroundImage: `url("${gallery[0].image}")` }} aria-hidden="true" />
      <div className="heroShade" aria-hidden="true" />
      <div className="heroContent">
        <p className="kicker">{siteConfig.locationLabel}</p>
        <h1>BESTFORM GYM</h1>
        <p className="heroLead">
          Body building, fitness, pilates ve personal training için ulaşımı kolay, ekipman çeşitliliği güçlü, hoca
          ilgisiyle öne çıkan Adana spor salonu.
        </p>
        <div className="heroActions">
          <a className="primaryButton" href={siteConfig.phoneHref}>
            {siteConfig.phoneDisplay}
          </a>
          <button className="secondaryButton" type="button" onClick={onServicesClick}>
            Hizmetleri gör
          </button>
          <a className="ghostButton" href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>
        <div className="heroStats" aria-label="Bestform öne çıkan bilgiler">
          <span>
            <strong>{profile.followers}</strong>
            Instagram takipçisi
          </span>
          <span>
            <strong>{profile.posts}</strong>
            Instagram gönderisi
          </span>
          <span>
            <strong>4,8/5</strong>
            rehber puanı
          </span>
          <span>
            <strong>13+</strong>
            detaylı yorum
          </span>
        </div>
      </div>
      <div className="scrollCue">HİZMETLER</div>
    </section>
  );
}
