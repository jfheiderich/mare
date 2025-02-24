import React, { useState } from "react";
import "./styles.scss";
import Title from "components/Texts/Title";
import Paragraph from "components/Texts/Paragraph";
import Layout from "components/Layouts/Layout";
import { useNavigate } from "react-router-dom";
import InputText from "components/Inputs/InputText";

const CandidateListRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchList, setSearchList] = useState("");

  return (
    <Layout
      className="candidate-list-register"
      hasNavbar
      hasToolBar
      pageTitle="Visualizar Registros"
    >
      <Title text="Visualizar Registros" size="h1" />

      <InputText onChange={setSearchList} value={searchList} />

      <main className="candidate-list-register__main margin-top-16"></main>
    </Layout>
  );
};

export default CandidateListRegisterPage;
