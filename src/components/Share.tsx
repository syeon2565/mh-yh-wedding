import styled from "@emotion/styled";
import { useToast } from "../hooks/useToast";
import Toast from "./Toast";
import { Section, SectionTitle, SectionSubtitle } from "../styles/shared";
import { colors, radius } from "../styles/theme";

type Props = {
  isAfterWedding: boolean;
};

const KAKAO_JS_KEY = import.meta.env.VITE_KAKAO_JS_KEY as string;
const SHARE_URL = "https://syeon2565.github.io/mh-yh-wedding/";
const SHARE_IMAGE = "https://syeon2565.github.io/mh-yh-wedding/images/main.jpeg";

const ShareSection = styled(Section)`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

const ShareBtn = styled.button`
  flex: 1;
  max-width: 160px;
  padding: 12px;
  background: ${colors.card};
  color: ${colors.fg};
  border: 1px solid ${colors.line};
  border-radius: ${radius};
  font-size: 14px;
  text-align: center;
`;

const Footer = styled.footer`
  font-size: 12px;
  letter-spacing: 0.3em;
  color: ${colors.muted};
`;

const Share = ({ isAfterWedding }: Props) => {
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

  const shareKakao = () => {
    const { Kakao } = window;
    if (!Kakao) return;
    if (!Kakao.isInitialized()) Kakao.init(KAKAO_JS_KEY);
    Kakao.Share.sendDefault({
      objectType: "location",
      address: "전남 목포시 남농로 9",
      addressTitle: "목포 예술웨딩컨벤션",
      content: {
        title: "민혁 ♥ 연후 결혼합니다",
        description: "2026년 6월 27일 토요일 오전 11시",
        imageUrl: SHARE_IMAGE,
        link: { mobileWebUrl: SHARE_URL, webUrl: SHARE_URL },
      },
    });
  };

  return (
    <ShareSection>
      <SectionTitle>SHARE</SectionTitle>
      <SectionSubtitle>
        소중한 분들에게 청첩장을 공유해 보세요
      </SectionSubtitle>
      <Actions>
        <ShareBtn type="button" onClick={shareKakao}>
          카카오톡 공유
        </ShareBtn>
        <ShareBtn type="button" onClick={copyLink}>
          링크 복사
        </ShareBtn>
      </Actions>
      <Footer>Thank you</Footer>
      <Toast message={toast} />
    </ShareSection>
  );
};

export default Share;
