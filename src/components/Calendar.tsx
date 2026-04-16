import { useEffect, useState } from "react";

type Props = {
  date: Date;
  groomName: string;
  brideName: string;
};

const WEEK = ["일", "월", "화", "수", "목", "금", "토"];

function calcTimeDiff(from: Date, to: Date) {
  const diff = to.getTime() - from.getTime();
  const absDiff = Math.abs(diff);
  const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((absDiff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds, isPast: diff < 0 };
}

export default function Calendar({ date, groomName, brideName }: Props) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const first = new Date(year, month, 1).getDay();
  const last = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(first).fill(null),
    ...Array.from({ length: last }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const hh = date.getHours();
  const mm = date.getMinutes();
  const timeText = `${hh < 12 ? "오전" : "오후"} ${((hh + 11) % 12) + 1}시${
    mm ? ` ${mm}분` : ""
  }`;

  // 결혼식 날짜 + 1일 후부터 "결혼한지" 모드
  const oneDayAfter = new Date(date.getTime() + 24 * 60 * 60 * 1000);
  const isAfterWedding = now >= oneDayAfter;

  const timeDiff = isAfterWedding
    ? calcTimeDiff(date, now)
    : calcTimeDiff(now, date);

  const daysCount = isAfterWedding
    ? Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    : Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <section className="section calendar">
      <h2 className="section__title">{isAfterWedding ? "THANK YOU" : "WHEN"}</h2>
      <p className="section__subtitle">
        {year}년 {month + 1}월 {day}일 {WEEK[date.getDay()]}요일 · {timeText}
      </p>

      <div className="calendar__grid">
        {WEEK.map((w) => (
          <div key={w} className="calendar__head">
            {w}
          </div>
        ))}
        {cells.map((c, i) => (
          <div
            key={i}
            className={`calendar__cell ${c === day ? "is-target" : ""}`}
          >
            {c ?? ""}
          </div>
        ))}
      </div>

      <div className="calendar__countdown">
        <div className="calendar__countdown-item">
          <span className="calendar__countdown-label">DAYS</span>
          <span className="calendar__countdown-value">{timeDiff.days}</span>
        </div>
        <div className="calendar__countdown-item">
          <span className="calendar__countdown-label">HOUR</span>
          <span className="calendar__countdown-value">{timeDiff.hours}</span>
        </div>
        <div className="calendar__countdown-item">
          <span className="calendar__countdown-label">MIN</span>
          <span className="calendar__countdown-value">{timeDiff.minutes}</span>
        </div>
        <div className="calendar__countdown-item">
          <span className="calendar__countdown-label">SEC</span>
          <span className="calendar__countdown-value">{timeDiff.seconds}</span>
        </div>
      </div>

      {isAfterWedding ? (
        <p className="calendar__message">
          참석해주신 모든 분들 감사합니다.<br />
          {groomName} <span className="calendar__heart">♥</span> {brideName} 결혼한지 <strong>{daysCount}일</strong>째
        </p>
      ) : (
        <p className="calendar__message">
          {groomName} <span className="calendar__heart">♥</span> {brideName}의 결혼식이 <strong>{daysCount}일</strong> 남았습니다.
        </p>
      )}
    </section>
  );
}
