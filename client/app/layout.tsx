import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://creativio.in"),
  title: {
    default: "Creativio — Best Digital Marketing Agency in Calicut & Malappuram, Kerala",
    template: "%s | Creativio",
  },
  description:
    "Creativio is the best digital marketing agency in Calicut and Malappuram, Kerala. We craft result-driven digital marketing, branding, web development, and creative strategies that help businesses stand out, scale up, and succeed.",
  keywords: [
    "digital marketing agency Calicut",
    "digital marketing agency Malappuram",
    "best digital marketing agency Kerala",
    "branding agency Calicut",
    "web development Calicut",
    "creative agency Kerala",
    "SEO services Calicut",
    "social media marketing Malappuram",
    "digital marketing company Kerala",
    "advertising agency Calicut",
    "Creativio",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Creativio — Best Digital Marketing Agency in Calicut & Malappuram",
    description:
      "Result-driven digital marketing, branding, and creative strategies for businesses across Kerala and beyond.",
    url: "https://creativio.in",
    siteName: "Creativio",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creativio — Best Digital Marketing Agency in Calicut & Malappuram",
    description:
      "Result-driven digital marketing, branding, and creative strategies for businesses across Kerala and beyond.",
  },
  alternates: {
    canonical: "https://creativio.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Creativio",
              url: "https://creativio.in",
              description:
                "Best Digital Marketing Agency in Calicut and Malappuram, Kerala. Result-driven digital marketing, branding, and creative strategies.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Calicut",
                addressRegion: "Kerala",
                addressCountry: "IN",
              },
              sameAs: [],
              areaServed: [
                { "@type": "City", name: "Calicut" },
                { "@type": "City", name: "Malappuram" },
                { "@type": "State", name: "Kerala" },
              ],
              serviceType: [
                "Digital Marketing",
                "Branding",
                "Web Development",
                "SEO",
                "Social Media Marketing",
                "Video Production",
                "CGI and 3D Animation",
              ],
            }),
          }}
        />
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
