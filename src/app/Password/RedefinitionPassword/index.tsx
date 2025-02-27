import React, { useState } from "react";
import "./styles.scss";
import Image from "next/image";
import Title from "@/components/Texts/Title";
import Paragraph from "@/components/Texts/Paragraph";
import InputText from "@/components/Inputs/InputText/page";
import Button from "@/components/Buttons/Button";
import Layout from "@/components/Layouts/Layout/page";
import ButtonTextLink from "@/components/Buttons/ButtonTextLink";
import { useParams, useRouter } from "next/navigation";

const RedefinitionPasswordPage: React.FC = () => {
  const [companyEmail, setCompanyEmail] = useState("");
  const [inputsWarning, setInputsWarning] = useState(false);
  const router = useRouter();

  const redefinitionPassRequest = () => {
    router.push("/new-pass");
  };

  return (
    <Layout className="redefinition-password-page" hasFooter hasNavbar>
      <Title text="Solicitar redefinição de senha" size="h1" />

      <Paragraph text="Insira seu e-mail abaixo para redefinir a sua senha." />

      <section className="redefinition-password-page__form margin-top-16">
        <InputText
          label="E-mail cadastrado"
          labelId="redefinition-password-email"
          onChange={setCompanyEmail}
          value={companyEmail}
          type="email"
          isWarning={inputsWarning}
        />

        <Button
          buttonStyle="primary"
          buttonText="Enviar"
          onClick={redefinitionPassRequest}
          className="margin-top-16"
        />

        <ButtonTextLink
          text="Voltar"
          isBackButton
          routeTo="/company-login"
          className="margin-top-16 form__back-button"
        />
      </section>
    </Layout>
  );
};

export default RedefinitionPasswordPage;
