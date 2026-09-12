"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";

export default function ParallaxBanner({
  image,
  imageAlt = "",
  children,
  className = "",
}: {
  image: string;
  imageAlt?: string;
  children?: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0" aria-hidden="true">
        <motion.div style={{ y }} className="absolute inset-[-10%]">
          <Image src={image} alt={imageAlt} fill sizes="100vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-neutral-950/25 to-neutral-950/40"></div>
      </div>
      <div className="relative">{children}</div>
    </section>
  );
}
