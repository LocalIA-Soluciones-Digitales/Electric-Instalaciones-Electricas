// Reduce una foto a un JPEG (data URL) razonable para adjuntarla por email.
export async function fileToDataUrl(file: File, maxDim = 1280): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        try {
          const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
          const w = Math.max(1, Math.round(img.width * scale));
          const h = Math.max(1, Math.round(img.height * scale));
          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve("");
            return;
          }
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL("image/jpeg", 0.82));
        } catch {
          resolve("");
        }
      };
      img.onerror = () => resolve("");
      img.src = String(reader.result);
    };
    reader.onerror = () => resolve("");
    reader.readAsDataURL(file);
  });
}
