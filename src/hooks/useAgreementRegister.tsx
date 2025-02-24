import { createContext, useState, ReactNode, useContext } from "react";
import { IAgreementRegister } from "types/agreementRegister";

interface AgreementRegisterContextProps {
  setAgreementRegister: (agreement: IAgreementRegister) => void;
  agreementRegister: IAgreementRegister;
}

const AgreementRegisterContext = createContext<
  AgreementRegisterContextProps | undefined
>(undefined);

const AgreementRegisterProvider = ({ children }: { children: ReactNode }) => {
  const [agreementRegister, setAgreementRegister] =
    useState<IAgreementRegister>({} as IAgreementRegister);

  return (
    <AgreementRegisterContext.Provider
      value={{ agreementRegister, setAgreementRegister }}
    >
      {children}
    </AgreementRegisterContext.Provider>
  );
};

const useAgreementRegister = () => {
  const context = useContext(AgreementRegisterContext);

  if (!context) {
    throw new Error(
      "useAgreementRegister must be used within a AgreementRegisterProvider"
    );
  }
  return context;
};

export { AgreementRegisterProvider, useAgreementRegister };
