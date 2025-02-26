"use client";
import { createContext, useState, ReactNode, useContext } from "react";
import { IJObVacancyRegister } from "@/types/jobVacancyRegister";

interface JobVacancyRegisterContextProps {
  setJobVacancyRegister: (jobVacancy: IJObVacancyRegister) => void;
  jobVacancyRegister: IJObVacancyRegister;
}

const JobVacancyRegisterContext = createContext<
  JobVacancyRegisterContextProps | undefined
>(undefined);

const JobVacancyRegisterProvider = ({ children }: { children: ReactNode }) => {
  const [jobVacancyRegister, setJobVacancyRegister] =
    useState<IJObVacancyRegister>({} as IJObVacancyRegister);

  return (
    <JobVacancyRegisterContext.Provider
      value={{ jobVacancyRegister, setJobVacancyRegister }}
    >
      {children}
    </JobVacancyRegisterContext.Provider>
  );
};

const useJobVacancyRegister = () => {
  const context = useContext(JobVacancyRegisterContext);

  if (!context) {
    throw new Error(
      "useJobVacancyRegister must be used within a JobVacancyRegisterProvider"
    );
  }
  return context;
};

export { JobVacancyRegisterProvider, useJobVacancyRegister };
