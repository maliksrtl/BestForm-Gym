import { gallery, proofPoints } from "@/src/features/marketing/content";

export function FacilitySection() {
  return (
    <section className="facilitySection" id="facility">
      <div className="sectionIntro">
        <p className="sectionLabel">Salon</p>
        <h2>Seyhan Sümer Mahallesi'nde ekipmanı güçlü, ortamı samimi, çalışması keyifli spor salonu.</h2>
        <p>
          BestForm Gym'de amaç sadece üyelik açmak değil; salona gelen kişinin kendini rahat hissetmesi, doğru
          çalışması ve sporu hayatına gerçekten ekleyebilmesi.
        </p>
      </div>

      <div className="galleryGrid" aria-label="Bestform salon fotoğrafları">
        {gallery.map((item) => (
          <figure key={item.title} className="photoTile">
            <img src={item.image} alt={`${item.title} - BestForm Gym Adana Seyhan spor salonu`} loading="lazy" />
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
