import { gallery } from "@/src/features/marketing/content";

export function CoachSection() {
  return (
    <section className="coachSection" id="coach">
      <div className="coachVisual" style={{ backgroundImage: `url("${gallery[1].image}")` }} aria-hidden="true" />
      <div className="coachContent">
        <p className="sectionLabel">Hoca & ekip</p>
        <h2>Yorumlarda adı en çok geçen değer: İsmail Hoca'nın ilgisi.</h2>
        <p>
          Üye yorumlarında hoca ilgisi, motivasyon, alet kullanımında yönlendirme ve yeni başlayanlara güven veren
          yaklaşım tekrar tekrar öne çıkıyor.
        </p>
        <div className="coachCard">
          <span className="coachBadge">İH</span>
          <div>
            <h3>İsmail Hoca</h3>
            <p>
              Alet kullanımı, motivasyon, salon düzeni ve seviyeli atmosfer tarafında üyelerin özellikle vurguladığı
              isim.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
