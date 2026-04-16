import { useState } from "react";

const ACCOUNTS = {
  groom: [
    { role: "신랑", name: "김신랑", bank: "국민은행", number: "123-4567-8901" },
    { role: "아버지", name: "김아버지", bank: "신한은행", number: "110-111-222" },
  ],
  bride: [
    { role: "신부", name: "이신부", bank: "카카오뱅크", number: "3333-01-1234567" },
    { role: "어머니", name: "박어머니", bank: "우리은행", number: "1002-123-456" },
  ],
};

type Props = {
  isAfterWedding: boolean;
};

export default function Account({ isAfterWedding }: Props) {
  if (isAfterWedding) return null;
  const [open, setOpen] = useState<"groom" | "bride" | null>(null);

  const toggle = (key: "groom" | "bride") =>
    setOpen((prev) => (prev === key ? null : key));

  return (
    <section className="section account">
      <h2 className="section__title">마음 전하실 곳</h2>
      <p className="section__subtitle">
        참석이 어려우신 분들을 위해 계좌번호를 기재하였습니다.
      </p>

      {(["groom", "bride"] as const).map((key) => (
        <div key={key} className="account__group">
          <button
            type="button"
            className="account__toggle"
            onClick={() => toggle(key)}
            aria-expanded={open === key}
          >
            {key === "groom" ? "신랑측 계좌번호" : "신부측 계좌번호"}
            <span>{open === key ? "−" : "+"}</span>
          </button>
          {open === key && (
            <ul className="account__list">
              {ACCOUNTS[key].map((a) => (
                <li key={a.number} className="account__item">
                  <span>
                    {a.role} {a.name}
                  </span>
                  <span>
                    {a.bank} {a.number}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  );
}
