"use client";

import Image from "next/image";
import { useState } from "react";

type CrestProps = {
  size?: number;
  className?: string;
  ringClassName?: string;
  fallbackTextClassName?: string;
};

const CREST_SRC = "/images/crest/crest.jpeg";

export default function Crest({
  size = 44,
  className,
  ringClassName,
  fallbackTextClassName,
}: CrestProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <span
        className={`grid place-items-center rounded-full ${ringClassName ?? "bg-maroon text-gold"} ${className ?? ""}`}
        style={{ width: size, height: size }}
        aria-hidden
      >
        <span
          className={`font-serif font-bold ${fallbackTextClassName ?? "text-lg"}`}
        >
          A
        </span>
      </span>
    );
  }

  return (
    <span
      className={`relative inline-block overflow-hidden rounded-full ${className ?? ""}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={CREST_SRC}
        alt="Ananda College crest"
        fill
        sizes={`${size}px`}
        className="object-contain"
        onError={() => setErrored(true)}
        priority
      />
    </span>
  );
}
