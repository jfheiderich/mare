import React from "react";
import "./styles.scss";
import Title from "components/Texts/Title";
import Paragraph from "components/Texts/Paragraph";
import Layout from "components/Layouts/Layout";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout className="home-page" hasNavbar hasToolBar>
      <Title text="Bem-vindo(a)!" size="h1" />

      <Paragraph text={`O que você deseja fazer hoje?`} />

      <main className="home-page__main margin-top-16"></main>
    </Layout>
  );
};

export default HomePage;
