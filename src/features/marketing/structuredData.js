import { siteConfig } from "@/src/config/site";
import { businessSchema, faqs } from "@/src/features/marketing/content";

function stripContext(schema) {
  const { "@context": _context, ...node } = schema;
  return node;
}

function faqSchemaFrom(items, id) {
  return {
    "@type": "FAQPage",
    "@id": id,
    mainEntity: items.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer
      }
    }))
  };
}

export function createBreadcrumbSchema(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function createHomeJsonLd() {
  const homeUrl = `${siteConfig.siteUrl}/`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      stripContext(businessSchema),
      {
        "@type": "WebSite",
        "@id": `${siteConfig.siteUrl}/#website`,
        url: siteConfig.siteUrl,
        name: siteConfig.shortName,
        inLanguage: "tr-TR",
        publisher: { "@id": `${siteConfig.siteUrl}/#exercise-gym` }
      },
      {
        "@type": "WebPage",
        "@id": `${homeUrl}#webpage`,
        url: homeUrl,
        name: siteConfig.metadata.title,
        description: siteConfig.metadata.description,
        isPartOf: { "@id": `${siteConfig.siteUrl}/#website` },
        about: { "@id": `${siteConfig.siteUrl}/#exercise-gym` },
        inLanguage: "tr-TR",
        primaryImageOfPage: `${siteConfig.siteUrl}${siteConfig.defaultOgImage}`
      },
      faqSchemaFrom(faqs, `${homeUrl}#faq`)
    ]
  };
}

export function createLandingJsonLd(page) {
  const pageUrl = `${siteConfig.siteUrl}/${page.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      stripContext(businessSchema),
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: page.title,
        description: page.description,
        isPartOf: { "@id": `${siteConfig.siteUrl}/#website` },
        about: { "@id": `${siteConfig.siteUrl}/#exercise-gym` },
        inLanguage: "tr-TR",
        primaryImageOfPage: `${siteConfig.siteUrl}${page.image}`
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: page.serviceName,
        description: page.intro,
        provider: { "@id": `${siteConfig.siteUrl}/#exercise-gym` },
        areaServed: page.areaServed.map((area) => ({ "@type": "Place", name: area })),
        serviceType: page.serviceType
      },
      createBreadcrumbSchema([
        { name: "BESTFORM GYM", url: `${siteConfig.siteUrl}/` },
        { name: page.h1, url: pageUrl }
      ]),
      faqSchemaFrom(page.faqs, `${pageUrl}#faq`)
    ]
  };
}
