import "./globals.css";

export const metadata = {
  title: "BESTFORM GYM & Health Center | Adana Spor Salonu",
  description:
    "BESTFORM GYM & Health Center; Adana Barajyolu/Sümer'de body building, fitness, pilates ve personal training hizmetleri sunan spor salonu.",
  keywords: [
    "BESTFORM GYM",
    "Bestform Gym Adana",
    "Adana spor salonu",
    "Seyhan fitness",
    "Barajyolu spor salonu",
    "body building",
    "pilates",
    "personal training"
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
