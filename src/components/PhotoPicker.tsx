"use client";

import { useRef } from "react";
import { fileToDataUrl } from "@/lib/photoUtil";

interface PhotoPickerProps {
  id: string;
  value: string; // data URL o ""
  onChange: (value: string) => void;
  label?: string;
  hint?: string;
}

export default function PhotoPicker({ id, value, onChange, label, hint }: PhotoPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onFile = async (file?: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    const dataUrl = await fileToDataUrl(file);
    if (dataUrl) onChange(dataUrl);
  };

  return (
    <div>
      <input
        ref={inputRef}
        id={`${id}-file`}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          onFile(e.target.files && e.target.files[0]);
          e.target.value = "";
        }}
      />

      {value ? (
        <div className="relative overflow-hidden rounded-lg border border-white/[0.1]">
          {/* eslint-disable-next-line @next/next/no-img-element -- vista previa de una data URL local, no un recurso optimizable por next/image */}
          <img src={value} alt="Fotografía de la avería seleccionada" className="h-40 md:h-52 w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 flex justify-end gap-2 bg-gradient-to-t from-neutral-950/90 to-transparent p-2.5">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md bg-electric-400 px-3 py-2 text-xs font-bold text-neutral-950 hover:bg-electric-300 cursor-pointer"
            >
              <i className="ri-refresh-line" aria-hidden="true"></i> Cambiar
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border border-white/25 px-3 py-2 text-xs font-bold text-white hover:bg-white/10 cursor-pointer"
            >
              <i className="ri-delete-bin-line" aria-hidden="true"></i> Quitar
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-white/20 bg-white/[0.02] px-4 py-5 md:py-6 text-center transition-colors duration-200 hover:border-electric-400/60 hover:bg-electric-400/5 cursor-pointer"
        >
          <span className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-electric-400/15">
            <i className="ri-camera-line text-base md:text-lg text-electric-400" aria-hidden="true"></i>
          </span>
          <span className="text-xs md:text-sm font-bold text-white/80">
            {label || "Añadir foto de la avería"}
          </span>
          {hint && <span className="text-[11px] md:text-xs text-white/40">{hint}</span>}
        </button>
      )}
    </div>
  );
}
