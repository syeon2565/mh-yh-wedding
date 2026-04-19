import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Section, SectionTitle } from "../styles/shared";

const PHOTOS = Array.from(
  { length: 11 },
  (_, i) => `${import.meta.env.BASE_URL}images/gallery/gallery-${String(i + 1).padStart(2, "0")}.jpeg`
);

const GallerySection = styled(Section)``;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
`;

const Item = styled.button`
  padding: 0;
  border: 0;
  background: none;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 4px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const Lightbox = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const NavBtn = styled('button', {
  shouldForwardProp: (prop) => prop !== '$direction',
})<{ $direction: 'prev' | 'next' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $direction }) => ($direction === 'prev' ? 'left: 16px;' : 'right: 16px;')}
  z-index: 10;
  background: rgba(255, 255, 255, 0.25);
  border: none;
  padding: 0;
  color: #fff;
  font-size: 28px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 36px;
  cursor: pointer;
  backdrop-filter: blur(2px);
`;

const Counter = styled.span`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  font-size: 13px;
  opacity: 0.8;
`;

const Gallery = () => {
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
    <GallerySection>
      <SectionTitle>GALLERY</SectionTitle>
      <Grid>
        {PHOTOS.map((src, i) => (
          <Item
            key={src}
            type="button"
            onClick={() => setOpenIdx(i)}
            aria-label={`사진 ${i + 1} 크게 보기`}
          >
            <img src={src} alt="" loading="lazy" />
          </Item>
        ))}
      </Grid>

      {openIdx !== null && (
        <Lightbox
          onClick={() => setOpenIdx(null)}
          role="dialog"
          aria-modal="true"
        >
          <img src={PHOTOS[openIdx]} alt="" />
          <NavBtn
            type="button"
            $direction="prev"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIdx((openIdx - 1 + PHOTOS.length) % PHOTOS.length);
            }}
            aria-label="이전"
          >
            &#10094;
          </NavBtn>
          <NavBtn
            type="button"
            $direction="next"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIdx((openIdx + 1) % PHOTOS.length);
            }}
            aria-label="다음"
          >
            &#10095;
          </NavBtn>
          <Counter>
            {openIdx + 1} / {PHOTOS.length}
          </Counter>
        </Lightbox>
      )}
    </GallerySection>
  );
};

export default Gallery;
