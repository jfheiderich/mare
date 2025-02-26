import React, { useState } from "react";
import "./styles.scss";
import Image from "next/image";
import Title from "@/components/Texts/Title";
import Paragraph from "@/components/Texts/Paragraph";
import Layout from "@/components/Layouts/Layout";
import { useParams, useRouter } from "next/navigation";
import InputText from "@/components/Inputs/InputText";

const CompaniesListRegisterPage: React.FC = () => {
  const router = useRouter();
  const [searchList, setSearchList] = useState("");

  return (
    <Layout
      className="companies-list-register"
      hasNavbar
      hasToolBar
      pageTitle="Contas"
    >
      <Title text="Visualizar Registros" size="h1" />

      <InputText onChange={setSearchList} value={searchList} />

      <main className="companies-list-register__main margin-top-16"></main>
    </Layout>
  );
};

export default CompaniesListRegisterPage;
