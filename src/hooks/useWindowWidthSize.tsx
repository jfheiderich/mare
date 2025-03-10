"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
interface IUseWindowWidthSize {
  windowSize: number;
}

const UseWindowWidthSizeContext = createContext<
  IUseWindowWidthSize | undefined
>(undefined);

const UseWindowWidthSizeProvider = ({ children }: { children: ReactNode }) => {
  const [windowSize, setWindowSize] = useState(
    typeof window === "undefined" ? 0 : window.innerWidth
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      setWindowSize(typeof window === "undefined" ? 0 : window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <UseWindowWidthSizeContext.Provider value={{ windowSize }}>
      {children}
    </UseWindowWidthSizeContext.Provider>
  );
};

const useWindowWidthSize = () => {
  const context = useContext(UseWindowWidthSizeContext);

  if (context === undefined) {
    throw new Error(
      "useWindowWidthSize must be used within a UseWindowWidthSizeProvider"
    );
  }

  return context;
};

export { UseWindowWidthSizeProvider, useWindowWidthSize };
