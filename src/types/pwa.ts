import { ReactNode } from "react";

export interface PWAContextData {
  isPwa: boolean;
}

export interface ProviderProps {
  children: ReactNode;
}
