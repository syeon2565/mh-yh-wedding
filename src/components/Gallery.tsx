import { useEffect, useState, useRef } from "react";
import styled from "@emotion/styled";
import { Section, SectionTitle } from "../styles/shared";

const PHOTOS = Array.from(
  { length: 12 },
  (_, i) => `${import.meta.env.BASE_URL}images/gallery/gallery-${String(i + 1).padStart(2, "0")}.jpeg`
);

const GallerySection = styled(Section)`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

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
`;

const ImageWrapper = styled.div`
  position: relative;
  max-width: calc(100vw - 40px);
  max-height: calc(100vh - 40px);

  img {
    max-width: 100%;
    max-height: calc(100vh - 40px);
    object-fit: contain;
    display: block;
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
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  font-size: 13px;
  opacity: 0.8;
  white-space: nowrap;
`;

const Gallery = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (diff > threshold) {
      // 왼쪽으로 스와이프 → 다음
      setOpenIdx((i) => (i === null ? i : (i + 1) % PHOTOS.length));
    } else if (diff < -threshold) {
      // 오른쪽으로 스와이프 → 이전
      setOpenIdx((i) => (i === null ? i : (i - 1 + PHOTOS.length) % PHOTOS.length));
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

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
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          role="dialog"
          aria-modal="true"
        >
          <ImageWrapper>
            <img src={PHOTOS[openIdx]} alt="" />
            <Counter>
              {openIdx + 1} / {PHOTOS.length}
            </Counter>
          </ImageWrapper>
          <NavBtn
            type="button"
            $direction="prev"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIdx((openIdx - 1 + PHOTOS.length) % PHOTOS.length);
            }}
            aria-label="이전"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M0.390524 7.60946C-0.130175 7.08876 -0.130175 6.24454 0.390524 5.72384L5.72386 0.390505C6.24456 -0.130195 7.08878 -0.130195 7.60948 0.390505C8.13017 0.911203 8.13017 1.75542 7.60948 2.27612L3.21895 6.66665L7.60948 11.0572C8.13017 11.5779 8.13017 12.4221 7.60948 12.9428C7.08878 13.4635 6.24456 13.4635 5.72386 12.9428L0.390524 7.60946Z" fill="#fff"/>
            </svg>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M7.60948 5.72384C8.13017 6.24454 8.13017 7.08876 7.60948 7.60946L2.27614 12.9428C1.75544 13.4635 0.911224 13.4635 0.390526 12.9428C-0.130173 12.4221 -0.130173 11.5779 0.390526 11.0572L4.78105 6.66665L0.390526 2.27612C-0.130173 1.75542 -0.130173 0.911203 0.390526 0.390505C0.911224 -0.130195 1.75544 -0.130195 2.27614 0.390505L7.60948 5.72384Z" fill="#fff"/>
            </svg>
          </NavBtn>
        </Lightbox>
      )}
    </GallerySection>
  );
};

export default Gallery;
