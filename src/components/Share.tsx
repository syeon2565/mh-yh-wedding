import { shareKakao } from "../utils/kakao";

const SHARE_INFO = {
  title: "박민혁 ♥ 유연후 결혼합니다",
  description: "2026년 6월 27일 토요일 오전 11시\n목포 예술웨딩컨벤션",
  imageUrl:
    "https://via.placeholder.com/800x800.png?text=Wedding",
};

export default function Share() {
  const url = typeof window !== "undefined" ? window.location.href : "";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert("링크가 복사되었습니다.");
    } catch {
      alert("복사에 실패했습니다.");
    }
  };

  const shareToKakao = () => {
    shareKakao({ ...SHARE_INFO, linkUrl: url });
  };

  return (
    <section className="section share">
      <h2 className="section__title">SHARE</h2>
      <p className="section__subtitle">
        소중한 분들에게 청첩장을 공유해 보세요
      </p>
      <div className="share__actions">
        <button type="button" onClick={shareToKakao}>
          카카오톡 공유
        </button>
        <button type="button" onClick={copyLink}>
          링크 복사
        </button>
      </div>
      <footer className="share__footer">Thank you</footer>
    </section>
  );
}
