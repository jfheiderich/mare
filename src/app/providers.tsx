import { PwaProvider } from "@/contexts/pwa";
import { AgreementRegisterProvider } from "@/hooks/useAgreementRegister";
import { ApprovedRegisterProvider } from "@/hooks/useApprovedRegister";
import { CandidateManagementProvider } from "@/hooks/useCandidateManagement";
import { CandidateSelectProvider } from "@/hooks/useCandidateSelect";
import { CompanyRegisterProvider } from "@/hooks/useCompanyRegister";
import { ContactRegisterProvider } from "@/hooks/useContactRegister";
import { JobVacancyRegisterProvider } from "@/hooks/useJobVacancyRegister";
import { UseModalProvider } from "@/hooks/useModal";
import { CandidateRegisterProvider } from "@/hooks/userCandidateRegister";
import { UserInfoProvider } from "@/hooks/userInfo";
import { UseToastProvider } from "@/hooks/useToast";
import { UseWindowWidthSizeProvider } from "@/hooks/useWindowWidthSize";
import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <PwaProvider>
      <UserInfoProvider>
        <UseModalProvider>
          <UseToastProvider>
            <UseWindowWidthSizeProvider>
              <AgreementRegisterProvider>
                <ContactRegisterProvider>
                  <ApprovedRegisterProvider>
                    <CandidateManagementProvider>
                      <CompanyRegisterProvider>
                        <JobVacancyRegisterProvider>
                          <CandidateRegisterProvider>
                            <CandidateSelectProvider>
                              {children}
                            </CandidateSelectProvider>
                          </CandidateRegisterProvider>
                        </JobVacancyRegisterProvider>
                      </CompanyRegisterProvider>
                    </CandidateManagementProvider>
                  </ApprovedRegisterProvider>
                </ContactRegisterProvider>
              </AgreementRegisterProvider>
            </UseWindowWidthSizeProvider>
          </UseToastProvider>
        </UseModalProvider>
      </UserInfoProvider>
    </PwaProvider>
  );
};

export default Providers;
