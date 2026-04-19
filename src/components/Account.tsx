import { useState } from "react";

const ACCOUNTS = {
  groom: [
    { role: "신랑", name: "박민혁", bank: "국민은행", number: "123-4567-8901" },
    { role: "아버지", name: "박아버지", bank: "신한은행", number: "110-111-222" },
    { role: "어머니", name: "○어머니", bank: "우리은행", number: "1002-123-456" },
  ],
  bride: [
    { role: "신부", name: "유연후", bank: "카카오뱅크", number: "3333-01-1234567" },
    { role: "아버지", name: "유동용", bank: "하나은행", number: "123-456-78901" },
    { role: "어머니", name: "박미선", bank: "농협은행", number: "301-1234-5678" },
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

  const copyAccount = async (bank: string, number: string) => {
    try {
      await navigator.clipboard.writeText(`${bank} ${number}`);
      alert("계좌번호가 복사되었습니다.");
    } catch {
      alert("복사에 실패했습니다.");
    }
  };

  return (
    <section className="section account">
      <h2 className="section__title">마음 전하실 곳</h2>

      {(["groom", "bride"] as const).map((key) => (
        <div key={key} className="account__group">
          <button
            type="button"
            className={`account__toggle${open === key ? " account__toggle--open" : ""}`}
            onClick={() => toggle(key)}
            aria-expanded={open === key}
          >
            {key === "groom" ? "신랑측 계좌번호" : "신부측 계좌번호"}
            <span>{open === key ? "−" : "+"}</span>
          </button>
          {open === key && (
            <div className="account__panel">
              {ACCOUNTS[key].map((a, idx) => (
                <div key={a.number}>
                  {idx > 0 && <hr className="account__divider" />}
                  <div className="account__row">
                    <div className="account__info">
                      <span className="account__role">{a.role}</span>
                      <span className="account__name">{a.name}</span>
                    </div>
                    <div className="account__account">
                      <span className="account__number">{a.bank} {a.number}</span>
                      <button
                        type="button"
                        className="account__copy"
                        onClick={() => copyAccount(a.bank, a.number)}
                        aria-label="계좌번호 복사"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
