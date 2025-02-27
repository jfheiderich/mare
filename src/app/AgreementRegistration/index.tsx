"use client";
import React, { useRef, useState } from "react";
import "./styles.scss";
import Image from "next/image";
import Title from "@/components/Texts/Title";
import Layout from "@/components/Layouts/Layout/page";
import { useParams, useRouter } from "next/navigation";
import InputText from "@/components/Inputs/InputText/page";
import Button from "@/components/Buttons/Button";
import { useAgreementRegister } from "@/hooks/useAgreementRegister";
import Textarea from "@/components/TextAreas/Textarea";

const AgreementRegistrationPage: React.FC = () => {
  const formRef = useRef<HTMLElement | null>(null);
  const { setAgreementRegister } = useAgreementRegister();
  const [agreementData, setAgreementData] = useState({
    cnpj: "",
    startDate: "",
    endDate: "",
    commercialResponsible: "",
    buyerName: "",
    buyerEmail: "",
    buyerPhone: "",
    observations: "",
  });

  const [warningInput, setWarningInput] = useState({
    cnpjIsWarning: false,
    startDateIsWarning: false,
    endDateIsWarning: false,
    commercialResponsibleIsWarning: false,
    buyerNameIsWarning: false,
    buyerEmailIsWarning: false,
    buyerPhoneIsWarning: false,
    observationsIsWarning: false,
  });

  const resetWarnings = () => {
    setWarningInput({
      cnpjIsWarning: false,
      startDateIsWarning: false,
      endDateIsWarning: false,
      commercialResponsibleIsWarning: false,
      buyerNameIsWarning: false,
      buyerEmailIsWarning: false,
      buyerPhoneIsWarning: false,
      observationsIsWarning: false,
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
    if (!validateStringObject(agreementData)) {
      return;
    }

    setAgreementRegister(agreementData);

    router.push("/agreement-view");
  };

  return (
    <Layout
      className="agreement-registration"
      hasNavbar
      pageTitle="Contas"
      hasToolBar
    >
      <Title size="h2" text="Cadastrar Contrato" />
      <main
        className="agreement-registration__form margin-top-16"
        ref={formRef}
      >
        <div className="form__wrapper">
          <InputText
            onChange={(value) =>
              setAgreementData((prev) => ({ ...prev, cnpj: value }))
            }
            value={agreementData.cnpj}
            label="CNPJ"
            placeholder=""
            mask="99.999.999/9999-99"
            isWarning={warningInput.cnpjIsWarning}
          />
          <div className="wrapper__grid-template">
            <InputText
              onChange={(value) =>
                setAgreementData((prev) => ({ ...prev, startDate: value }))
              }
              value={agreementData.startDate}
              label="Data de início"
              placeholder="dia/mês/ano"
              mask="99/99/9999"
              isWarning={warningInput.startDateIsWarning}
            />

            <InputText
              onChange={(value) =>
                setAgreementData((prev) => ({
                  ...prev,
                  endDate: value,
                }))
              }
              value={agreementData.endDate}
              label="Data de fim"
              placeholder="dia/mês/ano"
              mask="99/99/9999"
              isWarning={warningInput.endDateIsWarning}
            />
          </div>

          <InputText
            onChange={(value) =>
              setAgreementData((prev) => ({
                ...prev,
                commercialResponsible: value,
              }))
            }
            value={agreementData.commercialResponsible}
            label="Nome do Responsável Comercial"
            placeholder=""
            isWarning={warningInput.commercialResponsibleIsWarning}
          />

          <InputText
            onChange={(value) =>
              setAgreementData((prev) => ({
                ...prev,
                buyerName: value,
              }))
            }
            value={agreementData.buyerName}
            label="Nome do Comprador"
            placeholder=""
            isWarning={warningInput.buyerNameIsWarning}
          />

          <InputText
            onChange={(value) =>
              setAgreementData((prev) => ({ ...prev, buyerEmail: value }))
            }
            value={agreementData.buyerEmail}
            label="E-mail do Comprador"
            type="email"
            placeholder=""
            isWarning={warningInput.buyerEmailIsWarning}
          />

          <InputText
            onChange={(value) =>
              setAgreementData((prev) => ({
                ...prev,
                buyerPhone: value,
              }))
            }
            value={agreementData.buyerPhone}
            label="Telefone do Comprador"
            placeholder=""
            type="tel"
            mask="(99) 99999-9999"
            isWarning={warningInput.buyerPhoneIsWarning}
          />
          <Textarea
            label="Observações"
            onChange={(value) =>
              setAgreementData((prev) => ({
                ...prev,
                observations: value,
              }))
            }
            value={agreementData.observations}
            isWarning={warningInput.observationsIsWarning}
          />
        </div>
        <Button
          className="margin-top-16"
          buttonStyle="primary"
          buttonText="Salvar"
          onClick={continueHandler}
        />
      </main>
    </Layout>
  );
};

export default AgreementRegistrationPage;
