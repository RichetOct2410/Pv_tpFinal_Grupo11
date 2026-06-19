import React, { createContext, useContext, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const notify = (message, variant = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
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
