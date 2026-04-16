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
      <p className="cover__tag">WE ARE GETTING MARRIED</p>
      <img
        className="cover__photo"
        src={`${import.meta.env.BASE_URL}images/main.jpg`}
        alt="박민혁 유연후 커플 사진"
      />
      <h1 className="cover__names">
        {info.groom.name}
        <span className="cover__and" aria-label="and">
          ♥
        </span>
        {info.bride.name}
      </h1>
      <p className="cover__date">{dateText}</p>
    </section>
  );
}
