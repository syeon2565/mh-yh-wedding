import { Global, css } from '@emotion/react';
import { colors } from './theme';

const globalStyles = css`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    background: #eee;
    color: ${colors.fg};
    font-family: "Wanted Sans Variable", "Wanted Sans", "Pretendard",
      -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Noto Sans KR",
      sans-serif;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }
`;

const GlobalStyle = () => <Global styles={globalStyles} />;

export default GlobalStyle;
