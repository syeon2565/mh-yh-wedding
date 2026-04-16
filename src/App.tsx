import Cover from "./components/Cover";
import Greeting from "./components/Greeting";

const weddingInfo = {
  groom: { name: "박민혁" },
  bride: { name: "유연후" },
  date: new Date("2026-06-27T11:00:00+09:00"),
} as const;

export default function App() {
  return (
    <main className="invitation">
      <Cover info={weddingInfo} />
      <Greeting />
    </main>
  );
}
