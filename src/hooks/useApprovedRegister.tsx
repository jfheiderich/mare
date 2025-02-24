import { createContext, useState, ReactNode, useContext } from "react";
import { IApprovedRegister } from "types/approvedRegister";

interface ApprovedRegisterContextProps {
  setApprovedRegister: (agreement: IApprovedRegister) => void;
  approvedRegister: IApprovedRegister;
}

const ApprovedRegisterContext = createContext<
  ApprovedRegisterContextProps | undefined
>(undefined);

const ApprovedRegisterProvider = ({ children }: { children: ReactNode }) => {
  const [approvedRegister, setApprovedRegister] = useState<IApprovedRegister>(
    {} as IApprovedRegister
  );

  return (
    <ApprovedRegisterContext.Provider
      value={{ approvedRegister, setApprovedRegister }}
    >
      {children}
    </ApprovedRegisterContext.Provider>
  );
};

const useApprovedRegister = () => {
  const context = useContext(ApprovedRegisterContext);

  if (!context) {
    throw new Error(
      "useApprovedRegister must be used within a ApprovedRegisterProvider"
    );
  }
  return context;
};

export { ApprovedRegisterProvider, useApprovedRegister };
