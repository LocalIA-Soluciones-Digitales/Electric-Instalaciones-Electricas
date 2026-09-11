# Electric Instalaciones Eléctricas — Web + Estrategia SEO Local

Web construida con Next.js (App Router) + Tailwind CSS, diseñada para dominar la búsqueda local de
electricistas en Barakaldo y Bizkaia y maximizar llamadas, WhatsApp y formularios.

## Puesta en marcha

```bash
npm install
npm run dev        # http://localhost:3000
npm run build       # build de producción
npm run start        # servir el build
```

> **Nota**: los scripts fuerzan `--webpack`. La build por defecto con Turbopack de esta versión de
> Next.js (16.3.3) omite algún chunk JS en producción (error 500 en `_next/static/chunks/...`);
> con webpack el build es estable. Revisar si una futura versión de Next lo soluciona.

Copia `.env.example` a `.env.local` y rellena los IDs reales cuando existan:

```
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=000000000000000

# Opcional: notificación interna por email de cada aviso/presupuesto (ver más abajo)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=avisos@tu-dominio.es
```

Sin esos IDs, la web funciona igualmente (los scripts de Analytics/Pixel simplemente no se cargan, y
el aviso se sigue enviando por WhatsApp aunque no haya `RESEND_API_KEY`).

## Datos de negocio (editar en `src/lib/business.ts`)

Extraídos de la tarjeta comercial: **Electric Instalaciones Eléctricas** (Eduardo Castellano),
677 24 63 74, eduardocastellano16049806@gmail.com, Calle Cruces 18 Local 4, 48903 Barakaldo, Bizkaia.
El **dominio usado en metadatos/schema es un placeholder** (`electric-euskadi.es`) — sustitúyelo en
`business.domain` en cuanto se compre el dominio real.

**Enfoque de posicionamiento**: la web se centra 100% en "electricista" (avería, cuadro, instalación,
urgencias). Los servicios de reformas/pintura que aparecen en el reverso de la tarjeta no se han
incluido como silo propio para no diluir el posicionamiento — se pueden añadir más adelante como una
sección secundaria si el negocio quiere darles peso comercial.

## Arquitectura del sitio (silo SEO)

- `/` — Home con todos los CTAs, servicios, zonas, testimonios, FAQ.
- `/servicios` y `/servicios/[slug]` — 7 páginas de servicio (averías, cuadros eléctricos,
  cortocircuitos, iluminación LED, instalaciones, reparaciones, urgencias 24h). Contenido y datos en
  `src/lib/services.ts`.
- `/electricista-[ciudad]` (ruta técnica: `src/app/[slug]/page.tsx`, que interpreta el prefijo
  `electricista-`) — 10 páginas de localidad: Cruces, Barakaldo, Bilbao, Getxo, Portugalete,
  Santurtzi, Basauri, Durango, Donostia, Vitoria-Gasteiz. Datos en `src/lib/localities.ts`.
  **Nota técnica**: Next.js no admite carpetas tipo `electricista-[ciudad]` como segmento dinámico con
  prefijo literal — por eso la ruta vive en `[slug]` y se parsea el prefijo en código.
- `/contacto`, `/aviso-legal`, `/politica-privacidad`, `/politica-cookies`.
- `sitemap.xml` y `robots.txt` generados automáticamente (`src/app/sitemap.ts`, `src/app/robots.ts`).

Para añadir una localidad o servicio nuevo, basta con añadir una entrada en
`src/lib/localities.ts` / `src/lib/services.ts` — la página se genera sola.

## SEO técnico ya implementado

- Metadatos únicos (`title`, `description`, canonical) por página.
- Schema.org `Electrician` (LocalBusiness) en todas las páginas vía `LocalBusinessSchema`, con
  dirección, geo, horario 24h y catálogo de servicios.
- Schema `FAQPage` en home, servicios y localidades.
- Sitemap y robots.txt dinámicos.
- HTML semántico (un solo `<h1>` por página, jerarquía de encabezados).

## Tracking y Ads (Google/Meta)

- **Google Consent Mode v2**: consentimiento denegado por defecto, banner de cookies actualiza el
  consentimiento (`src/components/CookieConsent.tsx`, `src/components/Analytics.tsx`).
- **GTM, GA4 y Meta Pixel**: se cargan solo si las variables de entorno están definidas.
- **Eventos ya instrumentados** en `dataLayer` (`src/lib/tracking.ts`): `call_click`,
  `whatsapp_click`, `form_submit` — configura estos como conversiones en GTM/GA4 y como eventos
  personalizados en Meta Ads Manager.
- **Captación de leads**: `src/components/lead/SolicitudWizard.tsx` (asistente guiado de 6 pasos en
  el home, con diagnóstico por tipo de avería, foto adjunta y aviso de peligro) y
  `src/components/lead/PresupuestoForm.tsx` (formulario de presupuesto sin compromiso, usado en el
  home, páginas de servicio, localidad y contacto). Ambos abren WhatsApp con el mensaje completo
  (`src/lib/leadConfig.ts` construye el texto) y, si `RESEND_API_KEY` está configurada, además envían
  una notificación interna por email a `business.email` vía `src/app/api/lead/route.ts` (incluyendo la
  foto adjunta si el usuario la añadió). Sin esa variable, el aviso sigue llegando por WhatsApp con
  normalidad.

### Próximos pasos para activar Ads

1. Crear contenedor GTM y cuenta GA4, añadir sus IDs a `.env.local`.
2. En GTM, crear triggers de "Evento personalizado" para `call_click`, `whatsapp_click`,
   `form_submit`, y enlazarlos a conversiones de Google Ads.
3. Crear Meta Pixel y (opcional, recomendado) Conversion API vía servidor para mejorar el match rate.
4. Configurar campañas (ver estrategia abajo).

## Estrategia SEO Local y Ads

### Objetivo
Dominar búsquedas comerciales de electricista en Barakaldo/Bizkaia/Euskadi y maximizar llamadas,
WhatsApp y formularios frente a la competencia.

### Google Business Profile — recomendaciones
- **Categoría principal**: Electricista.
- **Categorías secundarias**: Empresa de instalaciones eléctricas, Servicio de reparación eléctrica,
  Electricista de urgencia.
- **Servicios a listar**: averías eléctricas, cuadros eléctricos, cortocircuitos, instalación
  eléctrica, reparación eléctrica, iluminación LED, electricista 24 horas.
- **Descripción optimizada** (750 caracteres): incluir "electricista en Barakaldo y Bizkaia",
  "servicio 24 horas", "presupuesto sin compromiso", zona de Cruces, y listar los servicios clave.
- **Dirección y área de servicio**: fijar Cruces 18, Barakaldo como dirección, y añadir como área de
  servicio Bilbao, Getxo, Portugalete, Santurtzi, Basauri y el resto de Bizkaia.
- **Reseñas**: pedir reseña por WhatsApp inmediatamente después de cada trabajo (enlace directo a
  "escribir reseña" de Google), objetivo mínimo 2-3 reseñas nuevas por semana.
- **Publicaciones**: 1 publicación semanal (oferta, trabajo realizado con foto, aviso de
  disponibilidad 24h).
- **Fotos**: subir fotos reales de trabajos (antes/después de cuadros, instalaciones), del local en
  Cruces 18, y del equipo — Google prioriza fichas con fotos recientes y geolocalizadas.

### Google Ads — estructura de campañas propuesta
1. **Búsqueda — Marca/Urgencias** (máxima prioridad de conversión):
   grupo "electricista urgente" → *electricista urgente*, *electricista 24 horas*, *electricista
   cerca de mí*, *avería eléctrica*, *cortocircuito casa*, *diferencial salta*.
2. **Búsqueda — Localidad**: un grupo de anuncios por municipio (*electricista barakaldo*,
   *electricista bilbao*, *electricista getxo*...), cada uno apuntando a su página
   `/electricista-[ciudad]`.
3. **Búsqueda — Servicio**: grupos por servicio (*cuadro eléctrico*, *instalación eléctrica
   vivienda*, *reparación eléctrica domicilio*), apuntando a `/servicios/[slug]`.
4. **Campaña de solo llamada** (Call-only), activa en horario ampliado, para capturar urgencias
   directamente por teléfono sin pasar por la web.
5. **Remarketing** (display/YouTube) a visitantes que no convirtieron, con oferta de "presupuesto
   gratis en 1 hora".

Extensiones recomendadas: llamada, ubicación, enlaces de sitio (a cada servicio), texto destacado
("24h", "presupuesto gratis", "Bizkaia").

### Meta Ads (Facebook/Instagram)
- Campaña de objetivo "Clientes potenciales" (Lead) segmentada por radio geográfico (15-20 km desde
  Barakaldo) y edad 30-65.
- Creatividades: antes/después de trabajos reales, vídeo corto de "avería resuelta en 1 hora",
  testimonios.
- Landing de aterrizaje: página de servicio o localidad correspondiente (ya preparadas con CTA
  arriba y formulario).
- Activar Conversion API además del Pixel para mejorar la atribución con iOS14+/bloqueadores.

### CRO — ya implementado en la web
- Botones flotantes de llamada y WhatsApp persistentes en todas las páginas.
- CTA repetido al menos 3 veces por página (hero, medio, final).
- Formulario corto en el hero (fricción mínima) + formulario largo de presupuesto en páginas de
  servicio/contacto.
- Sellos de confianza (respuesta <1h, 24h, presupuesto sin compromiso) y testimonios con estrellas.
- FAQ con schema, que además reduce fricción y objeciones antes de contactar.

### Ampliar el silo (siguientes contenidos a crear)
- Páginas de barrio dentro de Bilbao (Deusto, Indautxu, Rekalde) si el volumen de búsqueda lo
  justifica.
- Contenido de blog long-tail: "por qué salta el diferencial al encender el horno", "cuánto cuesta
  cambiar un cuadro eléctrico en Bizkaia", enlazando a las páginas de servicio/localidad.
- Página de "Sobre nosotros" con fotos del local en Cruces 18 para reforzar E-E-A-T local.
