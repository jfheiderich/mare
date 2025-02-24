import React, { createContext, useState, ReactNode, useContext } from "react";
import { ICompanyRegister } from "types/companyRegister";

interface CompanyRegisterContextProps {
  setCompanyRegister: (company: ICompanyRegister) => void;
  companyRegister: ICompanyRegister;
}

const CompanyRegisterContext = createContext<
  CompanyRegisterContextProps | undefined
>(undefined);

const CompanyRegisterProvider = ({ children }: { children: ReactNode }) => {
  const [companyRegister, setCompanyRegister] = useState<ICompanyRegister>(
    {} as ICompanyRegister
  );

  return (
    <CompanyRegisterContext.Provider
      value={{ companyRegister, setCompanyRegister }}
    >
      {children}
    </CompanyRegisterContext.Provider>
  );
};

const useCompanyRegister = () => {
  const context = useContext(CompanyRegisterContext);

  if (!context) {
    throw new Error(
      "useCompanyRegister must be used within a CompanyRegisterProvider"
    );
  }
  return context;
};

export { CompanyRegisterProvider, useCompanyRegister };
