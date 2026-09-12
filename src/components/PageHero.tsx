import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

type Crumb = { name: string; href?: string };

export default function PageHero({
  breadcrumb,
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt = "",
  children,
  contentWidth = "4xl",
  size = "default",
}: {
  breadcrumb?: Crumb[];
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
  contentWidth?: "3xl" | "4xl" | "6xl";
  size?: "default" | "large";
}) {
  const widthCls = { "3xl": "max-w-3xl", "4xl": "max-w-4xl", "6xl": "max-w-6xl" }[contentWidth];
  const paddingCls = size === "large" ? "py-16 md:py-24" : "py-12 md:py-16";

  return (
    <section className="relative overflow-hidden bg-cloud">
      {image && (
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={image} alt={imageAlt} fill sizes="100vw" className="object-cover opacity-[0.08]" />
        </div>
      )}
      <div
        className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-electric-300/25 blur-[100px]"
        aria-hidden="true"
      ></div>
      <div
        className="absolute -bottom-24 left-0 h-64 w-64 rounded-full bg-neutral-300/30 blur-[100px]"
        aria-hidden="true"
      ></div>

      <div className={`relative mx-auto ${widthCls} px-4 md:px-6 ${paddingCls}`}>
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="mb-4 text-sm text-neutral-500" aria-label="Miga de pan">
            {breadcrumb.map((c, i) => (
              <span key={c.name}>
                {i > 0 && <span className="mx-1.5 text-neutral-300">/</span>}
                {c.href ? (
                  <Link href={c.href} className="hover:text-electric-600">
                    {c.name}
                  </Link>
                ) : (
                  <span className="font-medium text-neutral-700">{c.name}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {eyebrow && (
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-electric-500/20 bg-electric-400/10 px-4 py-1 text-sm font-semibold text-electric-700">
            {eyebrow}
          </p>
        )}

        <h1 className="font-display max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
          {title}
        </h1>

        {subtitle && <p className="mt-4 max-w-2xl text-base text-neutral-600 md:text-lg">{subtitle}</p>}

        {children}
      </div>
    </section>
  );
}
