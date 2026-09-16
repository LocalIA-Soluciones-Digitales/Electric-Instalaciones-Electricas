"use client";

import { useEffect, useRef } from "react";

// El propio archivo de vídeo es un "boomerang" (ida + vuelta ya renderizadas,
// ver public/videos/hero.mp4 y el script de generación) para que el punto de
// bucle sea el mismo fotograma en ambos extremos: con `loop` nativo el salto
// es imperceptible. Antes se simulaba la marcha atrás en el cliente moviendo
// `currentTime` fotograma a fotograma con requestAnimationFrame, pero cada
// ajuste de `currentTime` obliga al navegador a decodificar desde el último
// keyframe (aquí cada ~1s), lo que producía tirones constantes.
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

    return () => {
      video.removeEventListener("loadedmetadata", applyRate);
      video.removeEventListener("play", applyRate);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
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
