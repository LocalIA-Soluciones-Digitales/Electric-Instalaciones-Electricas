// Fuente única de los <script> inline que se sirven sin `src` (bootstrap de
// Consent Mode, loader de GTM, loader de Meta Pixel). next.config.ts importa
// este mismo módulo para calcular su hash SHA-256 y añadirlo a la
// Content-Security-Policy (script-src) en vez de depender de 'unsafe-inline'.
//
// Importante: el texto exacto (incluida indentación y saltos de línea) debe
// coincidir con lo que Analytics.tsx renderiza dentro de <Script>, porque el
// hash de CSP se calcula sobre el contenido byte a byte. Si tocas el texto de
// estos scripts, hazlo aquí y consume la constante/función desde Analytics.tsx
// para que ambos lados sigan coincidiendo automáticamente.

export const CONSENT_MODE_SCRIPT = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied',
            'wait_for_update': 500
          });
          window.gtag = gtag;
        `;

export function gtmLoaderScript(gtmId: string) {
  return `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `;
}

export function metaPixelScript(pixelId: string) {
  return `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `;
}
