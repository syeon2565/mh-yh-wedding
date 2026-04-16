type Props = {
  info: {
    groom: { name: string };
    bride: { name: string };
    date: Date;
    venue: { name: string };
  };
};

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

export default function Cover({ info }: Props) {
  const d = info.date;
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const weekday = WEEKDAYS[d.getDay()];
  const hour = d.getHours();
  const minute = d.getMinutes();
  const ampm = hour < 12 ? "오전" : "오후";
  const displayHour = hour > 12 ? hour - 12 : hour;
  const timeText = minute > 0 ? `${ampm} ${displayHour}시 ${minute}분` : `${ampm} ${displayHour}시`;

  return (
    <section className="section cover">
      <div className="cover__photo-area">
        <img
          className="cover__photo"
          src={`${import.meta.env.BASE_URL}images/main.jpeg`}
          alt=""
        />
      </div>
      <div className="cover__info">
        <p className="cover__names">
          {info.groom.name} <span className="cover__and">&amp;</span> {info.bride.name}
        </p>
        <div className="cover__details">
          <p className="cover__datetime">{month}.{day} {weekday}요일 {timeText}</p>
          <p className="cover__venue">{info.venue.name}</p>
        </div>
        <hr className="cover__divider" />
        <p className="cover__tag">We are getting married</p>
      </div>
    </section>
  );
}
