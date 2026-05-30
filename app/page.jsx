"use client";

import { useMemo, useState } from "react";

const navItems = [
  ["Deneyim", "experience"],
  ["Programlar", "programs"],
  ["Dersler", "schedule"],
  ["Paketler", "pricing"],
  ["Yorumlar", "reviews"],
  ["İletişim", "contact"]
];

const goalPlans = {
  fat: {
    title: "Fit Start",
    coach: "Elif K.",
    details:
      "Haftada 3 gün kuvvet, kısa interval kardiyo ve ölçüm takibiyle yağ yakımı odaklı başlangıç planı.",
    tempo: "12 hafta"
  },
  muscle: {
    title: "Strength Lab",
    coach: "Can Y.",
    details:
      "Aşamalı yüklenme, teknik kontrol ve kas grubu önceliklendirmesiyle daha güçlü bir vücut planı.",
    tempo: "16 hafta"
  },
  mobility: {
    title: "Move Better",
    coach: "Deniz A.",
    details:
      "Bel, kalça, omuz ve core hattını toparlayan mobilite, pilates ve temel kuvvet akışı.",
    tempo: "8 hafta"
  }
};

const programs = [
  {
    label: "En çok seçilen",
    title: "Total Fit",
    text: "Yoğun iş temposuna uygun, haftada 3 gün uygulanabilen kuvvet ve kondisyon sistemi.",
    bullets: ["Kişisel ölçüm", "Kuvvet + HIIT", "Aylık ilerleme raporu"]
  },
  {
    label: "Güç",
    title: "Barbell Club",
    text: "Squat, bench, deadlift ve yardımcı hareketlerde güvenli teknik ve güçlü ilerleme.",
    bullets: ["Teknik seans", "Program güncelleme", "Performans testleri"]
  },
  {
    label: "Denge",
    title: "Pilates Studio",
    text: "Daha iyi duruş, daha güçlü core ve günlük hayatta rahat hareket için kontrollü dersler.",
    bullets: ["Mat pilates", "Mobilite", "Nefes ve esneme"]
  }
];

const days = {
  pzt: [
    ["07:30", "Mobility Flow", "Deniz A.", "Orta"],
    ["19:00", "HIIT Circuit", "Elif K.", "Yoğun"]
  ],
  sal: [
    ["18:30", "Strength Basics", "Can Y.", "Yeni"],
    ["20:00", "Core Conditioning", "Elif K.", "Orta"]
  ],
  car: [
    ["07:30", "Run Club", "Takım", "Açık"],
    ["19:30", "Upper Strength", "Can Y.", "İleri"]
  ],
  per: [
    ["18:30", "Pilates", "Deniz A.", "Yeni"],
    ["20:00", "Functional Team", "Elif K.", "Yoğun"]
  ],
  cum: [
    ["19:00", "Lower Strength", "Can Y.", "Orta"],
    ["20:15", "Recover", "Deniz A.", "Kolay"]
  ],
  cmt: [
    ["11:00", "Weekend Challenge", "Takım", "Yoğun"],
    ["12:15", "Mobility Reset", "Deniz A.", "Kolay"]
  ]
};

const dayLabels = [
  ["pzt", "Pzt"],
  ["sal", "Sal"],
  ["car", "Çar"],
  ["per", "Per"],
  ["cum", "Cum"],
  ["cmt", "Cmt"]
];

const reviews = [
  {
    name: "Melis",
    result: "-7 kg / 12 hafta",
    text: "Program netti, takip düzenliydi. En güzeli kalabalıkta kaybolmadan gerçekten ilgilenmeleri."
  },
  {
    name: "Emre",
    result: "+18 kg squat",
    text: "Tekniğim düzeldi, ağırlıklar kontrollü arttı. İlk kez sürdürebildiğim bir sistem oldu."
  },
  {
    name: "Ayşe",
    result: "Daha iyi duruş",
    text: "Mobilite dersleri bel ağrımı ciddi azalttı. Salonun enerjisi motive edici ama yorucu değil."
  }
];

const faqs = [
  [
    "Ücretsiz deneme nasıl işliyor?",
    "Kısa bir hedef görüşmesi yapıyoruz, ardından seviyene göre 35 dakikalık tanışma antrenmanı planlıyoruz."
  ],
  [
    "Yeni başlayanlar için uygun mu?",
    "Evet. İlk ay temel hareket kalitesi, doğru tempo ve güvenli alışkanlıklar üzerine kurulu ilerliyor."
  ],
  [
    "Paketlerde program takibi var mı?",
    "Tüm üyeliklerde giriş ölçümü, program planlama ve belirli aralıklarla güncelleme desteği bulunur."
  ],
  [
    "Ders iptalleri nasıl oluyor?",
    "Dersler 24 saat öncesine kadar ücretsiz iptal edilebilir. Sonrasında iptal hakkı kaybolur ancak telafi dersi sunulur."
  ]
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [goal, setGoal] = useState("fat");
  const [activeDay, setActiveDay] = useState("pzt");
  const [openFaq, setOpenFaq] = useState(0);
  const [sent, setSent] = useState(false);

  const activePlan = useMemo(() => goalPlans[goal], [goal]);

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
      <header className="siteHeader">
        <a className="brand" href="#top" onClick={() => setMenuOpen(false)}>
          <span className="brandMark">BF</span>
          <span>
            BESTFORM
            <strong>GYM</strong>
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

        <nav className={menuOpen ? "nav navOpen" : "nav"}>
          {navItems.map(([label, id]) => (
            <button key={id} type="button" onClick={() => handleAnchor(id)}>
              {label}
            </button>
          ))}
        </nav>

        <button className="headerCta" type="button" onClick={() => handleAnchor("contact")}>
          Deneme randevusu
        </button>
      </header>

      <section className="hero" id="top">
        <div className="heroMedia" aria-hidden="true" />
        <div className="heroShade" aria-hidden="true" />
        <div className="heroContent">
          <p className="kicker">İlk ders ücretsiz. Kontenjanlar haftalık açılır.</p>
          <h1>BESTFORM GYM</h1>
          <p className="heroLead">
            Daha güçlü, daha fit ve daha düzenli hissetmen için tasarlanmış premium
            antrenman kulübü. Programın hedefinden, seviyenden ve günlük hayatından başlar.
          </p>
          <div className="heroActions">
            <button className="primaryButton" type="button" onClick={() => handleAnchor("contact")}>
              Ücretsiz denemeyi planla
            </button>
            <button className="secondaryButton" type="button" onClick={() => handleAnchor("programs")}>
              Programları gör
            </button>
          </div>
          <div className="heroStats" aria-label="BESTFORM GYM istatistikleri">
            <span>
              <strong>350+</strong>
              aktif üye
            </span>
            <span>
              <strong>24</strong>
              haftalık ders
            </span>
            <span>
              <strong>%92</strong>
              devam oranı
            </span>
          </div>
        </div>
        <div className="scrollCue">DENEYİM</div>
      </section>

      <section className="experience" id="experience">
        <div className="sectionIntro">
          <p className="sectionLabel">Salon deneyimi</p>
          <h2>Kalabalık bir spor salonu değil, hedef odaklı bir çalışma alanı.</h2>
          <p>
            Giriş ölçümü, hareket analizi, antrenör eşleşmesi ve aylık kontrol sistemiyle
            üyeliğin sadece salona giriş değil, gerçek bir dönüşüm planı olur.
          </p>
        </div>

        <div className="experienceGrid">
          <article>
            <span>01</span>
            <h3>Ölçümle başla</h3>
            <p>Hedef, geçmiş deneyim, mobilite ve zaman planın birlikte değerlendirilir.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Planla çalış</h3>
            <p>Programın haftalık dersler, serbest antrenman ve toparlanma günleriyle kurulur.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Takip et</h3>
            <p>Her ay ölçüm ve performans notlarıyla neyin işe yaradığını net görürsün.</p>
          </article>
        </div>
      </section>

      <section className="splitSection" id="programs">
        <div className="imagePanel trainingImage" aria-label="BESTFORM antrenman alanı" />
        <div className="contentPanel">
          <p className="sectionLabel">Programlar</p>
          <h2>Hedefine göre akıllı başlangıç.</h2>
          <p>
            Aşağıdan hedefini seç, ilk görüşmede konuşacağımız örnek program iskeletini gör.
          </p>

          <div className="goalTabs" role="tablist" aria-label="Hedef seçimi">
            {Object.entries(goalPlans).map(([key, plan]) => (
              <button
                key={key}
                type="button"
                className={goal === key ? "isActive" : ""}
                onClick={() => setGoal(key)}
              >
                {plan.title}
              </button>
            ))}
          </div>

          <div className="planBox">
            <div>
              <span>Önerilen plan</span>
              <h3>{activePlan.title}</h3>
            </div>
            <p>{activePlan.details}</p>
            <dl>
              <div>
                <dt>Antrenör</dt>
                <dd>{activePlan.coach}</dd>
              </div>
              <div>
                <dt>Süre</dt>
                <dd>{activePlan.tempo}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="programCards" aria-label="Öne çıkan programlar">
        {programs.map((program) => (
          <article key={program.title} className="infoCard">
            <span>{program.label}</span>
            <h3>{program.title}</h3>
            <p>{program.text}</p>
            <ul>
              {program.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="scheduleSection" id="schedule">
        <div className="sectionIntro">
          <p className="sectionLabel">Ders akışı</p>
          <h2>Haftanı kolayca planla.</h2>
          <p>Demo takvimdir; gerçek saatler ve kontenjanlar salon yönetimi tarafından güncellenebilir.</p>
        </div>

        <div className="dayTabs" role="tablist" aria-label="Ders günü seçimi">
          {dayLabels.map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={activeDay === key ? "isActive" : ""}
              onClick={() => setActiveDay(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="scheduleList">
          {days[activeDay].map(([time, title, coach, level]) => (
            <article key={`${time}-${title}`} className="scheduleItem">
              <strong>{time}</strong>
              <div>
                <h3>{title}</h3>
                <p>{coach}</p>
              </div>
              <span>{level}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="pricingSection" id="pricing">
        <div className="sectionIntro">
          <p className="sectionLabel">Üyelik</p>
          <h2>Net paketler, sürprizsiz başlangıç.</h2>
        </div>
        <div className="pricingGrid">
          <article className="priceCard">
            <h3>Esnek</h3>
            <p className="price">1.200 TL</p>
            <p>Ay ay yenilenir. Haftada 3 gün giriş ve program desteği.</p>
            <button type="button" onClick={() => handleAnchor("contact")}>
              Bilgi al
            </button>
          </article>
          <article className="priceCard featured">
            <span>Önerilen</span>
            <h3>Dönüşüm</h3>
            <p className="price">950 TL</p>
            <p>Sınırsız giriş, aylık program güncelleme ve ölçüm takibi.</p>
            <button type="button" onClick={() => handleAnchor("contact")}>
              Deneme planla
            </button>
          </article>
          <article className="priceCard">
            <h3>PT</h3>
            <p className="price">750 TL</p>
            <p>Birebir antrenman, teknik analiz ve online takip.</p>
            <button type="button" onClick={() => handleAnchor("contact")}>
              Antrenör seç
            </button>
          </article>
        </div>
      </section>

      <section className="reviewsSection" id="reviews">
        <div className="sectionIntro">
          <p className="sectionLabel">Üye yorumları</p>
          <h2>Sonuçlar ölçülür, motivasyon paylaşılır.</h2>
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

      <section className="splitSection contactSplit" id="contact">
        <div className="contentPanel">
          <p className="sectionLabel">İletişim</p>
          <h2>İlk deneme dersini planlayalım.</h2>
          <p>
            Formu doldur, ekibimiz uygun saatleri paylaşsın. Demo yapıda kayıtlar
            tarayıcıda kalır; gerçek kullanım için e-posta veya CRM entegrasyonu eklenebilir.
          </p>

          <div className="contactFacts">
            <p>
              <strong>Telefon</strong>
              <a href="tel:+905551112233">+90 555 111 22 33</a>
            </p>
            <p>
              <strong>Adres</strong>
              Örnek Mahallesi, Spor Caddesi No: 10
            </p>
            <p>
              <strong>Saatler</strong>
              Hafta içi 07:00-23:00, hafta sonu 09:00-21:00
            </p>
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
            Hedefin
            <select name="goal" defaultValue="Yağ yakma">
              <option>Yağ yakma</option>
              <option>Kas geliştirme</option>
              <option>Genel sağlık</option>
              <option>Performans</option>
            </select>
          </label>
          <label>
            Uygun zaman
            <select name="time" defaultValue="Hafta içi akşam">
              <option>Hafta içi sabah</option>
              <option>Hafta içi akşam</option>
              <option>Hafta sonu</option>
            </select>
          </label>
          <button className="primaryButton" type="submit">
            Randevu talebi gönder
          </button>
          {sent && <p className="successMessage">Teşekkürler. Talebin alındı, ekip kısa sürede arayacak.</p>}
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
        <span>BESTFORM GYM</span>
        <p>2026. Modern fitness deneyimi için Next.js tek sayfa reklam sitesi.</p>
      </footer>
    </main>
  );
}
