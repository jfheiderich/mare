"use client";
import React, { useEffect, useState } from "react";
import "./styles.scss";
import Title from "@/components/Texts/Title";
import Layout from "@/components/Layouts/Layout/page";
import LabelWithValue from "@/components/Texts/LabelWithValue";
import { useAgreementRegister } from "@/hooks/useAgreementRegister";

interface AgreementData {
  CNPJ: string;
  "Data de início": string;
  "Data de fim": string;
  "Nome do Responsável Comercial": string;
  "Nome do Comprador": string;
  "E-mail do Comprador": string;
  "Telefone do Comprador": string;
  Observações?: string;
}

const AgreementViewPage: React.FC = () => {
  const { agreementRegister } = useAgreementRegister();

  const [agreementData, setAgreementData] = useState<AgreementData>(
    {} as AgreementData
  );

  useEffect(() => {
    const prepareData = {
      CNPJ: agreementRegister.cnpj,
      "Data de início": agreementRegister.startDate,
      "Data de fim": agreementRegister.endDate,
      "Nome do Responsável Comercial": agreementRegister.commercialResponsible,
      "Nome do Comprador": agreementRegister.buyerName,
      "E-mail do Comprador": agreementRegister.buyerEmail,
      "Telefone do Comprador": agreementRegister.buyerPhone,
      Observações: agreementRegister.observations,
    };

    setAgreementData(prepareData);
  }, []);

  return (
    <Layout className="agreement-view " hasNavbar styleNav="company" hasToolBar>
      <main className="agreement-view__main">
        <Title text={`Empresa: ${agreementData.CNPJ}`} size="h2" />
        {Object.entries(agreementData).map(([key, value], index) => (
          <LabelWithValue key={key} labelText={key} valueText={value} />
        ))}
      </main>
    </Layout>
  );
};

export default AgreementViewPage;
