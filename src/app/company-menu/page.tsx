"use client";
import React from "react";
import "./styles.scss";
import Title from "@/components/Texts/Title";
import Paragraph from "@/components/Texts/Paragraph";
import Layout from "@/components/Layouts/Layout/page";
import { useRouter } from "next/navigation";
import GridButtons, { ButtonGrid } from "@/components/Buttons/GridButtons/page";
import BuildIconWhite from "../../../public/icons/buildings/buildings-icon-white.svg";
import IdentityIcon from "../../../public/icons/identities/identity-icon-white.svg";
import PaperIconWhite from "../../../public/icons/papers/paper-icon-white.svg";
import TableIconWhite from "../../../public/icons/tables/table-icon-white.svg";

const HomePage: React.FC = () => {
  const router = useRouter();

  const buttonsNavigation: ButtonGrid[] = [
    {
      action: () => router.push("/company-registration"),
      icon: BuildIconWhite,
      id: "1",
      text: "Cadastrar Empresa",
    },
    {
      action: () => router.push("/contact-registration"),
      icon: IdentityIcon,
      id: "2",
      text: "Cadastrar Contato",
    },
    {
      action: () => router.push("/agreement-registration"),
      icon: PaperIconWhite,
      id: "3",
      text: "Cadastrar Contrato",
    },
    {
      action: () => router.push("/company-list-register"),
      icon: TableIconWhite,
      id: "4",
      text: "Visualizar Registros",
    },
  ];

  return (
    <Layout className="home-page " hasNavbar hasToolBar>
      <Title text="Bem-vindo(a)!" size="h1" />

      <Paragraph text={`O que você deseja fazer hoje?`} />

      <main className="home-page__main ">
        <GridButtons buttons={buttonsNavigation} className="padding-top-40" />
      </main>
    </Layout>
  );
};

export default HomePage;
