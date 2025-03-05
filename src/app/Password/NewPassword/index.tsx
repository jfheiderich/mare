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

const NewPasswordPage: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inputsWarning, setInputsWarning] = useState(false);
  const router = useRouter();

  const redefinitionPassRequest = () => {
    router.push("/redefinition-pass-success");
  };

  return (
    <Layout className="new-password-page" hasFooter hasNavbar>
      <Title text="Redefinição de senha" size="h1" />

      <section className="new-password-page__form ">
        <InputText
          label="Insira a nova senha"
          labelId="login-company-email"
          onChange={setNewPassword}
          value={newPassword}
          isWarning={inputsWarning}
          type="password"
        />

        <InputText
          label="Confirme a nova senha"
          labelId="login-company-email"
          onChange={setConfirmPassword}
          value={confirmPassword}
          isWarning={inputsWarning}
          type="password"
        />

        <Button
          buttonStyle="primary"
          buttonText="Enviar"
          onClick={redefinitionPassRequest}
        />

        <ButtonTextLink
          text="Voltar"
          isBackButton
          routeTo="/company-login"
          className=" form__back-button"
        />
      </section>
    </Layout>
  );
};

export default NewPasswordPage;
