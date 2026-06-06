import { gallery } from "@/src/features/marketing/content";

export function CoachSection() {
  return (
    <section className="coachSection" id="coach">
      <div className="coachVisual" style={{ backgroundImage: `url("${gallery[1].image}")` }} aria-hidden="true" />
      <div className="coachContent">
        <p className="sectionLabel">Hoca & ekip</p>
        <h2>İsmail Hoca ve Eda Hoca ile hedefe göre yakın takip.</h2>
        <p>
          Fitness, body building ve pilates tarafında üyeyi yalnız bırakmayan; doğru formu, motivasyonu ve güvenli
          ilerlemeyi önemseyen sıcak bir ekip yaklaşımı öne çıkıyor.
        </p>
        <div className="coachAccordion">
          <details className="coachItem" open>
            <summary>
              <img
                className="coachPhoto"
                src="/images/coaches/ismail-hoca.jpeg"
                alt="İsmail Hoca"
              />
              <span>
                <strong>İsmail Hoca</strong>
                <small>Fitness ve salon takibi</small>
              </span>
            </summary>
            <p>
              Alet kullanımı, motivasyon, salon düzeni ve seviyeli atmosfer tarafında üyelerin özellikle vurguladığı
              isim.
            </p>
          </details>
          <details className="coachItem coachItemAlt">
            <summary>
              <img
                className="coachPhoto"
                src="/images/coaches/eda-hoca.jpeg"
                alt="Eda Hoca"
              />
              <span>
                <strong>Eda Hoca</strong>
                <small>Kadın pilates dersleri</small>
              </span>
            </summary>
            <p>
              Duruş, esneklik ve core gücünü zarif ama disiplinli bir akışla destekleyen; üyeyi rahatlatan, motive eden
              ve güven veren pilates hocası.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}
