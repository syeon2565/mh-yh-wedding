import styled from "@emotion/styled";
import Cover from "./components/Cover";
import Greeting from "./components/Greeting";
import Profile from "./components/Profile";
import Calendar from "./components/Calendar";
import Gallery from "./components/Gallery";
import Location from "./components/Location";
import Account from "./components/Account";
import Guestbook from "./components/Guestbook";
import Share from "./components/Share";
import { weddingInfo } from "./data/weddingInfo";
import { colors, maxWidth } from "./styles/theme";

const Invitation = styled.main`
  max-width: ${maxWidth};
  margin: 0 auto;
  background: ${colors.bg};
  min-height: 100vh;
  overflow: hidden;
  border-radius: 24px;
`;

const App = () => {
  const oneDayAfter = new Date(weddingInfo.date.getTime() + 24 * 60 * 60 * 1000);
  const isAfterWedding = new Date() >= oneDayAfter;

  return (
    <Invitation>
      <Cover info={weddingInfo} />
      <Greeting isAfterWedding={isAfterWedding} />
      <Profile info={weddingInfo} />
      <Calendar date={weddingInfo.date} groomName={weddingInfo.groom.name} brideName={weddingInfo.bride.name} />
      <Gallery />
      <Location venue={weddingInfo.venue} isAfterWedding={isAfterWedding} />
      <Account isAfterWedding={isAfterWedding} groom={weddingInfo.groom} bride={weddingInfo.bride} />
      <Guestbook isAfterWedding={isAfterWedding} />
      <Share isAfterWedding={isAfterWedding} />
    </Invitation>
  );
};

export default App;
