import { siteConfig } from "@/src/config/site";
import { instagramSignals, profile } from "@/src/features/marketing/content";

export function SocialSection() {
  return (
    <section className="socialSection" id="social">
      <div className="socialProfile">
        <p className="sectionLabel">Instagram akışı</p>
        <h2>{profile.username}</h2>
        <p className="socialBio">
          {profile.bio.join(" / ")}
          <strong>{profile.location}</strong>
        </p>
        <p className="socialNote">
          Doğru form, ekipman odağı, yakın hoca yönlendirmesi ve çalışmaya odaklı salon atmosferi.
        </p>
        <div className="profileStats" aria-label="Instagram profil istatistikleri">
          <span>
            <strong>{profile.followers}</strong>
            takipçi
          </span>
          <span>
            <strong>{profile.following}</strong>
            takip
          </span>
          <span>
            <strong>{profile.posts}</strong>
            gönderi
          </span>
        </div>
        <a className="ghostButton" href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">
          Profili aç
        </a>
      </div>

      <div className="signalGrid">
        {instagramSignals.map((signal) => (
          <article key={signal.title} className="signalCard">
            <span>{signal.title}</span>
            <strong>{signal.value}</strong>
            <p>{signal.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
