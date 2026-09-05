import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import MobileBar from "@/components/MobileBar";
import CookieConsent from "@/components/CookieConsent";
import Analytics, { GtmNoscript } from "@/components/Analytics";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import { business } from "@/lib/business";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
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
    <html lang="es" className={`${jakarta.variable} ${sora.variable} h-full antialiased`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.min.css"
        />
      </head>
      <body className="flex min-h-full flex-col bg-neutral-950 pb-20 md:pb-0">
        <Analytics />
        <GtmNoscript />
        <LocalBusinessSchema />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingButtons />
        <MobileBar />
        <CookieConsent />
      </body>
    </html>
  );
}
