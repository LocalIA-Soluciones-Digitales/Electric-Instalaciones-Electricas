import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import CookieConsent from "@/components/CookieConsent";
import Analytics, { GtmNoscript } from "@/components/Analytics";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import { business } from "@/lib/business";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(business.domain),
  title: {
    default: "Electricista en Barakaldo y Bizkaia 24h | Electric Instalaciones Eléctricas",
    template: "%s | Electric Instalaciones Eléctricas",
  },
  description:
    "Electricista urgente 24 horas en Barakaldo, Bilbao y toda Bizkaia. Averías, cuadros eléctricos, instalaciones y reparaciones. Presupuesto sin compromiso. Llama al 624 64 51 09.",
  keywords: [
    "electricista barakaldo",
    "electricista cruces",
    "electricista bizkaia",
    "electricista bilbao",
    "electricista euskadi",
    "electricista urgente",
    "avería eléctrica",
    "electricista 24 horas",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: business.domain,
    siteName: business.name,
    title: "Electricista en Barakaldo y Bizkaia 24h | Electric",
    description:
      "Electricista urgente 24 horas en Barakaldo, Bilbao y toda Bizkaia. Presupuesto sin compromiso.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Analytics />
        <GtmNoscript />
        <LocalBusinessSchema />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingButtons />
        <CookieConsent />
      </body>
    </html>
  );
}
