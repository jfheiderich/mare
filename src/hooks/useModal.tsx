"use client";
import React, { createContext, useState, ReactNode, useContext } from "react";

interface ModalContextProps {
  openUseModal: boolean;
  setOpenUseModal: (open: boolean) => void;
  setModalContent: (content: ReactNode) => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const UseModalProvider = ({ children }: { children: ReactNode }) => {
  const [openUseModal, setOpenUseModal] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);

  return (
    <ModalContext.Provider
      value={{ openUseModal, setOpenUseModal, setModalContent }}
    >
      {children}
      {openUseModal && (
        <div className="modal-overlay">
          <div className="modal-content">{modalContent}</div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a UseModalProvider");
  }
  return context;
};
