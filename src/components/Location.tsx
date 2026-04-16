type Props = {
  venue: {
    name: string;
    address: string;
    tel: string;
    mapUrl: string;
  };
};

export default function Location({ venue }: Props) {
  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(venue.address);
      alert("주소가 복사되었습니다.");
    } catch {
      alert("복사에 실패했습니다.");
    }
  };

  return (
    <section className="section location">
      <h2 className="section__title">LOCATION</h2>
      <p className="location__name">{venue.name}</p>
      <p className="location__address">{venue.address}</p>
      <p className="location__tel">Tel. {venue.tel}</p>

      <a
        className="location__map"
        href={venue.mapUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="네이버 지도에서 보기"
      />

      <div className="location__actions">
        <a
          className="location__btn"
          href={venue.mapUrl}
          target="_blank"
          rel="noreferrer"
        >
          네이버 지도
        </a>
        <button type="button" className="location__btn" onClick={copyAddress}>
          주소 복사
        </button>
      </div>
    </section>
  );
}
