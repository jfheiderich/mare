"use client";
import React, { createContext, useState, ReactNode, useContext } from "react";
import { ICandidateManagement } from "@/types/candidateManagement";
import { ListAllCandidatesResponse } from "@/api/candidates/listAllCandidates";

interface CandidateManagementContextProps {
  setCandidateManagement: (
    candidate: ICandidateManagement | ListAllCandidatesResponse
  ) => void;
  candidateManagement: ICandidateManagement | ListAllCandidatesResponse;
}

const CandidateManagementContext = createContext<
  CandidateManagementContextProps | undefined
>(undefined);

const CandidateManagementProvider = ({ children }: { children: ReactNode }) => {
  const [candidateManagement, setCandidateManagement] = useState<
    ICandidateManagement | ListAllCandidatesResponse
  >({} as ICandidateManagement | ListAllCandidatesResponse);

  return (
    <CandidateManagementContext.Provider
      value={{ candidateManagement, setCandidateManagement }}
    >
      {children}
    </CandidateManagementContext.Provider>
  );
};

const useCandidateManagement = () => {
  const context = useContext(CandidateManagementContext);

  if (!context) {
    throw new Error(
      "useCandidateManagement must be used within a CandidateManagementProvider"
    );
  }
  return context;
};

export { CandidateManagementProvider, useCandidateManagement };
