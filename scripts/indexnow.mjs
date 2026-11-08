// Avisa a Bing (y al resto de buscadores con IndexNow) de las URLs de la web.
// Uso, después de que Vercel haya publicado el despliegue:
//   node scripts/indexnow.mjs                 -> todas las URLs del sitemap
//   node scripts/indexnow.mjs /servicios/x    -> solo esas rutas
// La clave está publicada en /0fcb466613e9ad08b2df6ed050fa4e4f.txt (public/).
const HOST = "www.electricbarakaldo.com";
const KEY = "0fcb466613e9ad08b2df6ed050fa4e4f";

const args = process.argv.slice(2);
let urls;
if (args.length) {
  urls = args.map((p) => (p.startsWith("http") ? p : `https://${HOST}${p.startsWith("/") ? p : "/" + p}`));
} else {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} (${urls.length} URLs)`);
if (!res.ok) { console.log(await res.text()); process.exit(1); }
