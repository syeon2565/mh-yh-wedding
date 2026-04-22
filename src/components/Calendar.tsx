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

const CalHead = styled('div', {
  shouldForwardProp: (prop) => prop !== '$dayType',
})<{ $dayType?: 'sun' | 'sat' }>`
  font-size: 12px;
  color: ${({ $dayType }) =>
    $dayType === 'sun' ? '#d97a7a' :
    $dayType === 'sat' ? '#6a9fd4' :
    colors.muted};
  padding: 8px 0;
`;

const CalCell = styled('div', {
  shouldForwardProp: (prop) => !['$isTarget', '$dayType', '$isHoliday'].includes(prop),
})<{ $isTarget: boolean; $dayType?: 'sun' | 'sat'; $isHoliday?: boolean }>`
  font-size: 14px;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &::before {
    content: ${({ $isTarget }) => ($isTarget ? '""' : 'none')};
    position: absolute;
    width: 24px;
    height: 24px;
    padding: 4px;
    border-radius: 50%;
    background: ${colors.point};
    z-index: 0;
  }

  span {
    position: relative;
    z-index: 1;
    color: ${({ $isTarget, $dayType, $isHoliday }) =>
      $isTarget ? '#fff' :
      $isHoliday || $dayType === 'sun' ? '#d97a7a' :
      $dayType === 'sat' ? '#6a9fd4' :
      'inherit'};
    font-weight: ${({ $isTarget }) => ($isTarget ? 600 : 'normal')};
  }
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

  // 00시 기준으로 D-day 계산
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weddingMidnight = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const daysCount = Math.ceil((weddingMidnight.getTime() - todayMidnight.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <CalendarSection>
      <SectionTitle>{isAfterWedding ? "THANK YOU" : "WHEN"}</SectionTitle>
      <SectionSubtitle>
        {year}년 {month + 1}월 {day}일 {WEEK[date.getDay()]}요일 · {timeText}
      </SectionSubtitle>

      <CalGrid>
        {WEEK.map((w, i) => (
          <CalHead
            key={w}
            $dayType={i === 0 ? 'sun' : i === 6 ? 'sat' : undefined}
          >
            {w}
          </CalHead>
        ))}
        {cells.map((c, i) => {
          const dayOfWeek = i % 7;
          // 2026년 6월 공휴일: 6일 (현충일)
          const isHoliday = c === 6;
          return (
            <CalCell
              key={i}
              $isTarget={c === day}
              $dayType={dayOfWeek === 0 ? 'sun' : dayOfWeek === 6 ? 'sat' : undefined}
              $isHoliday={isHoliday}
            >
              <span>{c ?? ""}</span>
            </CalCell>
          );
        })}
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
          {groomName} <Heart>♥</Heart> {brideName} 결혼한지 <strong>{Math.abs(daysCount)}일</strong>째
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
