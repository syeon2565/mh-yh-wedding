import { useEffect } from "react";
import styled from "@emotion/styled";
import { useToast } from "../hooks/useToast";
import Toast from "./Toast";
import { Section, SectionTitle } from "../styles/shared";
import { colors, radius } from "../styles/theme";

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

const LocationSection = styled(Section)`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const VenueName = styled.p`
  font-size: 18px;
  margin: 0;
`;

const Address = styled.p`
  font-size: 14px;
  color: ${colors.muted};
  margin: 0;
`;

const Tel = styled.a`
  font-size: 14px;
  color: ${colors.muted};
  margin: 0;
  text-decoration: none;
`;

const MapBox = styled.div`
  width: 100%;
  aspect-ratio: 16 / 10;
  background: #e8e4dc;
  border-radius: ${radius};
  margin-top: 20px;
  margin-bottom: 12px;
  overflow: hidden;

  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

const Btn = styled.a`
  flex: 1;
  max-width: 160px;
  padding: 12px;
  background: ${colors.card};
  color: ${colors.fg};
  border: 1px solid ${colors.line};
  border-radius: ${radius};
  font-size: 14px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
`;

const BtnButton = styled.button`
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

const Transport = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid ${colors.line};
  border-radius: ${radius};
  overflow: hidden;
  text-align: left;
`;

const TransportItem = styled.div`
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 16px 18px;
  border-bottom: 1px solid ${colors.line};
  background: ${colors.card};

  &:last-child {
    border-bottom: none;
  }
`;

const TransportIcon = styled.span`
  font-size: 18px;
  flex-shrink: 0;
  margin-top: 1px;
`;

const TransportTitle = styled.p`
  font-size: 13px;
  font-weight: 600;
  color: ${colors.fg};
  margin: 0 0 4px;
`;

const TransportDesc = styled.p`
  font-size: 12px;
  color: ${colors.muted};
  margin: 2px 0 0;
`;

const BusList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 4px;
`;

const BusRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

const BusRoute = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const BusNum = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${colors.point};
  white-space: nowrap;
  background: rgba(176, 137, 104, 0.1);
  padding: 1px 6px;
  border-radius: 4px;
  flex-shrink: 0;
`;

const LAT = 34.7956;
const LNG = 126.4094;

const Location = ({ venue, isAfterWedding }: Props) => {
  const { toast, showToast } = useToast();

  useEffect(() => {
    if (isAfterWedding) return;

    const renderMap = () => {
      const container = document.getElementById("kakao-map");
      if (!container) return;
      const latlng = new window.kakao.maps.LatLng(LAT, LNG);
      const map = new window.kakao.maps.Map(container, { center: latlng, level: 4 });
      new window.kakao.maps.Marker({ position: latlng, map });
    };

    if (window.kakao?.maps) {
      window.kakao.maps.load(renderMap);
      return;
    }

    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_JS_KEY}&autoload=false`;
    script.addEventListener("load", () => {
      window.kakao.maps.load(renderMap);
    });
    document.head.appendChild(script);
  }, [isAfterWedding]);

  if (isAfterWedding) return null;

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(venue.address);
      showToast("주소가 복사되었습니다");
    } catch {
      showToast("복사에 실패했습니다");
    }
  };

  return (
    <LocationSection>
      <SectionTitle>LOCATION</SectionTitle>
      <VenueName>{venue.name}</VenueName>
      <Address>{venue.address}</Address>
      <Tel href={`tel:${venue.tel}`}>Tel. {venue.tel}</Tel>

      <MapBox>
        <div id="kakao-map" style={{ width: "100%", height: "100%" }} />
      </MapBox>

      <Actions>
        <Btn href={venue.mapUrl} target="_blank" rel="noreferrer">
          네이버 지도
        </Btn>
        <Btn href="https://kko.to/T0RQ24pchL" target="_blank" rel="noreferrer">
          카카오맵
        </Btn>
        <BtnButton type="button" onClick={copyAddress}>
          주소 복사
        </BtnButton>
      </Actions>

      <Transport>
        <TransportItem>
          <TransportIcon>🚗</TransportIcon>
          <div>
            <TransportTitle>자가용</TransportTitle>
            <TransportDesc>예술웨딩컨벤션 주차장 이용 가능</TransportDesc>
          </div>
        </TransportItem>
        <TransportItem>
          <TransportIcon>🚕</TransportIcon>
          <div>
            <TransportTitle>택시</TransportTitle>
            <TransportDesc>목포역에서 약 10분</TransportDesc>
            <TransportDesc>목포버스터미널에서 약 10분</TransportDesc>
          </div>
        </TransportItem>
        <TransportItem>
          <TransportIcon>🚌</TransportIcon>
          <div>
            <TransportTitle>버스</TransportTitle>
            <BusList>
              <BusRow>
                <BusNum>300A / 66</BusNum>
                <BusRoute>
                  <TransportDesc>KT목포빌딩 승차</TransportDesc>
                  <TransportDesc>용해동아아파트후문 하차</TransportDesc>
                </BusRoute>
              </BusRow>
              <BusRow>
                <BusNum>500 / 210</BusNum>
                <BusRoute>
                  <TransportDesc>목포역 승차</TransportDesc>
                  <TransportDesc>용해동아아파트후문 하차</TransportDesc>
                </BusRoute>
              </BusRow>
              <BusRow>
                <BusNum>66-1</BusNum>
                <BusRoute>
                  <TransportDesc>목포버스터미널 승차</TransportDesc>
                  <TransportDesc>용해동아아파트후문건너 하차</TransportDesc>
                </BusRoute>
              </BusRow>
              <BusRow>
                <BusNum>77</BusNum>
                <BusRoute>
                  <TransportDesc>목포버스터미널 승차</TransportDesc>
                  <TransportDesc>제일중학교건너 하차</TransportDesc>
                </BusRoute>
              </BusRow>
            </BusList>
          </div>
        </TransportItem>
      </Transport>
      <Toast message={toast} />
    </LocationSection>
  );
};

export default Location;
