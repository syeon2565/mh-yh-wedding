type Props = { date: Date };

const WEEK = ["일", "월", "화", "수", "목", "금", "토"];

export default function Calendar({ date }: Props) {
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

  return (
    <section className="section calendar">
      <h2 className="section__title">WHEN</h2>
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
    </section>
  );
}
