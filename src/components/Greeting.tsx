import styled from "@emotion/styled";
import { Section, SectionTitle } from "../styles/shared";
import { colors } from "../styles/theme";

type Props = {
  isAfterWedding: boolean;
};

const GreetingSection = styled(Section)`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const GreetingBody = styled.p`
  font-size: 15px;
  color: ${colors.fg};
  margin: 0;
`;

const Highlight = styled.span<{ color: "pink" | "blue" }>`
  font-weight: 700;
  color: ${({ color }) => (color === "pink" ? "#f9c4d2" : "#89CFF0")};
`;

const Greeting = ({ isAfterWedding }: Props) => {
  if (isAfterWedding) return null;

  return (
    <GreetingSection>
      <SectionTitle>INVITATION</SectionTitle>
      <GreetingBody>
        <Highlight color="blue">민</Highlight>: 민낯 같은 진심으로
        <br />
        <Highlight color="blue">혁</Highlight>: 혁명같은 사랑을 시작해
        <br />
        <br />
        <Highlight color="pink">연</Highlight>: 연을 맺은 두사람이 하나가 된
        오늘
        <br />
        <Highlight color="pink">후</Highlight>: 후회없는 사랑으로 평생을
        함께하고자 합니다
        <br />
        <br />
        2026년 6월 27일,
        <br />
        소중한 걸음으로 함께해 주시면 감사하겠습니다
      </GreetingBody>
    </GreetingSection>
  );
};

export default Greeting;
