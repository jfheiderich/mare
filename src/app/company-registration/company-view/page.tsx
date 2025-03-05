"use client";
import React, { useEffect, useState } from "react";
import "./styles.scss";
import Title from "@/components/Texts/Title";
import Layout from "@/components/Layouts/Layout/page";
import LabelWithValue from "@/components/Texts/LabelWithValue";
import { useCompanyRegister } from "@/hooks/useCompanyRegister";

interface CompanyData {
  CNPJ: string;
  "Razão Social": string;
  "Nome Fantasia": string;
  CEP: string;
  Rua: string;
  Número: string | number;
  Complemento?: string;
  Bairro: string;
  Estado: string;
  Cidade: string;
  País: string;
  Site?: string;
}

const CompanyViewPage: React.FC = () => {
  const { companyRegister } = useCompanyRegister();

  const [companyData, setCompanyData] = useState<CompanyData>(
    {} as CompanyData
  );

  useEffect(() => {
    const prepareData = {
      CNPJ: companyRegister.cnpj,
      "Razão Social": companyRegister.corporateName,
      "Nome Fantasia": companyRegister.tradeName,
      CEP: companyRegister.postalCode,
      Rua: companyRegister.street,
      Número: companyRegister.number,
      Complemento: companyRegister.complement,
      Bairro: companyRegister.neighborhood,
      Estado: companyRegister.state,
      Cidade: companyRegister.city,
      País: companyRegister.country,
      Site: companyRegister.website,
    };

    setCompanyData(prepareData);
  }, []);

  return (
    <Layout className="company-view " hasNavbar pageTitle="Contas" hasToolBar>
      <main className="company-view__main">
        <Title text={`Empresa: ${companyData?.["Nome Fantasia"]}`} size="h2" />
        {Object.entries(companyData).map(([key, value], index) => (
          <LabelWithValue key={key} labelText={key} valueText={value} />
        ))}
      </main>
    </Layout>
  );
};

export default CompanyViewPage;
