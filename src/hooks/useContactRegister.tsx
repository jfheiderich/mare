"use client";
import { createContext, useState, ReactNode, useContext } from "react";
import { IContactRegister } from "@/types/contactRegister";

interface ContactRegisterContextProps {
  setContactRegister: (contact: IContactRegister) => void;
  contactRegister: IContactRegister;
}

const ContactRegisterContext = createContext<
  ContactRegisterContextProps | undefined
>(undefined);

const ContactRegisterProvider = ({ children }: { children: ReactNode }) => {
  const [contactRegister, setContactRegister] = useState<IContactRegister>(
    {} as IContactRegister
  );

  return (
    <ContactRegisterContext.Provider
      value={{ contactRegister, setContactRegister }}
    >
      {children}
    </ContactRegisterContext.Provider>
  );
};

const useContactRegister = () => {
  const context = useContext(ContactRegisterContext);

  if (!context) {
    throw new Error(
      "useContactRegister must be used within a ContactRegisterProvider"
    );
  }
  return context;
};

export { ContactRegisterProvider, useContactRegister };
