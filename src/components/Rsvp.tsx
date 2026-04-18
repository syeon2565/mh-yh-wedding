import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const STORAGE_KEY = "rsvp_submitted";
const HIDE_UNTIL_KEY = "rsvp_hide_until";

function shouldShow() {
  if (localStorage.getItem(STORAGE_KEY)) return false;
  const hideUntil = localStorage.getItem(HIDE_UNTIL_KEY);
  if (hideUntil && Date.now() < Number(hideUntil)) return false;
  return true;
}

export default function Rsvp({ isAfterWedding }: { isAfterWedding: boolean }) {
  const [open, setOpen] = useState(() => !isAfterWedding && shouldShow());
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [attending, setAttending] = useState<"yes" | "no" | "">("");
  const [headcount, setHeadcount] = useState(1);
  const [meal, setMeal] = useState(false);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const close = () => setOpen(false);

  const hideToday = () => {
    const midnight = new Date();
    midnight.setHours(23, 59, 59, 999);
    localStorage.setItem(HIDE_UNTIL_KEY, String(midnight.getTime()));
    setOpen(false);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !attending || loading) return;

    setLoading(true);
    try {
      await addDoc(collection(db, "rsvp"), {
        name: name.trim(),
        phone: phone.trim(),
        attending,
        headcount: attending === "yes" ? headcount : 0,
        meal: attending === "yes" ? meal : false,
        note: note.trim(),
        createdAt: serverTimestamp(),
      });
      localStorage.setItem(STORAGE_KEY, "1");
      setDone(true);
    } catch (err) {
      console.error(err);
      alert("전송에 실패했습니다. 다시 시도해주세요.");
    }
    setLoading(false);
  };

  if (!open) return null;

  return (
    <div className="rsvp-overlay" onClick={close}>
      <div className="rsvp-modal" onClick={(e) => e.stopPropagation()}>
        <button className="rsvp-modal__close" onClick={close}>✕</button>

        {done ? (
          <div className="rsvp-modal__done">
            <p className="rsvp-modal__done-emoji">💌</p>
            <p className="rsvp-modal__done-title">전달되었습니다</p>
            <p className="rsvp-modal__done-desc">소중한 답변 감사합니다</p>
            <button className="rsvp-modal__submit" onClick={close}>
              닫기
            </button>
          </div>
        ) : (
          <>
            <h2 className="rsvp-modal__title">참석 여부 전달</h2>

            <form className="rsvp-modal__form" onSubmit={submit}>
              <div className="rsvp-modal__field">
                <label>이름 *</label>
                <input
                  type="text"
                  placeholder="성함을 입력해주세요"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="rsvp-modal__field">
                <label>연락처</label>
                <input
                  type="tel"
                  placeholder="010-0000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="rsvp-modal__field">
                <label>참석 여부 *</label>
                <div className="rsvp-modal__radio-group">
                  <label className={`rsvp-modal__radio ${attending === "yes" ? "is-active" : ""}`}>
                    <input type="radio" name="attending" value="yes" checked={attending === "yes"} onChange={() => setAttending("yes")} />
                    참석합니다
                  </label>
                  <label className={`rsvp-modal__radio ${attending === "no" ? "is-active" : ""}`}>
                    <input type="radio" name="attending" value="no" checked={attending === "no"} onChange={() => setAttending("no")} />
                    불참합니다
                  </label>
                </div>
              </div>

              {attending === "yes" && (
                <div className="rsvp-modal__field">
                  <label>참석 인원 *</label>
                  <div className="rsvp-modal__counter-row">
                    <div className="rsvp-modal__counter">
                      <button type="button" onClick={() => setHeadcount((n) => Math.max(1, n - 1))}>−</button>
                      <span>{headcount}명</span>
                      <button type="button" onClick={() => setHeadcount((n) => Math.min(10, n + 1))}>+</button>
                    </div>
                    <label className="rsvp-modal__meal-check">
                      <input type="checkbox" checked={meal} onChange={(e) => setMeal(e.target.checked)} />
                      식사 예정
                    </label>
                  </div>
                </div>
              )}

              <div className="rsvp-modal__field">
                <label>메시지 (선택)</label>
                <textarea
                  placeholder="전하고 싶은 말씀을 남겨주세요"
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>

              <div className="rsvp-modal__btn-row">
                <button className="rsvp-modal__hide-today" type="button" onClick={hideToday}>
                  오늘 하루 보지 않기
                </button>
                <button
                  type="submit"
                  className="rsvp-modal__submit"
                  disabled={loading || !name.trim() || !attending}
                >
                  {loading ? "전송 중..." : "전달하기"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
