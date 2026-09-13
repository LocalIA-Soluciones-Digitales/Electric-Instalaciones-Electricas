"use client";

import { useEffect, useRef } from "react";

// El vídeo original no tiene un fotograma final que enlace bien con el
// primero: en vez de un `loop` nativo (que daría un salto brusco de imagen),
// se reproduce en cámara lenta hacia adelante y, al llegar al final, se
// "rebobina" fotograma a fotograma con requestAnimationFrame hasta el
// principio, donde vuelve a reproducirse hacia adelante. Bucle continuo sin
// corte visible, sin depender de un segundo archivo de vídeo.
const PLAYBACK_RATE = 0.7;

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

    video.playbackRate = PLAYBACK_RATE;
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
