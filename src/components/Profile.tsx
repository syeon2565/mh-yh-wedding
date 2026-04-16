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
  };
};

function Card({ role, person }: { role: "신랑" | "신부"; person: Person }) {
  return (
    <div className="profile__card">
      <img
        className="profile__photo"
        src={person.photo}
        alt={`${role} ${person.name}`}
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
  return (
    <section className="section profile">
      <h2 className="section__title">GROOM &amp; BRIDE</h2>
      <div className="profile__grid">
        <Card role="신랑" person={info.groom} />
        <Card role="신부" person={info.bride} />
      </div>
    </section>
  );
}
