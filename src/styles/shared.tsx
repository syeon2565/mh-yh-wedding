import styled from '@emotion/styled';
import { colors } from './theme';

export const Section = styled.section`
  padding: 56px 24px;
  border-bottom: 1px solid ${colors.line};
  text-align: center;
`;

export const SectionTitle = styled.h2`
  font-size: 14px;
  letter-spacing: 0.2em;
  color: ${colors.point};
  font-weight: 500;
  margin: 0;
`;

export const SectionSubtitle = styled.p`
  font-size: 14px;
  color: ${colors.muted};
  margin: 0;
`;
