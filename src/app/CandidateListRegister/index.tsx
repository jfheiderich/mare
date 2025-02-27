import React, { useState } from "react";
import "./styles.scss";
import Image from "next/image";
import Title from "@/components/Texts/Title";
import Paragraph from "@/components/Texts/Paragraph";
import Layout from "@/components/Layouts/Layout/page";
import { useParams, useRouter } from "next/navigation";
import InputText from "@/components/Inputs/InputText/page";

const CandidateListRegisterPage: React.FC = () => {
  const router = useRouter();
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
