interface KakaoShareFeedContent {
  title: string;
  description?: string;
  imageUrl: string;
  link: { mobileWebUrl: string; webUrl: string };
}

interface Window {
  kakao: {
    maps: {
      load: (callback: () => void) => void;
      LatLng: new (lat: number, lng: number) => object;
      Map: new (container: HTMLElement, options: object) => void;
      Marker: new (options: object) => void;
    };
  };
  Kakao: {
    init: (key: string) => void;
    isInitialized: () => boolean;
    Share: {
      sendDefault: (options:
        | { objectType: "feed"; content: KakaoShareFeedContent; buttons?: Array<{ title: string; link: { mobileWebUrl: string; webUrl: string } }> }
        | { objectType: "location"; address: string; addressTitle: string; content: KakaoShareFeedContent; buttons?: Array<{ title: string; link: { mobileWebUrl: string; webUrl: string } }> }
      ) => void;
    };
    Link: {
      sendDefault: (options: {
        objectType: "feed";
        content: KakaoShareFeedContent;
        buttons?: Array<{ title: string; link: { mobileWebUrl: string; webUrl: string } }>;
      }) => void;
    };
  };
}
