import { createContext, useState, useEffect } from "react";

export const ToastContext = createContext();

/**
 * Provides ToastContext for the rest of the app. Displays Toast Notification.
 */
function ToastProvider({ children }) {
  const [toast, setToast] = useState({
    type: "",
    message: "",
  });

  const clearToast = () => {
    setToast({
      type: "",
      message: "",
    });
  };

  const clearSuccessToast = () => {
    if (toast?.type === "success") {
      clearToast();
    }
  };

  const clearErrorToast = () => {
    if (toast?.type === "error") {
      clearToast();
    }
  };

  return (
    <ToastContext
      value={{ toast, setToast, clearSuccessToast, clearErrorToast }}
    >
      {children}
    </ToastContext>
  );
}

export default ToastProvider;
