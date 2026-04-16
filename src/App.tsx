import Cover from "./components/Cover";
import Greeting from "./components/Greeting";
import Profile from "./components/Profile";
import Calendar from "./components/Calendar";

const weddingInfo = {
  groom: {
    name: "박민혁",
    father: "박아버지",
    mother: "○어머니",
    photo: "/images/groom.jpg",
    photoPosition: "50% 0%",
  },
  bride: {
    name: "유연후",
    father: "유아버지",
    mother: "○어머니",
    photo: "/images/bride.jpg",
    photoPosition: "50% 0%",
  },
  date: new Date("2026-06-27T11:00:00+09:00"),
} as const;

export default function App() {
  return (
    <main className="invitation">
      <Cover info={weddingInfo} />
      <Greeting />
      <Profile info={weddingInfo} />
      <Calendar date={weddingInfo.date} />
    </main>
  );
}
