// Validación server-side de fotos adjuntas (Node.js runtime).
// No basta con confiar en el prefijo "data:image/..." declarado por el
// cliente: se comprueba también la firma binaria real del archivo.
const MAX_PHOTO_BYTES = 3 * 1024 * 1024; // 3 MB

const DATA_URL_RE = /^data:image\/(jpeg|jpg|png|webp);base64,([a-zA-Z0-9+/]+=*)$/;

function hasMagicBytes(buf: Buffer): boolean {
  if (buf.length < 4) return false;
  const jpeg = buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
  const png = buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;
  const webp =
    buf.length >= 12 &&
    buf.subarray(0, 4).toString("ascii") === "RIFF" &&
    buf.subarray(8, 12).toString("ascii") === "WEBP";
  return jpeg || png || webp;
}

export function decodeImageOrNull(dataUrl: string): Buffer | null {
  const match = DATA_URL_RE.exec(dataUrl);
  if (!match) return null;

  let buf: Buffer;
  try {
    buf = Buffer.from(match[2], "base64");
  } catch {
    return null;
  }

  if (buf.length === 0 || buf.length > MAX_PHOTO_BYTES) return null;
  if (!hasMagicBytes(buf)) return null;
  return buf;
}
