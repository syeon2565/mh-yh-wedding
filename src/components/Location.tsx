type Props = {
  venue: {
    name: string;
    address: string;
    tel: string;
    mapUrl: string;
    kakaoMapId?: string;
  };
  isAfterWedding: boolean;
};

export default function Location({ venue, isAfterWedding }: Props) {
  if (isAfterWedding) return null;

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

      <div className="location__map">
        <iframe
          src="https://map.kakao.com/link/map/목포 예술웨딩컨벤션,34.7856,126.3880"
          title="카카오맵"
          allowFullScreen
        />
      </div>

      <div className="location__actions">
        <a
          className="location__btn"
          href={venue.mapUrl}
          target="_blank"
          rel="noreferrer"
        >
          네이버 지도
        </a>
        <a
          className="location__btn"
          href="https://map.kakao.com/link/map/1543030498"
          target="_blank"
          rel="noreferrer"
        >
          카카오맵
        </a>
        <button type="button" className="location__btn" onClick={copyAddress}>
          주소 복사
        </button>
      </div>
    </section>
  );
}
