import { siteConfig } from "@/src/config/site";

export function ContactSection({ leadSubmitted, onSubmit }) {
  return (
    <section className="contactSection" id="contact">
      <div className="contactCopy">
        <p className="sectionLabel">İletişim ve konum</p>
        <h2>Adana Seyhan Sümer Mahallesi'nde spora başlamak için bugün bir adım at.</h2>
        <p>
          Güncel üyelik, pilates, personal training ve çalışma saatleri için arayabilir, Instagram'dan yazabilir veya
          Google Haritalar üzerinden yol tarifi alabilirsin.
        </p>

        <div className="contactFacts">
          <p>
            <strong>Telefon</strong>
            <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
          </p>
          <p>
            <strong>Adres</strong>
            {siteConfig.address}
          </p>
          <p>
            <strong>Bölge</strong>
            Adana / Seyhan / Sümer Mahallesi / Barajyolu çevresi
          </p>
          <p>
            <strong>Instagram</strong>
            <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">
              @bestformgym
            </a>
          </p>
        </div>

        <div className="contactActions">
          <a className="primaryButton" href={siteConfig.phoneHref}>
            Hemen ara
          </a>
          <a className="secondaryButton" href={siteConfig.mapUrl} target="_blank" rel="noreferrer">
            Google Haritalar
          </a>
        </div>
      </div>

      <div className="contactSide">
        <form className="leadForm" onSubmit={onSubmit}>
          <label>
            Ad soyad
            <input name="name" required placeholder="Adını yaz" />
          </label>
          <label>
            Telefon
            <input name="phone" type="tel" required placeholder="0 5xx xxx xx xx" />
          </label>
          <label>
            İlgi alanı
            <select name="goal" defaultValue="Fitness">
              <option>Fitness</option>
              <option>Body Building</option>
              <option>Pilates</option>
              <option>Personal Training</option>
            </select>
          </label>
          <label>
            Uygun zaman
            <select name="time" defaultValue="Hafta içi akşam">
              <option>Hafta içi gündüz</option>
              <option>Hafta içi akşam</option>
              <option>Cumartesi</option>
            </select>
          </label>
          <button className="primaryButton" type="submit">
            Randevu talebi gönder
          </button>
          {leadSubmitted && <p className="successMessage">Talebin alındı. Ekip en kısa sürede dönüş yapacak.</p>}
        </form>

        <div className="mapPanel">
          <iframe
            title="BestForm Gym Adana Seyhan Sümer Mahallesi Google Haritalar konumu"
            src={siteConfig.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
