import type { NextConfig } from "next";
import { createHash } from "crypto";
import { CONSENT_MODE_SCRIPT, gtmLoaderScript, metaPixelScript } from "./src/lib/inlineScripts";

// Hashes en vez de 'unsafe-inline': los tres <script> sin `src` que existen en
// el sitio (Analytics.tsx) tienen contenido fijo por despliegue (las claves
// NEXT_PUBLIC_* son variables de entorno de build, no de request), así que su
// SHA-256 se puede calcular aquí mismo, en next.config.ts, sin necesitar
// middleware ni forzar renderizado dinámico en las páginas estáticas del
// sitio. Si algún día cambia el texto de esos scripts, este hash se recalcula
// solo porque ambos lados importan src/lib/inlineScripts.ts.
function sha256(content: string) {
  return createHash("sha256").update(content, "utf8").digest("base64");
}

const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "";
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";

const inlineScriptHashes = [sha256(CONSENT_MODE_SCRIPT)];
if (gtmId) inlineScriptHashes.push(sha256(gtmLoaderScript(gtmId)));
if (metaPixelId) inlineScriptHashes.push(sha256(metaPixelScript(metaPixelId)));

const scriptSrcHashes = inlineScriptHashes.map((h) => `'sha256-${h}'`).join(" ");

const csp = [
  "default-src 'self'",
  `script-src 'self' ${scriptSrcHashes} https://www.googletagmanager.com https://connect.facebook.net https://challenges.cloudflare.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self'",
  "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com",
  "frame-src https://challenges.cloudflare.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Content-Security-Policy", value: csp },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
