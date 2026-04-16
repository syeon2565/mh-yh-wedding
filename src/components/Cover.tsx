type Props = {
  info: {
    groom: { name: string };
    bride: { name: string };
    date: Date;
  };
};

export default function Cover({ info }: Props) {
  const d = info.date;
  const dateText = `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()}`;

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
        <p className="cover__tag">WE ARE GETTING MARRIED</p>
        <h1 className="cover__names">
          {info.groom.name}
          <span className="cover__and" aria-label="and">
            ♥
          </span>
          {info.bride.name}
        </h1>
        <p className="cover__date">{dateText}</p>
      </div>
    </section>
  );
}
