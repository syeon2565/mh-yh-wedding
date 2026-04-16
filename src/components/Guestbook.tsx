import { useState } from "react";

type Entry = { id: number; name: string; message: string };

export default function Guestbook() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setEntries((prev) => [
      { id: Date.now(), name: name.trim(), message: message.trim() },
      ...prev,
    ]);
    setName("");
    setMessage("");
  };

  return (
    <section className="section guestbook">
      <h2 className="section__title">GUESTBOOK</h2>
      <p className="section__subtitle">축하 메시지를 남겨주세요</p>

      <form className="guestbook__form" onSubmit={submit}>
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="메시지"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">작성하기</button>
      </form>

      <ul className="guestbook__list">
        {entries.map((e) => (
          <li key={e.id} className="guestbook__item">
            <p className="guestbook__name">{e.name}</p>
            <p className="guestbook__message">{e.message}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
