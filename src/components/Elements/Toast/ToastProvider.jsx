import { createContext, useState, useEffect } from "react";

export const ToastContext = createContext();

/**
 * Provides ToastContext for the rest of the app. Displays Toast Notification.
 */
function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const clearToast = () => {
    setToast(null);
  };

  return (
    <ToastContext value={{ toast, setToast, clearToast }}>
      {children}
    </ToastContext>
  );
}

export default ToastProvider;
