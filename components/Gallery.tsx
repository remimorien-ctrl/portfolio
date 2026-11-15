"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type GalleryImage = { src: string; width: number; height: number; alt: string };

type Labels = { open: string; close: string; previous: string; next: string };

/** Galerie en colonnes ; le plein écran est rendu dans <body> pour passer au-dessus de tout le site.
 * Galerie en colonnes ; un clic ouvre la photo en plein écran (flèches, Échap, glisser au doigt). */
export function Gallery({
  images,
  labels,
}: {
  images: GalleryImage[];
  labels: Labels;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  const count = images.length;
  const go = useCallback(
    (delta: number) =>
      setIndex((i) => (i === null ? i : (i + delta + count) % count)),
    [count],
  );
  const close = useCallback(() => {
    setIndex(null);
    lastTrigger.current?.focus();
  }, []);

  const open = index !== null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, go]);

  // Précharge les photos voisines pour un défilement sans attente.
  useEffect(() => {
    if (index === null) return;
    for (const d of [1, -1]) {
      const img = new window.Image();
      img.src = images[(index + d + count) % count].src;
    }
  }, [index, images, count]);

  const current = index !== null ? images[index] : null;

  return (
    <>
      <div className="gallery">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            className="gallery-item"
            aria-label={`${labels.open} : ${img.alt}`}
            onClick={(e) => {
              lastTrigger.current = e.currentTarget;
              setIndex(i);
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              sizes="(max-width: 700px) 100vw, 50vw"
              unoptimized
            />
          </button>
        ))}
      </div>

      {current &&
        createPortal(
          <div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
            onTouchStart={(e) => {
              touchX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- photo déjà en WebP, affichée telle quelle */}
            <img
              key={current.src}
              className="lightbox-img"
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
            />
            <p className="lightbox-count mono">
              {index! + 1} / {count}
            </p>
            <button
              ref={closeRef}
              type="button"
              className="lightbox-btn lightbox-close"
              onClick={close}
              aria-label={labels.close}
            >
              ×
            </button>
            {count > 1 && (
              <>
                <button
                  type="button"
                  className="lightbox-btn lightbox-prev"
                  onClick={() => go(-1)}
                  aria-label={labels.previous}
                >
                  ←
                </button>
                <button
                  type="button"
                  className="lightbox-btn lightbox-next"
                  onClick={() => go(1)}
                  aria-label={labels.next}
                >
                  →
                </button>
              </>
            )}
          </div>,
          document.body,
        )}
    </>
  );
}
