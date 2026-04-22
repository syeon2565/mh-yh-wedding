import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useToast } from "../hooks/useToast";
import Toast from "./Toast";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { Section, SectionTitle, SectionSubtitle } from "../styles/shared";
import { colors, radius } from "../styles/theme";

type Entry = { id: string; name: string; message: string };

type Props = {
  isAfterWedding: boolean;
};

const GuestbookSection = styled(Section)`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const inputStyles = `
  padding: 12px;
  border: 1px solid ${colors.line};
  border-radius: ${radius};
  font-family: inherit;
  font-size: 14px;
  background: ${colors.card};
  resize: none;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${colors.point};
  }
`;

const Input = styled.input`
  ${inputStyles}
`;

const Textarea = styled.textarea`
  ${inputStyles}
`;

const SubmitBtn = styled.button`
  margin-top: 16px;
  padding: 12px;
  background: ${colors.point};
  color: #fff;
  border: 0;
  border-radius: ${radius};
  font-size: 14px;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
`;

const Item = styled.li`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px;
  background: ${colors.card};
  border: 1px solid ${colors.line};
  border-radius: ${radius};
`;

const EntryName = styled.p`
  font-size: 14px;
  font-weight: 600;
  margin: 0;
`;

const EntryMessage = styled.p`
  font-size: 14px;
  color: ${colors.muted};
  white-space: pre-wrap;
  margin: 0;
`;

const Guestbook = ({ isAfterWedding }: Props) => {
  if (isAfterWedding) return null;
  const [entries, setEntries] = useState<Entry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast, showToast } = useToast();

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
      showToast("메시지 작성에 실패했습니다");
    }
    setLoading(false);
  };

  return (
    <GuestbookSection>
      <SectionTitle>GUESTBOOK</SectionTitle>
      <SectionSubtitle>축하 메시지를 남겨주세요</SectionSubtitle>

      <Form onSubmit={submit}>
        <Input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Textarea
          placeholder="메시지"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <SubmitBtn type="submit" disabled={loading}>
          {loading ? "작성 중..." : "작성하기"}
        </SubmitBtn>
      </Form>

      <List>
        {entries.map((e) => (
          <Item key={e.id}>
            <EntryName>{e.name}</EntryName>
            <EntryMessage>{e.message}</EntryMessage>
          </Item>
        ))}
      </List>
      <Toast message={toast} />
    </GuestbookSection>
  );
};

export default Guestbook;
