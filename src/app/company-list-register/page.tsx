"use client";
import React, { useState } from "react";
import "./styles.scss";
import Title from "@/components/Texts/Title";
import Layout from "@/components/Layouts/Layout/page";
import { useRouter } from "next/navigation";
import InputText from "@/components/Inputs/InputText/page";

const CompaniesListRegisterPage: React.FC = () => {
  const [searchList, setSearchList] = useState("");

  return (
    <Layout
      className="companies-list-register "
      hasNavbar
      hasToolBar
      pageTitle="Contas"
    >
      <Title text="Visualizar Registros" size="h1" />

      <InputText onChange={setSearchList} value={searchList} />

      <main className="companies-list-register__main "></main>
    </Layout>
  );
};

export default CompaniesListRegisterPage;
