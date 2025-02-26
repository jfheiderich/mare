"use client";
import {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from "react";
import { IToast } from "@/types/toast";

interface ToastContextProps {
  showToast: (config: IToast) => void;
  toastConfig: IToast | null;
  toastVisible: boolean;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const UseToastProvider = ({ children }: { children: ReactNode }) => {
  const [toastConfig, setToastConfig] = useState<IToast | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = useCallback((config: IToast) => {
    setToastConfig(config);
    setToastVisible(true);

    const timeout = config.timeout || 5000;
    setTimeout(() => setToastVisible(false), timeout);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, toastConfig, toastVisible }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a UseToastProvider");
  }
  return context;
};
