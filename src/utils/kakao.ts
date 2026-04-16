declare global {
  interface Window {
    Kakao: any;
  }
}

const KAKAO_JS_KEY = import.meta.env.VITE_KAKAO_JS_KEY as string | undefined;

export function initKakao() {
  if (typeof window === "undefined" || !window.Kakao) return;
  if (!KAKAO_JS_KEY) {
    console.warn("VITE_KAKAO_JS_KEY is not set");
    return;
  }
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(KAKAO_JS_KEY);
  }
}

type ShareArgs = {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
};

export function shareKakao({ title, description, imageUrl, linkUrl }: ShareArgs) {
  if (!window.Kakao?.Share) {
    alert("카카오 SDK 로드에 실패했습니다.");
    return;
  }
  window.Kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title,
      description,
      imageUrl,
      link: { mobileWebUrl: linkUrl, webUrl: linkUrl },
    },
    buttons: [
      {
        title: "청첩장 열기",
        link: { mobileWebUrl: linkUrl, webUrl: linkUrl },
      },
    ],
  });
}
