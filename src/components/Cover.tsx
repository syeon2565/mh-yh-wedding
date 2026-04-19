import { useEffect, useRef, useState } from "react";

type Props = {
  info: {
    groom: { name: string };
    bride: { name: string };
    date: Date;
    venue: { name: string };
  };
};

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

const SLIDES = [
  "main.jpeg",
  "main/main-01.jpeg",
  "main/main-02.jpeg",
  "main/main-03.jpeg",
  "main/main-04.jpeg",
].map((f) => `${import.meta.env.BASE_URL}images/${f}`);

const FADE_MS = 800;

export default function Cover({ info }: Props) {
  const [cur, setCur] = useState(0);
  const [outgoing, setOutgoing] = useState<number | null>(null);
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
    const id = setInterval(() => setCur((c) => (c + 1) % SLIDES.length), 3000);
    return () => clearInterval(id);
  }, [cur]);

  const goPrev = () => setCur((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  const goNext = () => setCur((c) => (c + 1) % SLIDES.length);

  const d = info.date;
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
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
    <section className="section cover">
      <div className="cover__slideshow">
        {SLIDES.map((src, i) => {
          let cls = "cover__slide";
          if (i === cur) cls += " cover__slide--active";
          else if (i === outgoing) cls += " cover__slide--out";
          return <img key={src} className={cls} src={src} alt="" />;
        })}
        <button
          type="button"
          className="cover__arrow cover__arrow--prev"
          onClick={goPrev}
          aria-label="이전"
        >
          &#10094;
        </button>
        <button
          type="button"
          className="cover__arrow cover__arrow--next"
          onClick={goNext}
          aria-label="다음"
        >
          &#10095;
        </button>
        <div className="cover__dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`cover__dot${i === cur ? " cover__dot--active" : ""}`}
              onClick={() => setCur(i)}
              aria-label={`사진 ${i + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="cover__info">
        <p className="cover__names">
          {info.groom.name} <span className="cover__and">&amp;</span>{" "}
          {info.bride.name}
        </p>
        <p className="cover__tag">We are getting married</p>
        <hr className="cover__divider" />
        <div className="cover__details">
          <p className="cover__datetime">
            {d.getMonth() + 1}월 {d.getDate()}일 {weekday}요일 {timeText}
          </p>
          <p className="cover__venue">{info.venue.name}</p>
        </div>
      </div>
    </section>
  );
}
