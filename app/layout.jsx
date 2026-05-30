import "./globals.css";

export const metadata = {
  title: "BESTFORM GYM | Premium Fitness Deneyimi",
  description:
    "BESTFORM GYM; kişiye özel programlar, güçlü antrenör ekibi ve premium salon deneyimiyle ilk dersten itibaren hedefe odaklanan modern fitness kulübü.",
  keywords: [
    "BESTFORM GYM",
    "spor salonu",
    "fitness",
    "kişisel antrenman",
    "pilates",
    "HIIT",
    "gym"
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
