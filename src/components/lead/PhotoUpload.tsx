"use client";

import { useRef, useState } from "react";

const MAX_BYTES = 3 * 1024 * 1024; // 3 MB, igual que src/lib/imageValidation.ts
const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];

interface PhotoUploadProps {
  id: string;
  value: string; // data URL, o "" si no hay foto
  onChange: (dataUrl: string) => void;
  label?: string;
  hint?: string;
}

// Sube una foto (p. ej. del cuadro eléctrico) y la deja lista como data URL en
// `value`, que los formularios envían tal cual a /api/lead. La validación real
// de tamaño y firma binaria ya la hace el servidor (src/lib/imageValidation.ts);
// aquí solo se evita subir un archivo que sabemos que el servidor va a rechazar.
export default function PhotoUpload({ id, value, onChange, label = "Foto (opcional)", hint }: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const handleFile = (file: File | undefined) => {
    setError("");
    if (!file) return;
    if (!ACCEPTED.includes(file.type)) {
      setError("Formato no admitido. Usa una foto JPG, PNG o WebP.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("La foto pesa demasiado (máximo 3 MB).");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result || ""));
    reader.onerror = () => setError("No se ha podido leer la foto. Inténtalo de nuevo.");
    reader.readAsDataURL(file);
  };

  const clear = () => {
    onChange("");
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-neutral-500">
        {label}
      </label>

      {value ? (
        <div className="flex items-center gap-3 rounded-md border border-neutral-300 bg-white p-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element -- vista previa local de un data URL, no una imagen del sitio */}
          <img src={value} alt="" className="h-14 w-14 shrink-0 rounded object-cover" />
          <span className="flex-1 text-sm text-neutral-600">Foto añadida</span>
          <button
            type="button"
            onClick={clear}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-neutral-200 text-neutral-500 transition-colors duration-200 hover:border-red-300 hover:text-red-600 cursor-pointer"
            aria-label="Quitar foto"
          >
            <i className="ri-close-line text-base" aria-hidden="true"></i>
          </button>
        </div>
      ) : (
        <label
          htmlFor={id}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-neutral-300 bg-white px-4 py-3.5 text-sm font-semibold text-neutral-500 transition-colors duration-200 hover:border-electric-400/60 hover:bg-electric-50/40 hover:text-electric-600"
        >
          <i className="ri-camera-line text-lg" aria-hidden="true"></i>
          Añadir foto del cuadro o la avería
        </label>
      )}

      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={ACCEPTED.join(",")}
        onChange={(e) => handleFile(e.target.files?.[0])}
        className="sr-only"
      />

      {hint && !error && <p className="mt-1.5 text-xs text-neutral-400">{hint}</p>}
      {error && (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-red-600" role="alert">
          <i className="ri-error-warning-line" aria-hidden="true"></i> {error}
        </p>
      )}
    </div>
  );
}
