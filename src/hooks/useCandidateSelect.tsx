"use client";
import React, { createContext, useState, ReactNode, useContext } from "react";

import { ListAllCandidatesResponse } from "@/api/candidates/listAllCandidates";

interface CandidateSelectContextProps {
  setCandidateSelect: (candidate: ListAllCandidatesResponse) => void;
  candidateSelect: ListAllCandidatesResponse;
}

const CandidateSelectContext = createContext<
  CandidateSelectContextProps | undefined
>(undefined);

const CandidateSelectProvider = ({ children }: { children: ReactNode }) => {
  const [candidateSelect, setCandidateSelect] =
    useState<ListAllCandidatesResponse>({} as ListAllCandidatesResponse);

  return (
    <CandidateSelectContext.Provider
      value={{ candidateSelect, setCandidateSelect }}
    >
      {children}
    </CandidateSelectContext.Provider>
  );
};

const useCandidateSelect = () => {
  const context = useContext(CandidateSelectContext);

  if (!context) {
    throw new Error(
      "useCandidateSelect must be used within a CandidateSelectProvider"
    );
  }
  return context;
};

export { CandidateSelectProvider, useCandidateSelect };
