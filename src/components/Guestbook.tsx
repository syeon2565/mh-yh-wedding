import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

type Entry = { id: string; name: string; message: string };

type Props = {
  isAfterWedding: boolean;
};

export default function Guestbook({ isAfterWedding }: Props) {
  if (isAfterWedding) return null;
  const [entries, setEntries] = useState<Entry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "guestbook"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        message: doc.data().message,
      }));
      setEntries(data);
    });
    return () => unsubscribe();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || loading) return;

    setLoading(true);
    try {
      await addDoc(collection(db, "guestbook"), {
        name: name.trim(),
        message: message.trim(),
        createdAt: serverTimestamp(),
      });
      setName("");
      setMessage("");
    } catch (error) {
      console.error("Failed to add message:", error);
      alert("메시지 작성에 실패했습니다.");
    }
    setLoading(false);
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
        <button type="submit" disabled={loading}>
          {loading ? "작성 중..." : "작성하기"}
        </button>
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
