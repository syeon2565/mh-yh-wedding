import styled from "@emotion/styled";
import { Section, SectionTitle, SectionSubtitle } from "../styles/shared";
import { colors } from "../styles/theme";

type Props = {
  isAfterWedding: boolean;
};

const GreetingBody = styled.p`
  font-size: 15px;
  color: ${colors.fg};
  margin: 0;
`;

const Greeting = ({ isAfterWedding }: Props) => {
  if (isAfterWedding) return null;

  return (
    <Section>
      <SectionTitle>INVITATION</SectionTitle>
      <SectionSubtitle>소중한 분들을 초대합니다</SectionSubtitle>
      <GreetingBody>
        서로가 마주보며 다져온 사랑을
        <br />
        이제 함께 한 곳을 바라보며
        <br />
        걸어갈 수 있는 큰 사랑으로 키우고자 합니다.
        <br />
        <br />
        저희 두 사람의 작은 시작에
        <br />
        오셔서 축복해 주시면 감사하겠습니다.
      </GreetingBody>
    </Section>
  );
};

export default Greeting;
