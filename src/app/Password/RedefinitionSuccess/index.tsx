"use client";
import React from "react";
import "./styles.scss";
import Image from "next/image";
import Title from "@/components/Texts/Title";
import Paragraph from "@/components/Texts/Paragraph";
import Button from "@/components/Buttons/Button";
import Layout from "@/components/Layouts/Layout";
import ButtonTextLink from "@/components/Buttons/ButtonTextLink";
import { useParams, useRouter } from "next/navigation";

const RedefinitionSuccessPage: React.FC = () => {
  const router = useRouter();

  const newLoginHandler = () => {
    router.push("/company-login");
  };

  return (
    <Layout className="redefinition-success-page" hasFooter hasNavbar>
      <Title text="Senha redefinida com sucesso!" size="h1" />

      <Paragraph
        text={`Sua senha foi redefinida com sucesso. Para efetuar
				um novo login, clique no botão abaixo.`}
      />

      <section className="redefinition-success-page__form margin-top-16">
        <Button
          buttonStyle="primary"
          buttonText="Novo login"
          onClick={newLoginHandler}
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

export default RedefinitionSuccessPage;
