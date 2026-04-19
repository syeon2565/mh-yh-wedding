import { useEffect, useState } from "react";

type Props = {
  startDate: string;
};

export default function DaysTogether({ startDate }: Props) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const start = new Date(startDate);
  const diffTime = now.getTime() - start.getTime();

  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

  const formatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  return (
    <section className="section days-together">
      <p className="days-together__subtitle">D+Day</p>
      <h2 className="days-together__title">우리가 함께한 지</h2>

      <p className="days-together__count">
        {days.toLocaleString()}일 {hours}시간 {minutes}분 {seconds}초
      </p>

      <div className="days-together__timeline">
        <div className="days-together__endpoint">
          <span className="days-together__ep-dot" />
          <span className="days-together__ep-label">첫 만남</span>
          <span className="days-together__ep-date">{formatDate(start)}</span>
        </div>
        <div className="days-together__line">
          <span className="days-together__hearts">💙🩷</span>
        </div>
        <div className="days-together__endpoint">
          <span className="days-together__ep-dot days-together__ep-dot--today" />
          <span className="days-together__ep-label">오늘</span>
          <span className="days-together__ep-date">{formatDate(now)}</span>
        </div>
      </div>
    </section>
  );
}
