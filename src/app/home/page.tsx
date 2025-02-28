"use client";
import React from "react";
import "./styles.scss";
import Image from "next/image";
import Title from "@/components/Texts/Title";
import Paragraph from "@/components/Texts/Paragraph";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layouts/Layout/page";
import GridButtons, { ButtonGrid } from "@/components/Buttons/GridButtons/page";
import BuildIconWhite from "../../../public/icons/buildings/buildings-icon-white.svg";
import IdentityIcon from "../../../public/icons/identities/identity-icon-white.svg";
import PeopleSquareWhite from "../../../public/icons/profiles/people-square-icon-white.svg";
import WalletSimpleWhite from "../../../public/icons/wallets/wallet-simple-icon-white.svg";

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
      action: () => router.push("/job-vacancy-registration"),
      icon: WalletSimpleWhite,
      id: "3",
      text: "Cadastrar Vaga",
    },
    {
      action: () => router.push("/candidate-list-register"),
      icon: PeopleSquareWhite,
      id: "4",
      text: "Gerenciar Candidato",
    },
  ];

  return (
    <Layout className="home-page padding-16" hasNavbar hasToolBar>
      <Title text="Bem-vindo(a)!" size="h1" />

      <Paragraph text={`O que você deseja fazer hoje?`} />

      <main className="home-page__main margin-top-16">
        <GridButtons buttons={buttonsNavigation} className="padding-top-40" />
      </main>
    </Layout>
  );
};

export default HomePage;
