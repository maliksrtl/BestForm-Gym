"use client";

import { useMemo, useState } from "react";

const instagramUrl = "https://www.instagram.com/bestformgym/";
const phoneDisplay = "(0322) 227 13 90";
const phoneHref = "tel:+903222271390";
const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=Bestform%20Gym%20%26%20Health%20Center%20S%C3%BCmer%2069061.%20Sk.%20Seyhan%20Adana";

const navItems = [
  ["Hizmetler", "services"],
  ["Akış", "social"],
  ["Salon", "facility"],
  ["Ekip", "coach"],
  ["Saatler", "hours"],
  ["Yorumlar", "reviews"],
  ["İletişim", "contact"]
];

const profile = {
  username: "@bestformgym",
  followers: "747",
  following: "562",
  posts: "621",
  bio: ["Body Building", "Fitness", "Pilates", "Personal Training"],
  location: "Barajyolu ADANA"
};

const gallery = [
  {
    title: "Bestform antrenman alanı",
    image: "https://lh5.googleusercontent.com/p/AF1QipNyXj6v5rEyGgor3JvdIwfEZmZqcY9KmzmwpsbK=w1200-h900-k-no"
  },
  {
    title: "Ağırlık ve makine bölümü",
    image: "https://lh5.googleusercontent.com/p/AF1QipP4tzU-fw-J7R5EImsihdJPYaOnZ2iTfiYzkVgg=w1200-h900-k-no"
  },
  {
    title: "Salon içi ekipman düzeni",
    image: "https://lh5.googleusercontent.com/p/AF1QipPRswbgoWxXKtRLxdZnJUBwKM-Xr2of-lDXt4vI=w1200-h900-k-no"
  }
];

const services = [
  {
    label: "Body Building",
    title: "Serbest ağırlık ve makineyle kas gelişimi",
    text:
      "Belirli kas gruplarına yönelik cihazlar, serbest ağırlıklar ve bölgesel çalışma düzeniyle daha güçlü, daha belirgin bir form hedefleyen üyeler için.",
    points: ["Bölgesel cihaz çeşitliliği", "Serbest ağırlık alanı", "Teknik form takibi"]
  },
  {
    label: "Fitness",
    title: "Kilo kontrolü ve kondisyon rutini",
    text:
      "Kilo kontrolü, günlük enerji ve düzenli spor alışkanlığı için seviyene göre ilerleyen, sürdürülebilir salon programları.",
    points: ["Yeni başlayan desteği", "Kondisyon çalışmaları", "Program düzeni"]
  },
  {
    label: "Pilates",
    title: "Core, duruş ve esneklik",
    text:
      "Daha kontrollü hareket, güçlü merkez bölge ve günlük yaşamda rahatlık için pilates odaklı çalışma alanı.",
    points: ["Core kuvveti", "Mobilite", "Duruş farkındalığı"]
  },
  {
    label: "Personal Training",
    title: "İsmail Hoca ve ekipten birebir yönlendirme",
    text:
      "Alet kullanımı, program kurma ve motivasyon tarafında daha yakın ilgi isteyen üyeler için hedefe göre kişisel yönlendirme.",
    points: ["Alet kullanımı", "Hedefe göre plan", "Antrenman motivasyonu"]
  }
];

const instagramSignals = [
  {
    title: "Hareket anlatımı",
    value: "Form önce",
    text: "Gönderi ve video dili, antrenmanı gösterişten çok hareketin doğru uygulanması ve hedef kasın hissedilmesi etrafında topluyor."
  },
  {
    title: "Ekipman kullanımı",
    value: "Makine + ağırlık",
    text: "İçerik akışındaki salon görüntüleri; makine çeşitliliği, serbest ağırlık alanı ve bölgesel çalışma imkanını öne çıkarıyor."
  },
  {
    title: "Hoca yaklaşımı",
    value: "Yakın takip",
    text: "Videolardaki bilgilendirici ton, yorumlardaki İsmail Hoca vurgusuyla birleşiyor; yeni başlayanlar için güven hissi veriyor."
  },
  {
    title: "Salon atmosferi",
    value: "Seviyeli ortam",
    text: "Akıştaki salon havası ve yorumlar, Bestform'u bay-bayan rahatça gelebilecek, kurallı ve çalışmaya odaklı bir mekan olarak konumlandırıyor."
  }
];

const proofPoints = [
  {
    title: "İsmail Hoca ilgisi",
    text: "Yorumlarda en çok tekrar eden değer; motivasyon, yönlendirme ve yeni başlayanlara güven veren yaklaşım."
  },
  {
    title: "Alet çeşitliliği",
    text: "Farklı kas grupları için yeterli sayıda cihaz, serbest çalışma alanı ve verimli makine düzeni öne çıkıyor."
  },
  {
    title: "Seviyeli ortam",
    text: "Üyeler salonun bay-bayan rahatça gelebileceği, kurallı ve saygılı bir atmosfere sahip olduğunu söylüyor."
  },
  {
    title: "Fiyat-performans",
    text: "Eski yorumlarda uygun fiyat, geniş mekan ve verilen ilgi birlikte anılıyor; güncel ücret için aramak en doğrusu."
  }
];

const hours = [
  ["Pazartesi", "09:00 - 23:00"],
  ["Salı", "09:00 - 23:00"],
  ["Çarşamba", "09:00 - 23:00"],
  ["Perşembe", "09:00 - 23:00"],
  ["Cuma", "09:00 - 23:00"],
  ["Cumartesi", "09:00 - 21:00"],
  ["Pazar", "Kapalı"]
];

const reviews = [
  {
    name: "Cafer G.",
    result: "Motivasyon ve ortam",
    text:
      "Yeterli ekipman, kolay ulaşım, seviyeli ortam ve İsmail Hoca'nın motivasyon veren ilgisi öne çıkıyor."
  },
  {
    name: "Ömer Ö.",
    result: "Hijyen ve ilgi",
    text:
      "Cihazların sağlamlığı, hocaların ilgisi ve salonun temizliği özellikle olumlu yorumlanmış."
  },
  {
    name: "Emre D.",
    result: "Fiyat-performans",
    text:
      "Temiz salon, ilgili hoca ve uygun üyelik algısı öne çıkıyor; duş konusu için güncel bilgiyi arayarak teyit etmek iyi olur."
  },
  {
    name: "Farpex",
    result: "Geniş ve kurallı ortam",
    text:
      "Kurallara uyulan, geniş ve rahat bir çalışma alanı olduğu; fiyatına göre güçlü bir kalite verdiği anlatılıyor."
  },
  {
    name: "Ferit E.",
    result: "Kas grubu ekipmanları",
    text:
      "Belirli kas grupları için cihaz çeşitliliği ve makinelerden verim alma tarafı olumlu değerlendiriliyor."
  }
];

const faqs = [
  [
    "Yeni başlayan biri gelebilir mi?",
    "Evet. Yorumlarda özellikle alet kullanımı ve motivasyon tarafında hoca ilgisinin güçlü olduğu görülüyor."
  ],
  [
    "Kadın ve erkek üyeler için uygun mu?",
    "Yorumlarda bay-bayan çekinmeden gelebilecek seviyeli bir ortam vurgusu yapılıyor."
  ],
  [
    "Güncel ücretler sitede var mı?",
    "Fiyatlar değişebileceği için kesin üyelik bilgisini telefonla veya salona uğrayarak almak en doğrusu."
  ],
  [
    "Duş imkanı var mı?",
    "Bir kullanıcı yorumunda duş olmadığı not edilmiş. Güncel durum değişmiş olabileceği için salona gitmeden arayarak teyit et."
  ],
  [
    "Çalışma saatleri kesin mi?",
    "Rehber kaynaklardaki güncel saatleri gösteriyoruz; resmi tatil ve özel günler için arayarak teyit edebilirsin."
  ]
];

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "ExerciseGym",
  name: "BESTFORM GYM & Health Center",
  image: gallery.map((item) => item.image),
  url: instagramUrl,
  telephone: "+90 322 227 13 90",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sümer, 69061. Sk.",
    addressLocality: "Seyhan",
    addressRegion: "Adana",
    postalCode: "01140",
    addressCountry: "TR"
  },
  sameAs: [instagramUrl],
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "11:00", closes: "22:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "13:00", closes: "22:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "15:00", closes: "21:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "13:00", closes: "22:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "13:00", closes: "22:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "12:00", closes: "21:00" }
  ]
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [sent, setSent] = useState(false);

  const selectedService = useMemo(() => services[activeService], [activeService]);

  const handleAnchor = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const submitLead = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <header className="siteHeader">
        <a className="brand" href="#top" onClick={() => setMenuOpen(false)}>
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
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>

        <nav className={menuOpen ? "nav navOpen" : "nav"} aria-label="Site bölümleri">
          {navItems.map(([label, id]) => (
            <button key={id} type="button" onClick={() => handleAnchor(id)}>
              {label}
            </button>
          ))}
        </nav>

        <a className="headerCta" href={phoneHref}>
          Ara
        </a>
      </header>

      <section className="hero" id="top">
        <div className="heroMedia" style={{ backgroundImage: `url("${gallery[0].image}")` }} aria-hidden="true" />
        <div className="heroShade" aria-hidden="true" />
        <div className="heroContent">
          <p className="kicker">Barajyolu / Sümer, Seyhan ADANA</p>
          <h1>BESTFORM GYM</h1>
          <p className="heroLead">
            Body building, fitness, pilates ve personal training için ulaşımı kolay, ekipman çeşitliliği güçlü, hoca ilgisiyle öne çıkan Adana spor salonu.
          </p>
          <div className="heroActions">
            <a className="primaryButton" href={phoneHref}>
              {phoneDisplay}
            </a>
            <button className="secondaryButton" type="button" onClick={() => handleAnchor("services")}>
              Hizmetleri gör
            </button>
            <a className="ghostButton" href={instagramUrl} target="_blank" rel="noreferrer">
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

      <section className="servicesSection" id="services">
        <div className="sectionIntro">
          <p className="sectionLabel">Hizmetler</p>
          <p>
            Bestform'un açık profilinde verdiği hizmet çerçevesi net: body building, fitness, pilates ve personal training.
          </p>
        </div>

        <div className="servicePicker" role="tablist" aria-label="Hizmet seçimi">
          {services.map((service, index) => (
            <button
              key={service.label}
              type="button"
              className={activeService === index ? "isActive" : ""}
              onClick={() => setActiveService(index)}
            >
              {service.label}
            </button>
          ))}
        </div>

        <div className="servicePanel">
          <div>
            <span>{selectedService.label}</span>
            <h3>{selectedService.title}</h3>
            <p>{selectedService.text}</p>
          </div>
          <ul>
            {selectedService.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="socialSection" id="social">
        <div className="socialProfile">
          <p className="sectionLabel">Instagram akışı</p>
          <h2>{profile.username}</h2>
          <p className="socialBio">
            {profile.bio.join(" / ")}
            <strong>{profile.location}</strong>
          </p>
          <p className="socialNote">
            Kısa video ve gönderi akışında öne çıkan çizgi: doğru form, ekipman odağı, yakın hoca yönlendirmesi ve çalışmaya odaklı salon atmosferi.
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
          <a className="ghostButton" href={instagramUrl} target="_blank" rel="noreferrer">
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

      <section className="facilitySection" id="facility">
        <div className="sectionIntro">
          <p className="sectionLabel">Salon</p>
          <h2>Fotoğraflar ve yorumlar aynı şeyi söylüyor: makine çeşitliliği güçlü, ortam net.</h2>
          <p>
            Salon görsellerinde ağırlık ve makine alanı öne çıkarken, üyeler ekipman çeşitliliğini ve rahat çalışma düzenini tekrar tekrar vurguluyor.
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

      <section className="coachSection" id="coach">
        <div className="coachVisual" style={{ backgroundImage: `url("${gallery[1].image}")` }} aria-hidden="true" />
        <div className="coachContent">
          <p className="sectionLabel">Hoca & ekip</p>
          <h2>Yorumlarda adı en çok geçen değer: İsmail Hoca'nın ilgisi.</h2>
          <p>
            Üye yorumlarında hoca ilgisi, motivasyon, alet kullanımında yönlendirme ve yeni başlayanlara güven veren yaklaşım tekrar tekrar öne çıkıyor.
          </p>
          <div className="coachCard">
            <span className="coachBadge">İH</span>
            <div>
              <h3>İsmail Hoca</h3>
              <p>Alet kullanımı, motivasyon, salon düzeni ve seviyeli atmosfer tarafında üyelerin özellikle vurguladığı isim.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="hoursSection" id="hours">
        <div className="sectionIntro">
          <p className="sectionLabel">Saatler</p>
          <h2>Haftanı planlamadan önce açık saatleri kontrol et.</h2>
          <p>
            Rehber kaynaklarda görünen çalışma saatleri aşağıda. Resmi tatil ve özel günlerde telefonla teyit etmek en sağlıklısı.
          </p>
        </div>

        <div className="hoursGrid">
          {hours.map(([day, time]) => (
            <article key={day} className={time === "Kapalı" ? "hourItem closed" : "hourItem"}>
              <strong>{day}</strong>
              <span>{time}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="reviewsSection" id="reviews">
        <div className="sectionIntro">
          <p className="sectionLabel">Üye yorumları</p>
          <h2>Üyelerin en çok anlattığı şeyler: İsmail Hoca, ekipman, temizlik ve rahat çalışma ortamı.</h2>
        </div>
        <div className="reviewGrid">
          {reviews.map((review) => (
            <article key={review.name} className="reviewCard">
              <p>{review.text}</p>
              <div>
                <strong>{review.name}</strong>
                <span>{review.result}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contactSection" id="contact">
        <div className="contactCopy">
          <p className="sectionLabel">İletişim</p>
          <h2>Salona uğra, ara ya da Instagram'dan mesaj at.</h2>
          <p>
            Güncel üyelik, pilates, personal training ve çalışma saatleri için en hızlı yol telefonla ulaşmak.
          </p>

          <div className="contactFacts">
            <p>
              <strong>Telefon</strong>
              <a href={phoneHref}>{phoneDisplay}</a>
            </p>
            <p>
              <strong>Adres</strong>
              Sümer, 69061. Sk., 01140 Seyhan/Adana
            </p>
            <p>
              <strong>Instagram</strong>
              <a href={instagramUrl} target="_blank" rel="noreferrer">
                @bestformgym
              </a>
            </p>
          </div>

          <div className="contactActions">
            <a className="primaryButton" href={phoneHref}>
              Hemen ara
            </a>
            <a className="secondaryButton" href={mapUrl} target="_blank" rel="noreferrer">
              Yol tarifi
            </a>
          </div>
        </div>

        <form className="leadForm" onSubmit={submitLead}>
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
          {sent && <p className="successMessage">Talebin alındı. Ekip en kısa sürede dönüş yapacak.</p>}
        </form>
      </section>

      <section className="faqSection">
        <div className="sectionIntro">
          <p className="sectionLabel">SSS</p>
          <h2>Başlamadan önce.</h2>
        </div>
        <div className="faqList">
          {faqs.map(([question, answer], index) => (
            <button
              key={question}
              type="button"
              className="faqItem"
              aria-expanded={openFaq === index}
              onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
            >
              <span>{question}</span>
              <strong>{openFaq === index ? "-" : "+"}</strong>
              {openFaq === index && <p>{answer}</p>}
            </button>
          ))}
        </div>
      </section>

      <footer className="footer">
        <span>BESTFORM GYM & HEALTH CENTER</span>
        <p>Barajyolu / Sümer, Seyhan ADANA</p>
      </footer>
    </main>
  );
}
