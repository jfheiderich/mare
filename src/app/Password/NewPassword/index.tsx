import React, { useState } from "react";
import "./styles.scss";
import Title from "components/Texts/Title";
import Paragraph from "components/Texts/Paragraph";
import InputText from "components/Inputs/InputText";
import Button from "components/Buttons/Button";
import Layout from "components/Layouts/Layout";
import ButtonTextLink from "components/Buttons/ButtonTextLink";
import { useNavigate } from "react-router-dom";

const NewPasswordPage: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inputsWarning, setInputsWarning] = useState(false);
  const navigate = useNavigate();

  const redefinitionPassRequest = () => {
    navigate("/redefinition-pass-success");
  };

  return (
    <Layout className="new-password-page" hasFooter hasNavbar>
      <Title text="Redefinição de senha" size="h1" />

      <section className="new-password-page__form margin-top-16">
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
          className="margin-top-16"
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

export default NewPasswordPage;
