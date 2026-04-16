import { useEffect, useState } from "react";

const PHOTOS = Array.from(
  { length: 9 },
  (_, i) => `${import.meta.env.BASE_URL}images/gallery-${String(i + 1).padStart(2, "0")}.jpg`
);

export default function Gallery() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIdx(null);
      if (e.key === "ArrowRight")
        setOpenIdx((i) => (i === null ? i : (i + 1) % PHOTOS.length));
      if (e.key === "ArrowLeft")
        setOpenIdx((i) =>
          i === null ? i : (i - 1 + PHOTOS.length) % PHOTOS.length
        );
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIdx]);

  return (
    <section className="section gallery">
      <h2 className="section__title">GALLERY</h2>
      <div className="gallery__grid">
        {PHOTOS.map((src, i) => (
          <button
            key={src}
            type="button"
            className="gallery__item"
            onClick={() => setOpenIdx(i)}
            aria-label={`사진 ${i + 1} 크게 보기`}
          >
            <img src={src} alt={`커플 사진 ${i + 1}`} loading="lazy" />
          </button>
        ))}
      </div>

      {openIdx !== null && (
        <div
          className="gallery__lightbox"
          onClick={() => setOpenIdx(null)}
          role="dialog"
          aria-modal="true"
        >
          <img src={PHOTOS[openIdx]} alt={`커플 사진 ${openIdx + 1}`} />
          <button
            type="button"
            className="gallery__nav gallery__nav--prev"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIdx((openIdx - 1 + PHOTOS.length) % PHOTOS.length);
            }}
            aria-label="이전"
          >
            ‹
          </button>
          <button
            type="button"
            className="gallery__nav gallery__nav--next"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIdx((openIdx + 1) % PHOTOS.length);
            }}
            aria-label="다음"
          >
            ›
          </button>
          <span className="gallery__counter">
            {openIdx + 1} / {PHOTOS.length}
          </span>
        </div>
      )}
    </section>
  );
}
