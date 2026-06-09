import { notFound } from "next/navigation";

import { siteConfig } from "@/src/config/site";
import { seoLandingLinks } from "@/src/features/marketing/content";
import {
  getSeoLandingPage,
  getSeoLandingPageRoutes
} from "@/src/features/marketing/seoLandingPages";
import { createLandingJsonLd } from "@/src/features/marketing/structuredData";

export function generateStaticParams() {
  return getSeoLandingPageRoutes();
}

export async function generateMetadata({ params }) {
  const { seoSlug } = await params;
  const page = getSeoLandingPage(seoSlug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical: `/${page.slug}`
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `/${page.slug}`,
      siteName: siteConfig.name,
      locale: "tr_TR",
      type: "website",
      images: [
        {
          url: page.image,
          width: 1200,
          height: 630,
          alt: page.h1
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [page.image]
    }
  };
}

export default async function SeoLandingPage({ params }) {
  const { seoSlug } = await params;
  const page = getSeoLandingPage(seoSlug);

  if (!page) {
    notFound();
  }

  const relatedLinks = seoLandingLinks.filter((link) => link.href !== `/${page.slug}`);

  return (
    <main className="seoPage">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(createLandingJsonLd(page)) }}
      />

      <header className="seoHeader">
        <a href="/" className="brand">
          <span className="brandMark">BF</span>
          <span>
            BESTFORM
            <strong>GYM & HEALTH CENTER</strong>
          </span>
        </a>
        <nav aria-label="Hızlı bağlantılar">
          <a href="/">Ana sayfa</a>
          <a href="/#services">Hizmetler</a>
          <a href="/#contact">İletişim</a>
        </nav>
        <a className="headerCta" href={siteConfig.phoneHref}>
          Ara
        </a>
      </header>

      <section className="seoHero">
        <div>
          <p className="sectionLabel">{page.kicker}</p>
          <h1>{page.h1}</h1>
          <p>{page.intro}</p>
          <div className="seoHeroActions">
            <a className="primaryButton" href={siteConfig.phoneHref}>
              {siteConfig.phoneDisplay}
            </a>
            <a className="secondaryButton" href={siteConfig.mapUrl} target="_blank" rel="noreferrer">
              Yol tarifi al
            </a>
            <a className="ghostButton" href={`${siteConfig.whatsappUrl}?text=Merhaba,%20bilgi%20almak%20istiyorum.`}>
              WhatsApp
            </a>
          </div>
        </div>
        <figure className="seoHeroPhoto">
          <img src={page.image} alt={`${page.h1} - BestForm Gym`} />
          <figcaption>{siteConfig.address}</figcaption>
        </figure>
      </section>

      <section className="seoHighlights" aria-label={`${page.h1} öne çıkan bilgiler`}>
        {page.highlights.map((highlight) => (
          <article key={highlight}>
            <span>BestForm</span>
            <strong>{highlight}</strong>
          </article>
        ))}
      </section>

      <section className="seoContentGrid">
        {page.sections.map((section) => (
          <article className="seoContentBlock" key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.text}</p>
            <ul>
              {section.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="seoAreaPanel">
        <div>
          <p className="sectionLabel">Hizmet bölgesi</p>
          <h2>{page.areaServed.join(", ")} çevresi için spor salonu bilgisi</h2>
          <p>
            BestForm Gym'in Google Haritalar, telefon ve WhatsApp bilgileri sayfa içinde açıkça yer alır. Yakınındaki
            spor salonlarını karşılaştıran kullanıcılar konumu, hizmetleri ve çalışma saatlerini hızlıca görebilir.
          </p>
        </div>
        <a className="primaryButton" href={siteConfig.mapUrl} target="_blank" rel="noreferrer">
          Haritada aç
        </a>
      </section>

      <section className="seoFaq">
        <div className="sectionIntro">
          <p className="sectionLabel">Sık sorulanlar</p>
          <h2>{page.h1} hakkında merak edilenler</h2>
        </div>
        <div className="faqList">
          {page.faqs.map(([question, answer]) => (
            <details className="seoFaqItem" key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="seoRelated">
        <p className="sectionLabel">Yakın aramalar</p>
        <nav className="areaLinkCloud" aria-label="İlgili BestForm Gym sayfaları">
          {relatedLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </section>
    </main>
  );
}
