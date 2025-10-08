import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(30, 30, 60, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
`;

const Modal = styled.div`
  background: linear-gradient(135deg, #7f5fff 0%, #3cbbff 100%);
  border-radius: 22px;
  box-shadow: 0 12px 40px rgba(40, 40, 90, 0.25);
  padding: 0;
  min-width: 400px;
  max-width: 95vw;
  min-height: 480px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
  animation: modalFadeIn 0.4s cubic-bezier(0.4, 0.8, 0.6, 1);

  @keyframes modalFadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 18px;
  right: 22px;
  background: none;
  border: none;
  font-size: 2rem;
  color: #fff;
  cursor: pointer;
  z-index: 10;
  transition: color 0.2s;
  &:hover { color: #ff5f5f; }
`;

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');

  useEffect(() => {
    setIsLogin(initialMode === 'login');
  }, [initialMode]);

  if (!isOpen) return null;

  return (
    <Overlay>
      <Modal>
        <CloseBtn onClick={onClose}>×</CloseBtn>
        {isLogin ? (
          <LoginForm 
            onSwitchToRegister={() => setIsLogin(false)} 
            onClose={onClose}
          />
        ) : (
          <RegisterForm 
            onSwitchToLogin={() => setIsLogin(true)} 
            onClose={onClose}
          />
        )}
      </Modal>
    </Overlay>
  );
}
