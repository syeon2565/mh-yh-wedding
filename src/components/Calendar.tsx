import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Section, SectionTitle, SectionSubtitle } from "../styles/shared";
import { colors, radius } from "../styles/theme";

type Props = {
  date: Date;
  groomName: string;
  brideName: string;
};

const WEEK = ["일", "월", "화", "수", "목", "금", "토"];

const calcTimeDiff = (from: Date, to: Date) => {
  const diff = to.getTime() - from.getTime();
  const absDiff = Math.abs(diff);
  const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((absDiff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds, isPast: diff < 0 };
};

const CalendarSection = styled(Section)`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
`;

const CalHead = styled.div`
  font-size: 12px;
  color: ${colors.muted};
  padding: 8px 0;
`;

const CalCell = styled('div', {
  shouldForwardProp: (prop) => prop !== '$isTarget',
})<{ $isTarget: boolean }>`
  font-size: 14px;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${({ $isTarget }) => ($isTarget ? colors.point : 'transparent')};
  color: ${({ $isTarget }) => ($isTarget ? '#fff' : 'inherit')};
  font-weight: ${({ $isTarget }) => ($isTarget ? 600 : 'normal')};
`;

const Countdown = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 32px;
`;

const CountdownItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  background: ${colors.card};
  border: 1px solid ${colors.line};
  border-radius: ${radius};
  padding: 14px 0;
  width: 68px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

const CountdownLabel = styled.span`
  font-size: 10px;
  color: ${colors.muted};
  letter-spacing: 0.1em;
  font-weight: 500;
`;

const CountdownValue = styled.span`
  font-size: 28px;
  font-weight: 400;
  color: ${colors.fg};
  line-height: 1;
`;

const Message = styled.p`
  margin-top: 28px;
  font-size: 14px;
  color: ${colors.muted};
  line-height: 1.8;

  strong {
    color: ${colors.point};
    font-weight: 600;
  }
`;

const Heart = styled.span`
  color: #d97a7a;
  font-size: 12px;
`;

const Calendar = ({ date, groomName, brideName }: Props) => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const first = new Date(year, month, 1).getDay();
  const last = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(first).fill(null),
    ...Array.from({ length: last }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const hh = date.getHours();
  const mm = date.getMinutes();
  const timeText = `${hh < 12 ? "오전" : "오후"} ${((hh + 11) % 12) + 1}시${
    mm ? ` ${mm}분` : ""
  }`;

  const oneDayAfter = new Date(date.getTime() + 24 * 60 * 60 * 1000);
  const isAfterWedding = now >= oneDayAfter;

  const timeDiff = isAfterWedding
    ? calcTimeDiff(date, now)
    : calcTimeDiff(now, date);

  const daysCount = isAfterWedding
    ? Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    : Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <CalendarSection>
      <SectionTitle>{isAfterWedding ? "THANK YOU" : "WHEN"}</SectionTitle>
      <SectionSubtitle>
        {year}년 {month + 1}월 {day}일 {WEEK[date.getDay()]}요일 · {timeText}
      </SectionSubtitle>

      <CalGrid>
        {WEEK.map((w) => (
          <CalHead key={w}>{w}</CalHead>
        ))}
        {cells.map((c, i) => (
          <CalCell key={i} $isTarget={c === day}>
            {c ?? ""}
          </CalCell>
        ))}
      </CalGrid>

      <Countdown>
        <CountdownItem>
          <CountdownLabel>DAYS</CountdownLabel>
          <CountdownValue>{timeDiff.days}</CountdownValue>
        </CountdownItem>
        <CountdownItem>
          <CountdownLabel>HOUR</CountdownLabel>
          <CountdownValue>{timeDiff.hours}</CountdownValue>
        </CountdownItem>
        <CountdownItem>
          <CountdownLabel>MIN</CountdownLabel>
          <CountdownValue>{timeDiff.minutes}</CountdownValue>
        </CountdownItem>
        <CountdownItem>
          <CountdownLabel>SEC</CountdownLabel>
          <CountdownValue>{timeDiff.seconds}</CountdownValue>
        </CountdownItem>
      </Countdown>

      {isAfterWedding ? (
        <Message>
          참석해주신 모든 분들 감사합니다.<br />
          {groomName} <Heart>♥</Heart> {brideName} 결혼한지 <strong>{daysCount}일</strong>째
        </Message>
      ) : (
        <Message>
          {groomName} <Heart>♥</Heart> {brideName}의 결혼식이 <strong>{daysCount}일</strong> 남았습니다.
        </Message>
      )}
    </CalendarSection>
  );
};

export default Calendar;
