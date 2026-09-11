"use client";

import type { ReactNode } from "react";

interface MainButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "white" | "whatsapp";
  type?: "button" | "submit";
  className?: string;
  external?: boolean;
}

export default function MainButton({
  children,
  href,
  onClick,
  variant = "primary",
  type = "button",
  className = "",
  external,
}: MainButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md px-7 py-3.5 text-[15px] md:text-base font-bold transition-all duration-200 cursor-pointer active:translate-y-px";
  const variants: Record<string, string> = {
    primary: "bg-electric-400 text-neutral-950 hover:bg-electric-300 shadow-[0_0_0_1px_rgba(255,196,0,0.15)]",
    outline: "border border-white/20 text-white hover:border-white/40 hover:bg-white/5",
    white: "bg-white text-neutral-950 hover:bg-neutral-100",
    whatsapp: "bg-whatsapp text-white hover:bg-whatsapp-600",
  };
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer nofollow" : undefined}
      >
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
