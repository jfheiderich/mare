"use client";
import React, { useRef, useState } from "react";
import "./styles.scss";
import Image from "next/image";
import Title from "@/components/Texts/Title";
import Paragraph from "@/components/Texts/Paragraph";
import Layout from "@/components/Layouts/Layout/page";
import { useParams, useRouter } from "next/navigation";
import InputText from "@/components/Inputs/InputText/page";
import Button from "@/components/Buttons/Button";

import { useContactRegister } from "@/hooks/useContactRegister";

const ContactRegistrationPage: React.FC = () => {
  const { contactRegister, setContactRegister } = useContactRegister();
  const formRef = useRef<HTMLElement | null>(null);

  const [contactData, setContactData] = useState({
    cnpj: "",
    contactName: "",
    contactPosition: "",
    contactArea: "",
    contactEmail: "",
    contactPhone: "",
    contactCellPhone: "",
    contactLinkedInLink: "",
  });

  const [warningInput, setWarningInput] = useState({
    cnpjIsWarning: false,
    contactNameIsWarning: false,
    contactPositionIsWarning: false,
    contactAreaIsWarning: false,
    contactEmailIsWarning: false,
    contactPhoneIsWarning: false,
    contactCellPhoneIsWarning: false,
    contactLinkedInLinkIsWarning: false,
    corporateNameIsWarning: false,
  });

  const resetWarnings = () => {
    setWarningInput({
      cnpjIsWarning: false,
      contactNameIsWarning: false,
      contactPositionIsWarning: false,
      contactAreaIsWarning: false,
      contactEmailIsWarning: false,
      contactPhoneIsWarning: false,
      contactCellPhoneIsWarning: false,
      contactLinkedInLinkIsWarning: false,
      corporateNameIsWarning: false,
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
    if (!validateStringObject(contactData)) {
      return;
    }

    setContactRegister(contactData);

    router.push("/contact-registration/contact-view");
  };

  return (
    <Layout
      className="contact-registration padding-16"
      hasNavbar
      pageTitle="Contas"
      hasToolBar
    >
      <Title size="h2" text="Cadastrar Contato" />
      <main className="contact-registration__form" ref={formRef}>
        <div className="form__wrapper">
          <InputText
            onChange={(value) =>
              setContactData((prev) => ({ ...prev, cnpj: value }))
            }
            value={contactData.cnpj}
            label="CNPJ da Empresa"
            placeholder=""
            isWarning={warningInput.cnpjIsWarning}
            mask="99.999.999/9999-99"
          />

          <InputText
            onChange={(value) =>
              setContactData((prev) => ({
                ...prev,
                contactName: value,
              }))
            }
            value={contactData.contactName}
            label="Nome Completo"
            placeholder=""
            isWarning={warningInput.contactNameIsWarning}
          />

          <InputText
            onChange={(value) =>
              setContactData((prev) => ({ ...prev, contactPosition: value }))
            }
            value={contactData.contactPosition}
            label="Cargo"
            placeholder=""
            isWarning={warningInput.contactPositionIsWarning}
          />

          <InputText
            onChange={(value) =>
              setContactData((prev) => ({
                ...prev,
                contactArea: value,
              }))
            }
            value={contactData.contactArea}
            label="Área de atuação"
            placeholder=""
            isWarning={warningInput.contactAreaIsWarning}
          />

          <InputText
            onChange={(value) =>
              setContactData((prev) => ({ ...prev, contactEmail: value }))
            }
            value={contactData.contactEmail}
            label="Email"
            type="email"
            placeholder=""
            isWarning={warningInput.contactEmailIsWarning}
          />
          <div className="form__grid-template">
            <InputText
              onChange={(value) =>
                setContactData((prev) => ({ ...prev, contactPhone: value }))
              }
              value={contactData.contactPhone}
              label="Telefone"
              type="tel"
              placeholder=""
              isWarning={warningInput.contactPhoneIsWarning}
              mask="(99) 9999-9999"
            />

            <InputText
              onChange={(value) =>
                setContactData((prev) => ({
                  ...prev,
                  contactCellPhone: value,
                }))
              }
              value={contactData.contactCellPhone}
              label="Celular"
              placeholder=""
              mask="(99) 99999-9999"
              isWarning={warningInput.contactCellPhoneIsWarning}
            />
          </div>

          <InputText
            onChange={(value) =>
              setContactData((prev) => ({
                ...prev,
                contactLinkedInLink: value,
              }))
            }
            value={contactData.contactLinkedInLink}
            label="LinkedIn"
            placeholder=""
            isWarning={warningInput.contactLinkedInLinkIsWarning}
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

export default ContactRegistrationPage;
