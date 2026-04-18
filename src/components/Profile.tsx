import { useEffect, useState } from "react";

type Person = {
  name: string;
  father: string;
  mother: string;
  photo: string;
  photoPosition?: string;
};

type Props = {
  info: {
    groom: Person;
    bride: Person;
    startDate: string;
  };
};

function Card({ role, person }: { role: "신랑" | "신부"; person: Person }) {
  return (
    <div className="profile__card">
      <img
        className="profile__photo"
        src={person.photo}
        alt=""
        style={{ objectPosition: person.photoPosition ?? "center" }}
      />
      <p className="profile__parents">
        {person.father} · {person.mother}의 {role === "신랑" ? "장남" : "장녀"}
      </p>
      <p className="profile__name">
        <span className="profile__role">{role}</span>
        {person.name}
      </p>
    </div>
  );
}

export default function Profile({ info }: Props) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const start = new Date(info.startDate);
  const diff = now.getTime() - start.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const fmt = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

  return (
    <section className="section profile">
      <h2 className="section__title">GROOM &amp; BRIDE</h2>
      <div className="profile__grid">
        <Card role="신랑" person={info.groom} />
        <Card role="신부" person={info.bride} />
      </div>

      <div className="profile__days">
        <p className="profile__days-count">
          {days.toLocaleString()}일 {hours}시간 {minutes}분 {seconds}초
        </p>
        <div className="profile__days-timeline">
          <div className="profile__days-endpoint">
            <span className="profile__days-dot" />
            <span className="profile__days-label">시작</span>
            <span className="profile__days-date">{fmt(start)}</span>
          </div>
          <div className="profile__days-line">
            <span className="profile__days-hearts">💙🩷</span>
          </div>
          <div className="profile__days-endpoint">
            <span className="profile__days-dot profile__days-dot--today" />
            <span className="profile__days-label">오늘</span>
            <span className="profile__days-date">{fmt(now)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
