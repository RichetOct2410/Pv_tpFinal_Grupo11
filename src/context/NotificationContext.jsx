import React, { createContext, useContext, useEffect, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const NotificationContext = createContext();
const LOGS_STORAGE_KEY = "notification_logs";

export const NotificationProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [logs, setLogs] = useState(() => {
    try {
      const saved = localStorage.getItem(LOGS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(logs));
  }, [logs]);

  const notify = (message, variant = "success") => {
    const id = Date.now() + Math.random();
    const logEntry = { id, time: Date.now(), message, variant };

    setToasts((prev) => [...prev, { id, message, variant }]);
    setLogs((prev) => [...prev, logEntry]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  };

  const clearLogs = () => {
    setLogs([]);
    localStorage.removeItem(LOGS_STORAGE_KEY);
  };

  return (
    <NotificationContext.Provider value={{ notify, logs, clearLogs }}>
      {children}
      <ToastContainer position="top-end" className="p-3">
        {toasts.map((toast) => (
          <Toast key={toast.id} bg={toast.variant} onClose={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}>
            <Toast.Header>
              <strong className="me-auto">Notificación</strong>
            </Toast.Header>
            <Toast.Body className={toast.variant === "light" ? "text-dark" : "text-white"}>
              {toast.message}
            </Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification debe usarse dentro de NotificationProvider");
  }
  return context;
};
