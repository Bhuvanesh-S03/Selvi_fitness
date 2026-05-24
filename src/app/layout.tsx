import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Script from "next/script";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://selvifitness.com"),
  title: "Selvi Fitness | Best Gym in Villianur & Puducherry",
  description: "Join the best premium unisex gym in Villianur, Puducherry. Elite strength training, CrossFit, weight loss programs, and personal training gym near Villianur.",
  keywords: ["Best gym in Villianur", "Best gym in Puducherry", "Unisex gym in Puducherry", "Strength training in Villianur", "CrossFit training in Villianur", "Weight loss gym in Puducherry", "Personal training gym near Villianur", "Fitness center in Puducherry", "Bodybuilding gym in Villianur"],
  authors: [{ name: "Selvi Fitness" }],
  creator: "Selvi Fitness",
  alternates: {
    canonical: "https://selvifitness.com",
  },
  openGraph: {
    title: "Selvi Fitness | Best Premium Gym in Villianur",
    description: "Transform your body with our expert coaching. Best unisex gym in Puducherry offering strength training, CrossFit, and personal training.",
    url: "https://selvifitness.com",
    siteName: "Selvi Fitness",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://selvifitness.com/gallery/hero_section.png",
        width: 1200,
        height: 630,
        alt: "Selvi Fitness Gym Premium Training",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Selvi Fitness | Best Gym in Villianur",
    description: "Join the best premium unisex gym in Villianur, Puducherry.",
    images: ["https://selvifitness.com/gallery/hero_section.png"],
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Gym", "HealthAndBeautyBusiness", "LocalBusiness"],
    "name": "Selvi Fitness",
    "image": "https://selvifitness.com/gallery/hero_section.png",
    "@id": "https://selvifitness.com",
    "url": "https://selvifitness.com",
    "telephone": "+919677581202",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Opposite to Shree Raja Thirumana Mahal",
      "addressLocality": "Villianur",
      "addressRegion": "Puducherry",
      "postalCode": "605110",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 11.917056,
      "longitude": 79.753028
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "05:00",
        "closes": "22:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "06:00",
        "closes": "12:00"
      }
    ],
    "priceRange": "$$",
    "sameAs": [
      "https://www.instagram.com/selvifitness",
      "https://www.facebook.com/selvifitness"
    ]
  };

  return (
    <html lang="en" className={`${inter.variable} antialiased bg-[#050505] text-white`}>
      <head>
        <Script
          id="json-ld-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
        {/* Google Analytics 4 Placeholder */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
