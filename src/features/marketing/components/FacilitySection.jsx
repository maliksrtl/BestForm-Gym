import { gallery, proofPoints } from "@/src/features/marketing/content";

export function FacilitySection() {
  return (
    <section className="facilitySection" id="facility">
      <div className="sectionIntro">
        <p className="sectionLabel">Salon</p>
        <h2>Fotoğraflar ve yorumlar aynı şeyi söylüyor: makine çeşitliliği güçlü, ortam net.</h2>
        <p>
          Salon görsellerinde ağırlık ve makine alanı öne çıkarken, üyeler ekipman çeşitliliğini ve rahat çalışma
          düzenini tekrar tekrar vurguluyor.
        </p>
      </div>

      <div className="galleryGrid" aria-label="Bestform salon fotoğrafları">
        {gallery.map((item) => (
          <figure key={item.title} className="photoTile" style={{ "--photo": `url("${item.image}")` }}>
            <figcaption>{item.title}</figcaption>
          </figure>
        ))}
      </div>

      <div className="proofGrid">
        {proofPoints.map((point) => (
          <article key={point.title} className="infoCard">
            <span>Öne çıkan</span>
            <h3>{point.title}</h3>
            <p>{point.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
