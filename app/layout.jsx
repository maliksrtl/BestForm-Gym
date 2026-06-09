import "./globals.css";

import { siteConfig } from "@/src/config/site";

export const metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  applicationName: siteConfig.shortName,
  title: {
    default: siteConfig.metadata.title,
    template: `%s | ${siteConfig.shortName}`
  },
  description: siteConfig.metadata.description,
  keywords: siteConfig.metadata.keywords,
  category: "fitness",
  icons: {
    icon: [
      { url: siteConfig.faviconPath, type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" }
    ],
    shortcut: siteConfig.faviconPath,
    apple: siteConfig.appleTouchIconPath
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: siteConfig.metadata.title,
    description: siteConfig.metadata.description,
    url: "/",
    siteName: siteConfig.name,
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: siteConfig.defaultOgImage,
        width: 1200,
        height: 630,
        alt: "BestForm Gym Adana Seyhan spor salonu"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.metadata.title,
    description: siteConfig.metadata.description,
    images: [siteConfig.defaultOgImage]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  other: {
    "geo.region": "TR-01",
    "geo.placename": "Seyhan, Adana",
    "business:contact_data:locality": "Seyhan",
    "business:contact_data:region": "Adana",
    "business:contact_data:country_name": "Turkey"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
