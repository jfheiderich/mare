"use client";
import React, { useEffect, useState } from "react";
import "./styles.scss";
import { useWindowWidthSize } from "@/hooks/useWindowWidthSize";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layouts/Layout/page";
import Paragraph from "@/components/Texts/Paragraph";
import CheckSquare from "../../public/icons/checks/check-square-white.svg";
import InputText from "@/components/Inputs/InputText/page";
import { usePwa } from "@/contexts/pwa";
import SplashPage from "./SplashPage";

const LandingPage: React.FC = () => {
  const { windowSize } = useWindowWidthSize();
  const { isPwa } = usePwa();
  const router = useRouter();

  const [isSplashPage, setIsSplashPage] = useState(false);
  const [emailBudget, setEmailBudget] = useState("");

  // useEffect(() => {
  //   if (isPwa) {
  //     router.push("/home");
  //   }
  // }, [isPwa]);

  useEffect(() => {
    if (windowSize < 768) {
      setIsSplashPage(true);
    }
  }, []);

  return (
    <>
      <div className="landing-page">
        {isSplashPage && windowSize < 768 ? (
          <SplashPage
            backgroundColor="var(--mare-sea-dust)"
            finishLoadingTrigger={() => setIsSplashPage(false)}
          />
        ) : (
          false
        )}
      </div>
      {!isSplashPage ? (
        <Layout
          backButtonText="Login"
          backButtonLink="/company-login"
          isBackButton={false}
          className="landing-page-layout"
          hasNavbar
          hasToolBar={false}
          hasFooterContacts
        >
          <main className="landing-page-layout__main">
            <p className="main__introduce-text">
              Reduza seu turnover e contrate com&nbsp;
              <b>eficiência</b>! Conectamos sua empresa a profissionais&nbsp;
              <b>comprometidos</b>e&nbsp;
              <b>dispostos</b>que buscam oportunidades no mercado de trabalho.
            </p>

            <section className="main__about-us-wrapper">
              <p className="about-us-wrapper__title">Sobre nós</p>
              <p className="about-us-wrapper__paragraph">
                A MARE é uma HRtech que conecta trabalhadores de base ao mercado
                formal, eliminando barreiras e tornando o recrutamento mais
                acessível, eficiente e justo.
              </p>
            </section>

            <div className="main__explanation-card">
              <div className="explanation-card__wrapper">
                <Paragraph
                  colorText="white"
                  boldText
                  fontSize={16}
                  text="Benefícios da Mare para Empresas"
                />
                <div className="wrapper__list-texts">
                  <Paragraph
                    colorText="white"
                    fontSize={14}
                    iconLeft={CheckSquare}
                    text="Transforme seu processo seletivo. Contrate melhor, mais rápido e com menos custo."
                  />
                  <Paragraph
                    colorText="white"
                    fontSize={14}
                    iconLeft={CheckSquare}
                    text="Contratação Rápida e Eficiente – Preencha suas vagas com os profissionais certos."
                  />
                  <Paragraph
                    colorText="white"
                    fontSize={14}
                    iconLeft={CheckSquare}
                    text="Banco de candidatos qualificados e prontos para trabalhar."
                  />
                </div>
              </div>
            </div>
            <section className="main__budget-contact ">
              <Paragraph
                fontSize={14}
                boldText
                textAlign="center"
                text="FAÇA SEU ORÇAMENTO"
                className="budget-contact__paragraph "
              />
              <InputText
                className="budget-contact__input"
                onChange={setEmailBudget}
                value={emailBudget}
                label="E-mail corporativo"
                type="email"
              />
            </section>
          </main>
        </Layout>
      ) : (
        false
      )}
    </>
  );
};

export default LandingPage;
