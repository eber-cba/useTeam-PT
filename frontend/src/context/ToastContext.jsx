import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import "../styles/toasts.css";

const ToastContext = createContext(null);

let toastId = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(
    ({ title, description, type = "info", duration = 5000 }) => {
      const id = ++toastId;
      setToasts((prev) => [...prev, { id, title, description, type }]);
      return id;
    },
    []
  );

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    const timers = toasts.map((t) => {
      const timer = setTimeout(() => removeToast(t.id), 5000);
      return () => clearTimeout(timer);
    });
    return () => timers.forEach((c) => c && c());
  }, [toasts, removeToast]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="toast-wrapper" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast-${t.type}`}>
            <div className="toast-header">
              <strong className="toast-title">{t.title}</strong>
              <button className="toast-close" onClick={() => removeToast(t.id)}>
                ×
              </button>
            </div>
            {t.description ? (
              <div className="toast-body">{t.description}</div>
            ) : null}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
};

export default ToastProvider;
