import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const toastIn = keyframes`
  from { opacity: 0; transform: translateX(-50%) translateY(8px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
`;

const ToastWrap = styled.div`
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(30, 30, 30, 0.95);
  color: #fff;
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 8px;
  white-space: nowrap;
  z-index: 999;
  animation: ${toastIn} 0.2s ease;
`;

const Toast = ({ message }: { message: string | null }) => {
  if (!message) return null;
  return <ToastWrap>{message}</ToastWrap>;
};

export default Toast;
