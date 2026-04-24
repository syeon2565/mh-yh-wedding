export const weddingInfo = {
  groom: {
    name: "박민혁",
    father: "박성록",
    mother: "정경란",
    photo: `${import.meta.env.BASE_URL}images/groom.jpeg`,
    photoPosition: "50% 0%",
    accounts: [
      { role: "아버지", bank: "신한은행", number: "110-259923993" },
      { role: "어머니", bank: "농협은행", number: "312-92591687-91" },
      { role: "신랑", bank: "카카오뱅크", number: "3333-05-7932807" },
    ],
  },
  bride: {
    name: "유연후",
    father: "유동용",
    mother: "박미선",
    photo: `${import.meta.env.BASE_URL}images/bride.jpeg`,
    photoPosition: "50% 0%",
    accounts: [
      { role: "아버지", bank: "하나은행", number: "196-890054-23907" },
      { role: "어머니", bank: "농협은행", number: "356-0963-9918-93" },
      { role: "신부", bank: "카카오뱅크", number: "3333-13-8609330" },
    ],
  },
  startDate: "2021-10-17T00:00:00+09:00",
  date: new Date("2026-06-27T11:00:00+09:00"),
  venue: {
    name: "목포예술웨딩컨벤션",
    hall: "2층 하비홀",
    address: "전남 목포시 남농로 9",
    tel: "061-276-0050",
    mapUrl: "https://naver.me/IIt6xUQm",
  },
} as const;
