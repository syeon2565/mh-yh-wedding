import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Section, SectionTitle } from "../styles/shared";
import { colors, radius } from "../styles/theme";

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
    startDate: string;
  };
};

const ProfileSection = styled(Section)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  width: 100%;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const PhotoWrap = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: ${radius};
  overflow: hidden;
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 28px 12px 14px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.55) 0%, transparent 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

const Role = styled.span`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.75);
  letter-spacing: 0.08em;
`;

const Name = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.04em;
`;

const Parents = styled.p`
  font-size: 12px;
  color: ${colors.muted};
  text-align: center;
  line-height: 1.5;
`;

const Days = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const DaysCount = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: ${colors.fg};
  margin: 0;
`;

const DaysTimeline = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  position: relative;
`;

const DaysEndpoint = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  z-index: 1;
`;

const DaysDot = styled('span', {
  shouldForwardProp: (prop) => prop !== '$today',
})<{ $today?: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $today }) => ($today ? colors.point : colors.muted)};
  display: block;
  flex-shrink: 0;
`;

const DaysLabel = styled.span`
  font-size: 11px;
  letter-spacing: 0.15em;
  color: ${colors.point};
  font-weight: 500;
`;

const DaysDate = styled.span`
  font-size: 13px;
  color: ${colors.muted};
`;

const DaysLine = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-top: 4px;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    height: 1px;
    background: ${colors.muted};
    opacity: 0.4;
    transform: translateY(-50%);
  }
`;

const DaysHearts = styled.span`
  font-size: 18px;
  line-height: 1;
  position: relative;
  background: ${colors.bg};
  padding: 0 8px;
`;

const ProfileCard = ({ role, person }: { role: "신랑" | "신부"; person: Person }) => (
  <Card>
    <PhotoWrap>
      <Photo
        src={person.photo}
        alt=""
        style={{ objectPosition: person.photoPosition ?? "center" }}
      />
      <Overlay>
        <Role>{role}</Role>
        <Name>{person.name}</Name>
      </Overlay>
    </PhotoWrap>
    <Parents>
      {person.father} · {person.mother}의 {role === "신랑" ? "아들" : "딸"}
    </Parents>
  </Card>
);

const Profile = ({ info }: Props) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const start = new Date(info.startDate);
  const diff = now.getTime() - start.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const fmt = (d: Date) =>
    `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;

  return (
    <ProfileSection>
      <SectionTitle>GROOM &amp; BRIDE</SectionTitle>
      <Grid>
        <ProfileCard role="신랑" person={info.groom} />
        <ProfileCard role="신부" person={info.bride} />
      </Grid>

      <Days>
        <DaysCount>
          {days.toLocaleString()}일 {hours}시간 {minutes}분 {seconds}초
        </DaysCount>
        <DaysTimeline>
          <DaysEndpoint>
            <DaysDot />
            <DaysLabel>첫 만남</DaysLabel>
            <DaysDate>{fmt(start)}</DaysDate>
          </DaysEndpoint>
          <DaysLine>
            <DaysHearts>💙🩷</DaysHearts>
          </DaysLine>
          <DaysEndpoint>
            <DaysDot $today />
            <DaysLabel>오늘</DaysLabel>
            <DaysDate>{fmt(now)}</DaysDate>
          </DaysEndpoint>
        </DaysTimeline>
      </Days>
    </ProfileSection>
  );
};

export default Profile;
