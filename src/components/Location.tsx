import { useToast } from "../hooks/useToast";
import Toast from "./Toast";

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

  const { toast, showToast } = useToast();

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(venue.address);
      showToast("주소가 복사되었습니다");
    } catch {
      showToast("복사에 실패했습니다");
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
          loading="lazy"
        />
      </div>

      <div className="location__actions">
        <a className="location__btn" href={venue.mapUrl} target="_blank" rel="noreferrer">
          네이버 지도
        </a>
        <a className="location__btn" href="https://map.kakao.com/link/map/1543030498" target="_blank" rel="noreferrer">
          카카오맵
        </a>
        <button type="button" className="location__btn" onClick={copyAddress}>
          주소 복사
        </button>
      </div>

      <div className="location__transport">
        <div className="location__transport-item">
          <span className="location__transport-icon">🚗</span>
          <div>
            <p className="location__transport-title">자가용</p>
            <p className="location__transport-desc">예술웨딩컨벤션 주차장 이용 가능</p>
          </div>
        </div>
        <div className="location__transport-item">
          <span className="location__transport-icon">🚕</span>
          <div>
            <p className="location__transport-title">택시</p>
            <p className="location__transport-desc">목포역에서 약 10분</p>
            <p className="location__transport-desc">목포버스터미널에서 약 10분</p>
          </div>
        </div>
        <div className="location__transport-item">
          <span className="location__transport-icon">🚌</span>
          <div>
            <p className="location__transport-title">버스</p>
            <div className="location__bus-list">
              <div className="location__bus-row">
                <span className="location__bus-num">300A / 66</span>
                <span className="location__transport-desc">KT목포빌딩 승차 → 용해동아아파트후문 하차</span>
              </div>
              <div className="location__bus-row">
                <span className="location__bus-num">500 / 210</span>
                <span className="location__transport-desc">목포역 승차 → 용해동아아파트후문 하차</span>
              </div>
              <div className="location__bus-row">
                <span className="location__bus-num">66-1</span>
                <span className="location__transport-desc">목포버스터미널 승차 → 용해동아아파트후문건너 하차</span>
              </div>
              <div className="location__bus-row">
                <span className="location__bus-num">77</span>
                <span className="location__transport-desc">목포버스터미널 승차 → 제일중학교건너 하차</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toast message={toast} />
    </section>
  );
}
