import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');

  // Actualizar el modo cuando cambie initialMode
  useEffect(() => {
    setIsLogin(initialMode === 'login');
  }, [initialMode]);

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

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
      </div>
    </div>
  );
}
