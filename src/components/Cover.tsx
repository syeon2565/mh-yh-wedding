import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { keyframes, css } from "@emotion/react";
import { Section } from "../styles/shared";
import { colors } from "../styles/theme";

type Props = {
  info: {
    groom: { name: string };
    bride: { name: string };
    date: Date;
    venue: { name: string; hall?: string };
  };
};

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

const SLIDES = [
  "slide/slide-01.jpeg",
  "slide/slide-02.jpeg",
  "slide/slide-03.jpeg",
  "slide/slide-04.jpeg",
  "slide/slide-05.jpeg",
].map((f) => `${import.meta.env.BASE_URL}images/${f}`);

const FADE_MS = 800;

const brightenIn = keyframes`
  from { filter: brightness(0.4); }
  to   { filter: brightness(1); }
`;

const dimOut = keyframes`
  from { opacity: 1; filter: brightness(1); }
  to   { opacity: 0; filter: brightness(0.4); }
`;

const CoverSection = styled(Section)`
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const Slideshow = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
`;

const Slide = styled('img', {
  shouldForwardProp: (prop) => prop !== '$active' && prop !== '$out',
})<{ $active: boolean; $out: boolean }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${({ $active, $out }) => ($active || $out ? 1 : 0)};
  z-index: ${({ $active, $out }) => ($active ? 1 : $out ? 2 : 0)};
  animation: ${({ $active, $out }) =>
    $active
      ? css`${brightenIn} 0.8s ease-in-out forwards`
      : $out
        ? css`${dimOut} 0.8s ease-in-out forwards`
        : 'none'};
`;

const Arrow = styled('button', {
  shouldForwardProp: (prop) => prop !== '$direction',
})<{ $direction: 'prev' | 'next' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $direction }) => ($direction === 'prev' ? 'left: 12px;' : 'right: 12px;')}
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

const Dots = styled.div`
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 10;
`;

const Dot = styled('button', {
  shouldForwardProp: (prop) => prop !== '$active',
})<{ $active: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: none;
  background: ${({ $active }) => ($active ? '#fff' : 'rgba(255, 255, 255, 0.5)')};
  padding: 0;
  cursor: pointer;
  transition: background 0.3s;
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  padding: 40px 32px 56px;
  text-align: left;
  background: ${colors.bg};
`;

const Names = styled.p`
  font-size: 28px;
  font-weight: 500;
  margin: 0;
  color: ${colors.fg};
  letter-spacing: 0.05em;
`;

const AndSymbol = styled.span`
  color: ${colors.point};
  font-weight: 400;
  margin: 0 4px;
`;

const Tag = styled.p`
  font-size: 13px;
  letter-spacing: 0.2em;
  color: ${colors.muted};
  font-weight: 400;
  margin: 0;
  font-style: italic;
`;

const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid ${colors.line};
  margin: 0;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DateTime = styled.p`
  margin: 0;
  font-size: 15px;
  color: ${colors.muted};
`;

const Venue = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${colors.muted};
`;

const Cover = ({ info }: Props) => {
  const [cur, setCur] = useState(0);
  const [outgoing, setOutgoing] = useState<number | null>(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const allLoaded = loadedCount >= SLIDES.length;
  const prevCurRef = useRef(0);
  const outTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const prev = prevCurRef.current;
    if (prev === cur) return;
    if (outTimerRef.current) clearTimeout(outTimerRef.current);
    setOutgoing(prev);
    outTimerRef.current = setTimeout(() => setOutgoing(null), FADE_MS);
    prevCurRef.current = cur;
    return () => {
      if (outTimerRef.current) clearTimeout(outTimerRef.current);
    };
  }, [cur]);

  useEffect(() => {
    if (!allLoaded) return;
    const id = setInterval(() => setCur((c) => (c + 1) % SLIDES.length), 3000);
    return () => clearInterval(id);
  }, [cur, allLoaded]);

  const goPrev = () => setCur((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  const goNext = () => setCur((c) => (c + 1) % SLIDES.length);

  const d = info.date;
  const weekday = WEEKDAYS[d.getDay()];
  const hour = d.getHours();
  const minute = d.getMinutes();
  const ampm = hour < 12 ? "오전" : "오후";
  const displayHour = hour > 12 ? hour - 12 : hour;
  const timeText =
    minute > 0
      ? `${ampm} ${displayHour}시 ${minute}분`
      : `${ampm} ${displayHour}시`;

  return (
    <CoverSection>
      <Slideshow>
        {SLIDES.map((src, i) => (
          <Slide
            key={src}
            src={src}
            alt=""
            $active={i === cur}
            $out={i === outgoing}
            onLoad={() => setLoadedCount((n) => n + 1)}
          />
        ))}
        <Arrow type="button" $direction="prev" onClick={goPrev} aria-label="이전">
          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.390524 7.60946C-0.130175 7.08876 -0.130175 6.24454 0.390524 5.72384L5.72386 0.390505C6.24456 -0.130195 7.08878 -0.130195 7.60948 0.390505C8.13017 0.911203 8.13017 1.75542 7.60948 2.27612L3.21895 6.66665L7.60948 11.0572C8.13017 11.5779 8.13017 12.4221 7.60948 12.9428C7.08878 13.4635 6.24456 13.4635 5.72386 12.9428L0.390524 7.60946Z" fill="#fff"/>
          </svg>
        </Arrow>
        <Arrow type="button" $direction="next" onClick={goNext} aria-label="다음">
          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M7.60948 5.72384C8.13017 6.24454 8.13017 7.08876 7.60948 7.60946L2.27614 12.9428C1.75544 13.4635 0.911224 13.4635 0.390526 12.9428C-0.130173 12.4221 -0.130173 11.5779 0.390526 11.0572L4.78105 6.66665L0.390526 2.27612C-0.130173 1.75542 -0.130173 0.911203 0.390526 0.390505C0.911224 -0.130195 1.75544 -0.130195 2.27614 0.390505L7.60948 5.72384Z" fill="#fff"/>
          </svg>
        </Arrow>
        <Dots>
          {SLIDES.map((_, i) => (
            <Dot
              key={i}
              type="button"
              $active={i === cur}
              onClick={() => setCur(i)}
              aria-label={`사진 ${i + 1}`}
            />
          ))}
        </Dots>
      </Slideshow>
      <InfoBlock>
        <Names>
          {info.groom.name} <AndSymbol>&amp;</AndSymbol> {info.bride.name}
        </Names>
        <Tag>We are getting married</Tag>
        <Divider />
        <Details>
          <DateTime>
            {d.getMonth() + 1}월 {d.getDate()}일 {weekday}요일 {timeText}
          </DateTime>
          <Venue>{info.venue.hall ? `${info.venue.name} ${info.venue.hall}` : info.venue.name}</Venue>
        </Details>
      </InfoBlock>
    </CoverSection>
  );
};

export default Cover;
