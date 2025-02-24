import React, { useState } from "react";
import "./styles.scss";
import Layout from "components/Layouts/Layout";
import Title from "components/Texts/Title";
import Paragraph from "components/Texts/Paragraph";
import InputText from "components/Inputs/InputText";
import Button from "components/Buttons/Button";
import ButtonTextLink from "components/Buttons/ButtonTextLink";
import { useNavigate } from "react-router-dom";
import OpenedEye from "assets/icons/eyes/opened-eye-icon-green.svg";
import ClosedEye from "assets/icons/eyes/closed-eye-icon-green.svg";
import { useToast } from "hooks/useToast";
import { validateEmail } from "utils/validates";
import LOGIN from "api/user/login";
import Loading from "components/Loading";
import { useUserInfo } from "hooks/userInfo";
import { IUserInfo } from "types/userInfo";

const CompanyLoginPage: React.FC = () => {
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPass, setCompanyPass] = useState("");
  const [inputsWarning, setInputsWarning] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setUserInfo } = useUserInfo();

  const { showToast } = useToast();

  const navigate = useNavigate();

  const loginHandler = async () => {
    if (isLoading) return;

    if (!validateEmail(companyEmail) || companyPass.length < 8) {
      setInputsWarning(true);
      showToast({
        type: "error",
        title: "Credenciais inválidas",
        description: "Verifique seu EMAIL e SENHA e tente novamente.",
      });
      setTimeout(() => setInputsWarning(false), 5000);
      return;
    }

    setIsLoading(true);

    try {
      const request = await LOGIN({
        email: companyEmail,
        password: companyPass,
      });

      switch (request.status) {
        case 200:
          const user = request.res;

          setUserInfo("@mare_access-token", user?.token ?? "");
          setUserInfo("@mare_display_name", user?.name ?? "");
          setUserInfo("@mare_user_email", user?.email ?? "");
          setUserInfo("@mare_user_id", user?.id ?? "");
          setUserInfo("@mare_user_role", user?.role ?? "");

          navigate("/home");

          break;

        default:
          setInputsWarning(true);
          showToast({
            type: "error",
            title: "Credenciais inválidas",
            description: "Verifique seu EMAIL e SENHA e tente novamente.",
          });
          setTimeout(() => setInputsWarning(false), 5000);
          break;
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const loginPageHandler = () => {};

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout
      className="company-login-page"
      hasFooter
      hasNavbar
      hasFooterContacts
      loginCompany={loginPageHandler}
    >
      <main className="company-login-page__main">
        <Paragraph
          boldText
          fontSize={20}
          text={`Empresa`}
          className="margin-bottom-16"
        />
        <Paragraph
          fontSize={20}
          text={`Acesse a sua conta com seu e-mail e senha
					cadastrados.`}
        />
        <section className="main__form">
          <InputText
            label="E-mail cadastrado"
            labelId="login-company-email"
            onChange={setCompanyEmail}
            value={companyEmail}
            isWarning={inputsWarning}
            type="email"
          />

          <InputText
            label="Senha"
            labelId="login-company-password"
            onChange={setCompanyPass}
            value={companyPass}
            isWarning={inputsWarning}
            type={showPassword ? "text" : "password"}
            iconRight={showPassword ? ClosedEye : OpenedEye}
            iconRightClick={() => setShowPassword((prev) => !prev)}
          />

          <Button
            buttonStyle="primary"
            buttonText="Enviar"
            onClick={loginHandler}
            isDisabled={isLoading}
          />

          <ButtonTextLink
            className="form__link-button"
            text="Esqueci minha senha"
            routeTo="/redefinition-pass"
            buttonStyle="light-14"
            isDisabled={isLoading}
            alignTo={"right"}
          />
        </section>
      </main>
    </Layout>
  );
};

export default CompanyLoginPage;
