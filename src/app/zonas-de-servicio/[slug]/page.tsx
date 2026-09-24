import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { business, telLink, waLink, WHATSAPP_GREETING_URGENT } from "@/lib/business";
import { getService } from "@/lib/services";
import { getZonePage, zonePages } from "@/lib/zonePages";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import Faq, { FaqJsonLd } from "@/components/Faq";

// Solo existen las páginas de zonePages.ts (Barakaldo tiene su propia página
// estática): cualquier otro municipio devuelve 404 en vez de una página vacía.
export const dynamicParams = false;

export function generateStaticParams() {
  return zonePages.map((z) => ({ slug: z.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const zone = getZonePage(slug);
  if (!zone) return {};
  return {
    title: zone.metaTitle,
    description: zone.metaDescription,
    alternates: { canonical: `/zonas-de-servicio/${zone.slug}` },
    openGraph: { title: zone.metaTitle, description: zone.metaDescription },
  };
}

export default async function ZonePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const zone = getZonePage(slug);
  if (!zone) notFound();

  const relatedServices = zone.relatedServiceSlugs.map((s) => getService(s)!).filter(Boolean);
  const otherZones = zonePages.filter((z) => z.slug !== zone.slug);

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", path: "/" },
          { name: "Zonas de Servicio", path: "/zonas-de-servicio" },
          { name: zone.name, path: `/zonas-de-servicio/${zone.slug}` },
        ]}
      />

      <PageHero
        breadcrumb={[
          { name: "Inicio", href: "/" },
          { name: "Zonas de Servicio", href: "/zonas-de-servicio" },
          { name: zone.name },
        ]}
        eyebrow={`Electricista en ${zone.name}`}
        title={zone.title}
        subtitle={zone.subtitle}
      >
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={telLink()}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-electric-400 px-6 py-3 text-sm font-extrabold text-neutral-950 transition-colors duration-200 hover:bg-electric-300"
          >
            <i className="ri-phone-line text-lg" aria-hidden="true"></i>
            Llamar {business.phoneDisplay}
          </a>
          <a
            href={waLink(WHATSAPP_GREETING_URGENT)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-whatsapp/30 bg-whatsapp/10 px-6 py-3 text-sm font-bold text-whatsapp-300 hover:bg-whatsapp/15"
          >
            <i className="ri-whatsapp-line text-lg" aria-hidden="true"></i>
            WhatsApp
          </a>
        </div>
      </PageHero>

      <section className="bg-neutral-50 py-14">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <p className="text-lg text-neutral-700">{zone.intro}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {zone.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-neutral-700">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center text-electric-600">
                  <i className="ri-check-line" aria-hidden="true"></i>
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <h2 className="font-display mt-12 text-2xl font-extrabold text-neutral-900">
            Servicios más solicitados en {zone.name}
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {relatedServices.map((s) => (
              <Link
                key={s.slug}
                href={`/servicios/${s.slug}`}
                className="rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-sm text-neutral-600 hover:border-electric-500/50 hover:text-electric-600"
              >
                {s.name}
              </Link>
            ))}
          </div>

          <h2 className="font-display mt-12 text-2xl font-extrabold text-neutral-900">Preguntas frecuentes</h2>
          <div className="mt-6">
            <Faq items={zone.faqs} />
          </div>
          <FaqJsonLd items={zone.faqs} />

          <p className="mt-12 text-neutral-600">
            También damos servicio en{" "}
            <Link href="/zonas-de-servicio/barakaldo" className="font-semibold text-electric-600 hover:underline">
              Barakaldo
            </Link>
            {otherZones.map((z) => (
              <span key={z.slug}>
                ,{" "}
                <Link href={`/zonas-de-servicio/${z.slug}`} className="font-semibold text-electric-600 hover:underline">
                  {z.name}
                </Link>
              </span>
            ))}{" "}
            y{" "}
            <Link href="/zonas-de-servicio" className="font-semibold text-electric-600 hover:underline">
              el resto de Euskadi
            </Link>
            .
          </p>
        </div>
      </section>

      <CTASection source={`zona_${zone.slug}`} title={`Electricista urgente en ${zone.name}, listo para salir`} />
    </div>
  );
}
