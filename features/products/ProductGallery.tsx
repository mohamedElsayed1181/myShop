"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export default function ProductGallery({ images, alt }: ProductGalleryProps) {
  const gallery = images.length > 0 ? images : [""];
  const [active, setActive] = useState(gallery[0]);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-muted">
        <Image
          src={active}
          alt={alt}
          fill
          preload
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {gallery.length > 1 ? (
        <div className="grid grid-cols-4 gap-3">
          {gallery.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              onClick={() => setActive(src)}
              aria-label={`View image ${index + 1} of ${alt}`}
              className={cn(
                "relative aspect-square overflow-hidden rounded-lg border bg-muted transition",
                active === src
                  ? "border-primary ring-2 ring-ring/40"
                  : "border-border hover:border-muted-foreground/40"
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
