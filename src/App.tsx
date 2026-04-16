import Cover from "./components/Cover";
import Greeting from "./components/Greeting";
import Profile from "./components/Profile";
import Calendar from "./components/Calendar";
import Gallery from "./components/Gallery";
import Location from "./components/Location";
import Account from "./components/Account";
import Guestbook from "./components/Guestbook";
import Share from "./components/Share";

const weddingInfo = {
  groom: {
    name: "박민혁",
    father: "박아버지",
    mother: "○어머니",
    photo: `${import.meta.env.BASE_URL}images/groom.jpg`,
    photoPosition: "50% 0%",
  },
  bride: {
    name: "유연후",
    father: "유아버지",
    mother: "○어머니",
    photo: `${import.meta.env.BASE_URL}images/bride.jpg`,
    photoPosition: "50% 0%",
  },
  date: new Date("2026-06-27T11:00:00+09:00"),
  venue: {
    name: "목포 예술웨딩컨벤션",
    address: "전남 목포시 남농로 9",
    tel: "061-276-0050",
    mapUrl: "https://naver.me/IIt6xUQm",
  },
} as const;

export default function App() {
  const oneDayAfter = new Date(weddingInfo.date.getTime() + 24 * 60 * 60 * 1000);
  const isAfterWedding = new Date() >= oneDayAfter;

  return (
    <main className="invitation">
      <Cover info={weddingInfo} />
      <Greeting isAfterWedding={isAfterWedding} />
      <Profile info={weddingInfo} />
      <Calendar date={weddingInfo.date} groomName={weddingInfo.groom.name} brideName={weddingInfo.bride.name} />
      <Gallery />
      <Location venue={weddingInfo.venue} isAfterWedding={isAfterWedding} />
      <Account isAfterWedding={isAfterWedding} />
      <Guestbook isAfterWedding={isAfterWedding} />
      <Share isAfterWedding={isAfterWedding} />
    </main>
  );
}
