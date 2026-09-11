import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import MobileBar from "@/components/MobileBar";
import CookieConsent from "@/components/CookieConsent";
import Analytics from "@/components/Analytics";
import ConsentGate from "@/components/ConsentGate";
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
    default: `Electricista en Barakaldo y Euskadi 24 Horas | ${business.shortName}`,
    template: `%s | ${business.shortName}`,
  },
  description:
    "Electricista urgente 24 horas en Barakaldo, Bilbao y toda Euskadi. Averías, cuadros eléctricos, instalaciones y reparaciones. Presupuesto sin compromiso. Llama al 677 24 63 74.",
  keywords: [
    "electricista barakaldo",
    "electricista cruces",
    "electricista bizkaia",
    "electricista bilbao",
    "electricista euskadi",
    "electricista gipuzkoa",
    "electricista araba",
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
    title: "Electricista en Barakaldo y Euskadi 24h | Electric",
    description:
      "Electricista urgente 24 horas en Barakaldo, Bilbao y toda Euskadi. Presupuesto sin compromiso.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${jakarta.variable} ${sora.variable} h-full antialiased`}>
      <head>
        {/* Autoalojado (public/fonts/remixicon): evita la petición externa a
            cdnjs.cloudflare.com que bloqueaba el render antes de pintar cualquier
            icono. El preload adelanta la descarga del woff2 en paralelo al CSS. */}
        <link
          rel="preload"
          href="/fonts/remixicon/remixicon.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="/fonts/remixicon/remixicon.css" />
      </head>
      <body className="flex min-h-full flex-col bg-neutral-950 pb-20 md:pb-0">
        <ConsentGate>
          <Analytics />
        </ConsentGate>
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
