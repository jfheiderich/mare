import React, { createContext, useState, useContext, useEffect } from "react";
import { ProviderProps, PWAContextData } from "../types/pwa";

const isRunningStandalone = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(display-mode: standalone)").matches;
};

const PWAContext = createContext<PWAContextData | undefined>(undefined);

const PwaProvider: React.FC<ProviderProps> = ({ children }: ProviderProps) => {
  const [isPwa, setIsPwa] = useState<boolean>(false);

  useEffect(() => {
    setIsPwa(isRunningStandalone());
  }, []);

  return (
    <PWAContext.Provider value={{ isPwa }}>{children}</PWAContext.Provider>
  );
};

const usePwa = (): PWAContextData => {
  const context = useContext(PWAContext);

  if (!context) {
    throw new Error("usePwa must be used within a PwaProvider");
  }

  return context;
};

export { PwaProvider, usePwa };
