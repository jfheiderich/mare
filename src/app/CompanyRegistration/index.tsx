"use client";
import React, { useRef, useState } from "react";
import "./styles.scss";
import Image from "next/image";
import Title from "@/components/Texts/Title";
import Paragraph from "@/components/Texts/Paragraph";
import Layout from "@/components/Layouts/Layout";
import { useParams, useRouter } from "next/navigation";
import InputText from "@/components/Inputs/InputText";
import Button from "@/components/Buttons/Button";
import { useCompanyRegister } from "@/hooks/useCompanyRegister";
import { getSearchAddressByCEP } from "api/getSearchApi";
import STATES from "@/mocks/states";
import InputTextSelect, {
  IOptionInputTextSelectProps,
} from "@/components/Inputs/InputTextSelect";

const CompanyRegistrationPage: React.FC = () => {
  const [registrationStep, setRegistrationStep] = useState(1);
  const formRef = useRef<HTMLElement | null>(null);

  const { setCompanyRegister } = useCompanyRegister();

  const [companyDataName, setCompanyDataName] = useState({
    cnpj: "",
    corporateName: "",
    tradeName: "",
  });

  const [companyDataAddress, setCompanyDataAddress] = useState({
    postalCode: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    country: "",
    state: "",
  });

  const [companyDataWebSite, setCompanyDataWebSite] = useState({ website: "" });

  const [warningInput, setWarningInput] = useState({
    cnpjIsWarning: false,
    corporateNameIsWarning: false,
    tradeNameIsWarning: false,
    postalCodeIsWarning: false,
    streetIsWarning: false,
    numberIsWarning: false,
    complementIsWarning: false,
    neighborhoodIsWarning: false,
    cityIsWarning: false,
    countryIsWarning: false,
    webSiteIsWarning: false,
    stateIsWarning: false,
  });

  const resetWarnings = () => {
    setWarningInput({
      cnpjIsWarning: false,
      corporateNameIsWarning: false,
      tradeNameIsWarning: false,
      postalCodeIsWarning: false,
      streetIsWarning: false,
      numberIsWarning: false,
      complementIsWarning: false,
      neighborhoodIsWarning: false,
      cityIsWarning: false,
      countryIsWarning: false,
      webSiteIsWarning: false,
      stateIsWarning: false,
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
      if (!validateStringObject(companyDataName)) {
        return;
      }
    }

    if (registrationStep === 2) {
      if (!validateStringObject(companyDataAddress)) {
        return;
      }
    }

    if (registrationStep === 3) {
      if (!validateStringObject(companyDataWebSite)) {
        return;
      }

      const prepareData = {
        ...companyDataName,
        ...companyDataAddress,
        ...companyDataWebSite,
      };
      setCompanyRegister(prepareData);

      router.push("/company-view");
    }

    setRegistrationStep((prev) => prev + 1);
  };

  const searchAddressByCEP = async (cep: string) => {
    try {
      setCompanyDataAddress((prev) => ({
        ...prev,
        postalCode: cep,
      }));
      if (cep.length === 9) {
        const resAddress = await getSearchAddressByCEP(cep);
        setCompanyDataAddress((prev) => ({
          ...prev,
          city: resAddress.localidade,
          country: "Brasil",
          neighborhood: resAddress.bairro,
          postalCode: cep,
          street: resAddress.logradouro,
          state: resAddress.uf,
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
      className="company-registration-page"
      hasNavbar
      pageTitle="Contas"
      hasToolBar
    >
      <Title size="h2" text={`Cadastrar Empresa (${registrationStep}/3)`} />
      <main
        className="company-registration-page__form margin-top-16"
        ref={formRef}
      >
        {registrationStep === 1 ? (
          <div className="form__wrapper">
            <InputText
              onChange={(value) =>
                setCompanyDataName((prev) => ({ ...prev, cnpj: value }))
              }
              value={companyDataName.cnpj}
              label="CNPJ"
              placeholder=""
              mask="99.999.999/9999-99"
              isWarning={warningInput.cnpjIsWarning}
            />
            <InputText
              onChange={(value) =>
                setCompanyDataName((prev) => ({
                  ...prev,
                  corporateName: value,
                }))
              }
              value={companyDataName.corporateName}
              label="Razão Social"
              placeholder=""
              isWarning={warningInput.corporateNameIsWarning}
            />
            <InputText
              onChange={(value) =>
                setCompanyDataName((prev) => ({ ...prev, tradeName: value }))
              }
              value={companyDataName.tradeName}
              label="Nome Fantasia"
              placeholder=""
              isWarning={warningInput.tradeNameIsWarning}
            />
          </div>
        ) : registrationStep === 2 ? (
          <div className="form__wrapper">
            <InputText
              onChange={searchAddressByCEP}
              value={companyDataAddress.postalCode}
              label="CEP"
              mask="99999-999"
              placeholder=""
              isWarning={warningInput.postalCodeIsWarning}
            />
            <InputText
              onChange={(value) =>
                setCompanyDataAddress((prev) => ({ ...prev, street: value }))
              }
              value={companyDataAddress.street}
              label="Rua"
              placeholder=""
              isWarning={warningInput.streetIsWarning}
            />
            <div className="grid-template">
              <InputText
                onChange={(value) =>
                  setCompanyDataAddress((prev) => ({ ...prev, number: value }))
                }
                value={companyDataAddress.number}
                label="Número"
                placeholder=""
                isWarning={warningInput.numberIsWarning}
              />
              <InputText
                onChange={(value) =>
                  setCompanyDataAddress((prev) => ({
                    ...prev,
                    complement: value,
                  }))
                }
                value={companyDataAddress.complement}
                label="Complemento"
                placeholder=""
                isWarning={warningInput.complementIsWarning}
              />
            </div>

            <InputText
              onChange={(value) =>
                setCompanyDataAddress((prev) => ({
                  ...prev,
                  neighborhood: value,
                }))
              }
              value={companyDataAddress.neighborhood}
              label="Bairro"
              placeholder=""
              isWarning={warningInput.neighborhoodIsWarning}
            />
            <div className="grid-template">
              <InputTextSelect
                searchOptions
                options={elements}
                setInputValue={(value) =>
                  setCompanyDataAddress((prev) => ({
                    ...prev,
                    state: value,
                  }))
                }
                label="Estado"
                inputValue={companyDataAddress.state}
              />

              <InputText
                onChange={(value) =>
                  setCompanyDataAddress((prev) => ({ ...prev, city: value }))
                }
                value={companyDataAddress.city}
                label="Cidade"
                placeholder=""
                isWarning={warningInput.cityIsWarning}
              />
            </div>
            <InputText
              onChange={(value) =>
                setCompanyDataAddress((prev) => ({ ...prev, country: value }))
              }
              value={companyDataAddress.country}
              label="País"
              placeholder=""
              isWarning={warningInput.countryIsWarning}
            />
          </div>
        ) : registrationStep === 3 ? (
          <div className="form__wrapper">
            <InputText
              onChange={(value) =>
                setCompanyDataWebSite((prev) => ({ ...prev, website: value }))
              }
              value={companyDataWebSite.website}
              label="Site"
              placeholder=""
              isWarning={warningInput.webSiteIsWarning}
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

export default CompanyRegistrationPage;
