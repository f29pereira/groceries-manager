import { createContext, useState, useEffect } from "react";

export const ToastContext = createContext();

/**
 * Provides ToastContext for the rest of the app
 */
function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (toast) {
      setTimeout(() => {
        setToast(null);
      }, 3000);
    }
  }, [toast]);

  return <ToastContext value={{ toast, setToast }}>{children}</ToastContext>;
}

export default ToastProvider;
