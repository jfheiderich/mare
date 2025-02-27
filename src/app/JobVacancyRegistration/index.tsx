"use client";
import React, { useRef, useState } from "react";
import "./styles.scss";
import Image from "next/image";
import Title from "@/components/Texts/Title";
import Layout from "@/components/Layouts/Layout/page";
import { useParams, useRouter } from "next/navigation";
import InputText from "@/components/Inputs/InputText/page";
import Button from "@/components/Buttons/Button";
import Textarea from "@/components/TextAreas/Textarea";
import { useJobVacancyRegister } from "@/hooks/useJobVacancyRegister";
import { getSearchAddressByCEP } from "api/getSearchApi";
import InputTextSelect, {
  IOptionInputTextSelectProps,
} from "@/components/Inputs/InputTextSelect/page";
import STATES from "@/mocks/states";

const JobVacancyRegistrationPage: React.FC = () => {
  const formRef = useRef<HTMLElement | null>(null);
  const { setJobVacancyRegister } = useJobVacancyRegister();
  const [registrationStep, setRegistrationStep] = useState(1);

  const [vacancyData, setVacancyData] = useState({
    contractId: "",
    vacancyCNPJ: "",
    vacancyCorporateName: "",
    vacancyTradeName: "",
  });

  const [vacancyAddressData, setVacancyAddressData] = useState({
    vacancyCEP: "",
    vacancyStreet: "",
    vacancyNumber: "",
    vacancyComplement: "",
    vacancyState: "",
    vacancyCity: "",
    vacancyNeighborhood: "",
  });

  const [vacancyDescriptionData, setVacancyDescriptionData] = useState({
    vacancyCBO: "",
    vacancySalary: "",
    vacancyName: "",
    vacancyBenefits: "",
    vacancyDescription: "",
  });

  const [warningInput, setWarningInput] = useState({
    contractIdIsWarning: false,
    vacancyCNPJIsWarning: false,
    vacancyCorporateNameIsWarning: false,
    vacancyTradeNameIsWarning: false,
    vacancyCEPIsWarning: false,
    vacancyStreetIsWarning: false,
    vacancyNumberIsWarning: false,
    vacancyComplementIsWarning: false,
    vacancyStateIsWarning: false,
    vacancyCityIsWarning: false,
    vacancyCBOIsWarning: false,
    vacancySalaryIsWarning: false,
    vacancyNameIsWarning: false,
    vacancyBenefitsIsWarning: false,
    vacancyDescriptionIsWarning: false,
    vacancyNeighborhoodIsWarning: false,
  });

  const resetWarnings = () => {
    setWarningInput({
      contractIdIsWarning: false,
      vacancyCNPJIsWarning: false,
      vacancyCorporateNameIsWarning: false,
      vacancyTradeNameIsWarning: false,
      vacancyCEPIsWarning: false,
      vacancyStreetIsWarning: false,
      vacancyNumberIsWarning: false,
      vacancyComplementIsWarning: false,
      vacancyStateIsWarning: false,
      vacancyCityIsWarning: false,
      vacancyCBOIsWarning: false,
      vacancySalaryIsWarning: false,
      vacancyNameIsWarning: false,
      vacancyBenefitsIsWarning: false,
      vacancyDescriptionIsWarning: false,
      vacancyNeighborhoodIsWarning: false,
    });
  };

  const router = useRouter();

  const validateStringObject = (object: Record<string, string>) => {
    const warningInputs = Object.entries(object)
      .filter(([_, value]) => !value)
      .map(([key, _]) => `${key}IsWarning`);

    setWarningInput((prev) => {
      const updatedWarnings = warningInputs.reduce((acc, warning) => {
        return { ...acc, [warning]: true };
      }, {} as Record<string, boolean>);

      return { ...prev, ...updatedWarnings };
    });

    setTimeout(() => {
      resetWarnings();
    }, 4000);

    if (warningInputs.length) {
      return false;
    } else {
      return true;
    }
  };

  const continueHandler = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (registrationStep === 1) {
      if (!validateStringObject(vacancyData)) {
        return;
      }
    }

    if (registrationStep === 2) {
      if (!validateStringObject(vacancyAddressData)) {
        return;
      }
    }

    if (registrationStep === 3) {
      if (!validateStringObject(vacancyDescriptionData)) {
        return;
      }

      const prepareData = {
        ...vacancyData,
        ...vacancyAddressData,
        ...vacancyDescriptionData,
      };

      setJobVacancyRegister(prepareData);

      router.push("/job-vacancy-view");
    }

    setRegistrationStep((prev) => prev + 1);
  };

  const searchAddressByCEP = async (cep: string) => {
    try {
      setVacancyAddressData((prev) => ({
        ...prev,
        vacancyCEP: cep,
      }));
      if (cep.length === 9) {
        const resAddress = await getSearchAddressByCEP(cep);
        setVacancyAddressData((prev) => ({
          ...prev,
          vacancyCity: resAddress.localidade,
          vacancyNeighborhood: resAddress.bairro,
          vacancyCEP: cep,
          vacancyStreet: resAddress.logradouro,
          vacancyState: resAddress.uf,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const elements: IOptionInputTextSelectProps[] = STATES.map((states) => {
    return {
      groupName: "states",
      label: states.acronym,
      value: states.acronym,
    };
  });

  return (
    <Layout
      className="job-vacancy"
      hasNavbar
      pageTitle="Processo Seletivo"
      hasToolBar
    >
      <Title size="h2" text={`Cadastrar Vaga (${registrationStep}/3)`} />
      <main className="job-vacancy__form margin-top-16" ref={formRef}>
        {registrationStep === 1 ? (
          <div className="form__wrapper">
            <InputText
              onChange={(value) =>
                setVacancyData((prev) => ({ ...prev, contractId: value }))
              }
              value={vacancyData.contractId}
              label="ID do Contrato"
              placeholder=""
              type="text"
              isWarning={warningInput.contractIdIsWarning}
            />
            <InputText
              onChange={(value) =>
                setVacancyData((prev) => ({ ...prev, vacancyCNPJ: value }))
              }
              value={vacancyData.vacancyCNPJ}
              label="CNPJ do local da vaga"
              placeholder=""
              type="text"
              mask="99.999.999/9999-99"
              isWarning={warningInput.vacancyCNPJIsWarning}
            />

            <InputText
              onChange={(value) =>
                setVacancyData((prev) => ({
                  ...prev,
                  vacancyCorporateName: value,
                }))
              }
              value={vacancyData.vacancyCorporateName}
              label="Razão Social do local da vaga"
              placeholder=""
              type="text"
              isWarning={warningInput.vacancyCorporateNameIsWarning}
            />
            <InputText
              onChange={(value) =>
                setVacancyData((prev) => ({
                  ...prev,
                  vacancyTradeName: value,
                }))
              }
              value={vacancyData.vacancyTradeName}
              label="Nome Fantasia do local da vaga"
              placeholder=""
              isWarning={warningInput.vacancyTradeNameIsWarning}
              type="text"
            />
          </div>
        ) : registrationStep === 2 ? (
          <div className="form__wrapper">
            <InputText
              onChange={searchAddressByCEP}
              value={vacancyAddressData.vacancyCEP}
              label="CEP"
              mask="99999-999"
              placeholder=""
              type="text"
              isWarning={warningInput.vacancyCEPIsWarning}
            />
            <InputText
              onChange={(value) =>
                setVacancyAddressData((prev) => ({
                  ...prev,
                  vacancyStreet: value,
                }))
              }
              value={vacancyAddressData.vacancyStreet}
              label="Endereço"
              placeholder=""
              type="text"
              isWarning={warningInput.vacancyStreetIsWarning}
            />
            <div className="wrapper__grid-template">
              <InputText
                onChange={(value) =>
                  setVacancyAddressData((prev) => ({
                    ...prev,
                    vacancyNumber: value,
                  }))
                }
                value={vacancyAddressData.vacancyNumber}
                label="Número"
                placeholder=""
                type="text"
                isWarning={warningInput.vacancyNumberIsWarning}
              />
              <InputText
                onChange={(value) =>
                  setVacancyAddressData((prev) => ({
                    ...prev,
                    vacancyComplement: value,
                  }))
                }
                value={vacancyAddressData.vacancyComplement}
                label="Complemento"
                placeholder=""
                type="text"
                isWarning={warningInput.vacancyComplementIsWarning}
              />
            </div>

            <InputText
              onChange={(value) =>
                setVacancyAddressData((prev) => ({
                  ...prev,
                  vacancyNeighborhood: value,
                }))
              }
              value={vacancyAddressData.vacancyNeighborhood}
              label="Bairro"
              placeholder=""
              type="text"
              isWarning={warningInput.vacancyNeighborhoodIsWarning}
            />

            <div className="wrapper__grid-template">
              <InputTextSelect
                options={elements}
                searchOptions
                setInputValue={(value) =>
                  setVacancyAddressData((prev) => ({
                    ...prev,
                    vacancyState: value,
                  }))
                }
                label="Estado"
                inputValue={vacancyAddressData.vacancyState}
              />

              <InputText
                onChange={(value) =>
                  setVacancyAddressData((prev) => ({
                    ...prev,
                    vacancyCity: value,
                  }))
                }
                value={vacancyAddressData.vacancyCity}
                label="Cidade"
                placeholder=""
                type="text"
                isWarning={warningInput.vacancyCityIsWarning}
              />
            </div>
          </div>
        ) : registrationStep === 3 ? (
          <div className="form__wrapper">
            <div className="wrapper__grid-template--modified">
              <InputText
                onChange={(value) =>
                  setVacancyDescriptionData((prev) => ({
                    ...prev,
                    vacancyCBO: value,
                  }))
                }
                value={vacancyDescriptionData.vacancyCBO}
                label="CBO"
                placeholder=""
                type="text"
                isWarning={warningInput.vacancyCBOIsWarning}
              />
              <InputText
                onChange={(value) =>
                  setVacancyDescriptionData((prev) => ({
                    ...prev,
                    vacancySalary: value,
                  }))
                }
                value={vacancyDescriptionData.vacancySalary}
                label="Salário	"
                placeholder=""
                type="text"
                isWarning={warningInput.vacancySalaryIsWarning}
              />
            </div>
            <InputText
              onChange={(value) =>
                setVacancyDescriptionData((prev) => ({
                  ...prev,
                  vacancyName: value,
                }))
              }
              value={vacancyDescriptionData.vacancyName}
              label="Nome da vaga"
              placeholder=""
              type="text"
              isWarning={warningInput.vacancyNameIsWarning}
            />
            <Textarea
              label="Benefícios"
              onChange={(value) =>
                setVacancyDescriptionData((prev) => ({
                  ...prev,
                  vacancyBenefits: value,
                }))
              }
              value={vacancyDescriptionData.vacancyBenefits}
              isWarning={warningInput.vacancyBenefitsIsWarning}
            />
            <Textarea
              label="Descrição da vaga"
              onChange={(value) =>
                setVacancyDescriptionData((prev) => ({
                  ...prev,
                  vacancyDescription: value,
                }))
              }
              value={vacancyDescriptionData.vacancyDescription}
              isWarning={warningInput.vacancyDescriptionIsWarning}
            />
          </div>
        ) : (
          false
        )}

        <Button
          className="margin-top-16"
          buttonStyle="primary"
          buttonText={registrationStep === 3 ? "Salvar" : "Continuar"}
          onClick={continueHandler}
        />
      </main>
    </Layout>
  );
};

export default JobVacancyRegistrationPage;
