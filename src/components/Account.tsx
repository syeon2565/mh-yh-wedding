import { useState } from "react";
import styled from "@emotion/styled";
import { useToast } from "../hooks/useToast";
import Toast from "./Toast";
import { Section, SectionTitle } from "../styles/shared";
import { colors, radius } from "../styles/theme";

type PersonAccounts = {
  name: string;
  father: string;
  mother: string;
  accounts: ReadonlyArray<{ role: string; bank: string; number: string }>;
};

type Props = {
  isAfterWedding: boolean;
  groom: PersonAccounts;
  bride: PersonAccounts;
};

const getName = (person: PersonAccounts, role: string) => {
  if (role === "아버지") return person.father;
  if (role === "어머니") return person.mother;
  return person.name;
};

const AccountSection = styled(Section)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const Toggle = styled('button', {
  shouldForwardProp: (prop) => prop !== '$open',
})<{ $open: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: ${colors.card};
  color: ${colors.fg};
  border: 1px solid ${colors.line};
  border-radius: ${({ $open }) => ($open ? `${radius} ${radius} 0 0` : radius)};
  border-bottom-color: ${({ $open }) => ($open ? 'transparent' : colors.line)};
  font-size: 15px;
`;

const Panel = styled.div`
  background: ${colors.card};
  border: 1px solid ${colors.line};
  border-top: none;
  border-radius: 0 0 ${radius} ${radius};
  overflow: hidden;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
`;

const RoleLabel = styled.span`
  font-size: 12px;
  color: ${colors.point};
  font-weight: 500;
  white-space: nowrap;
  flex-shrink: 0;
`;

const NameAndAccount = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2px;
  flex: 1;
`;

const PersonName = styled.span`
  font-size: 14px;
  color: ${colors.fg};
`;

const AccountNumber = styled.span`
  font-size: 13px;
  color: ${colors.muted};
`;

const CopyBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  background: transparent;
  border: none;
  color: ${colors.muted};
  cursor: pointer;

  &:hover {
    color: ${colors.point};
  }
`;

const Divider = styled.hr`
  margin: 0;
  border: none;
  border-top: 1px solid ${colors.line};
`;

const Account = ({ isAfterWedding, groom, bride }: Props) => {
  if (isAfterWedding) return null;
  const [open, setOpen] = useState<"groom" | "bride" | null>(null);
  const { toast, showToast } = useToast();

  const toggle = (key: "groom" | "bride") =>
    setOpen((prev) => (prev === key ? null : key));

  const copyAccount = async (bank: string, number: string) => {
    try {
      await navigator.clipboard.writeText(`${bank} ${number}`);
      showToast("계좌번호가 복사되었습니다");
    } catch {
      showToast("복사에 실패했습니다");
    }
  };

  const groups = [
    { key: "groom" as const, label: "신랑측 계좌번호", person: groom },
    { key: "bride" as const, label: "신부측 계좌번호", person: bride },
  ];

  return (
    <AccountSection>
      <SectionTitle>마음 전하실 곳</SectionTitle>

      {groups.map(({ key, label, person }) => (
        <Group key={key}>
          <Toggle
            type="button"
            $open={open === key}
            onClick={() => toggle(key)}
            aria-expanded={open === key}
          >
            {label}
            <span>{open === key ? "−" : "+"}</span>
          </Toggle>
          {open === key && (
            <Panel>
              {person.accounts.map((a, idx) => (
                <div key={a.number}>
                  {idx > 0 && <Divider />}
                  <Row>
                    <RoleLabel>{a.role}</RoleLabel>
                    <NameAndAccount>
                      <PersonName>{getName(person, a.role)}</PersonName>
                      <AccountNumber>{a.bank} {a.number}</AccountNumber>
                    </NameAndAccount>
                    <CopyBtn
                      type="button"
                      onClick={() => copyAccount(a.bank, a.number)}
                      aria-label="계좌번호 복사"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                      </svg>
                    </CopyBtn>
                  </Row>
                </div>
              ))}
            </Panel>
          )}
        </Group>
      ))}
      <Toast message={toast} />
    </AccountSection>
  );
};

export default Account;
