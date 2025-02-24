import { createContext, useState, ReactNode, useContext } from "react";
import { ICandidateRegister } from "types/candidateRegister";

interface CandidateRegisterContextProps {
  setCandidateRegister: (candidate: ICandidateRegister) => void;
  candidateRegister: ICandidateRegister;
}

const CandidateRegisterContext = createContext<
  CandidateRegisterContextProps | undefined
>(undefined);

const CandidateRegisterProvider = ({ children }: { children: ReactNode }) => {
  const [candidateRegister, setCandidateRegister] =
    useState<ICandidateRegister>({} as ICandidateRegister);

  return (
    <CandidateRegisterContext.Provider
      value={{ candidateRegister, setCandidateRegister }}
    >
      {children}
    </CandidateRegisterContext.Provider>
  );
};

const useCandidateRegister = () => {
  const context = useContext(CandidateRegisterContext);

  if (!context) {
    throw new Error(
      "useCandidateRegister must be used within a CandidateRegisterProvider"
    );
  }
  return context;
};

export { CandidateRegisterProvider, useCandidateRegister };
