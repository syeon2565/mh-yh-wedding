import { useToast } from "../hooks/useToast";
import Toast from "./Toast";

type Props = {
  isAfterWedding: boolean;
};

export default function Share({ isAfterWedding }: Props) {
  if (isAfterWedding) return null;

  const { toast, showToast } = useToast();
  const url = typeof window !== "undefined" ? window.location.href : "";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      showToast("링크가 복사되었습니다");
    } catch {
      showToast("복사에 실패했습니다");
    }
  };

  return (
    <section className="section share">
      <h2 className="section__title">SHARE</h2>
      <p className="section__subtitle">
        소중한 분들에게 청첩장을 공유해 보세요
      </p>
      <div className="share__actions">
        <button type="button" onClick={copyLink}>
          링크 복사
        </button>
      </div>
      <footer className="share__footer">Thank you</footer>
      <Toast message={toast} />
    </section>
  );
}
