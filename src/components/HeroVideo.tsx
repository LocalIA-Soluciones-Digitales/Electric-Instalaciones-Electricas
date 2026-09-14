"use client";

import { useEffect, useRef } from "react";

// El vídeo no tiene un fotograma final que enlace bien con el primero: en
// vez de un `loop` nativo (salto brusco de imagen), se reproduce hacia
// adelante y, al llegar al final, se "rebobina" fotograma a fotograma con
// requestAnimationFrame hasta el principio, donde vuelve a reproducirse
// hacia adelante. Así el vídeo siempre acaba en el mismo fotograma en el
// que empieza: bucle continuo sin corte visible. El zoom in/out (clase
// `.hero-zoom`, globals.css) es una animación CSS aparte que añade
// movimiento constante encima.
const PLAYBACK_RATE = 0.8;

export default function HeroVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Algunos navegadores reinician playbackRate a 1 al arrancar el
    // autoplay o al reanudar la reproducción, así que se reaplica en esos
    // eventos en vez de fijarlo solo una vez al montar.
    const applyRate = () => {
      video.playbackRate = PLAYBACK_RATE;
    };
    applyRate();
    video.addEventListener("loadedmetadata", applyRate);
    video.addEventListener("play", applyRate);

    let rafId = 0;
    let lastTs: number | null = null;

    const stepReverse = (ts: number) => {
      if (lastTs === null) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;
      const next = video.currentTime - dt * PLAYBACK_RATE;
      if (next <= 0.02) {
        video.currentTime = 0;
        video.play().catch(() => {});
        return;
      }
      video.currentTime = next;
      rafId = requestAnimationFrame(stepReverse);
    };

    const onEnded = () => {
      lastTs = null;
      video.pause();
      rafId = requestAnimationFrame(stepReverse);
    };

    video.addEventListener("ended", onEnded);
    return () => {
      video.removeEventListener("loadedmetadata", applyRate);
      video.removeEventListener("play", applyRate);
      video.removeEventListener("ended", onEnded);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      preload="auto"
      poster={poster}
      disablePictureInPicture
      disableRemotePlayback
      className={className}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
