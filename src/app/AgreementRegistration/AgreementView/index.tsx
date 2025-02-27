"use client";
import React, { useEffect, useState } from "react";
import "./styles.scss";
import Image from "next/image";
import Title from "@/components/Texts/Title";
import Layout from "@/components/Layouts/Layout/page";
import { useParams, useRouter } from "next/navigation";
import LabelWithValue from "@/components/Texts/LabelWithValue";
import { useContactRegister } from "@/hooks/useContactRegister";
import { useAgreementRegister } from "@/hooks/useAgreementRegister";
import { IAgreementRegister } from "@/types/agreementRegister";

const AgreementViewPage: React.FC = () => {
  const router = useRouter();
  const { setAgreementRegister, agreementRegister } = useAgreementRegister();

  const [agreementData, setAgreementData] = useState<IAgreementRegister>(
    {} as IAgreementRegister
  );

  useEffect(() => {
    setAgreementData(agreementRegister);
  }, []);

  return (
    <Layout className="agreement-view" hasNavbar pageTitle="Contas" hasToolBar>
      <main className="agreement-view__main margin-ver-16">
        <Title text={`Empresa: ${agreementData.cnpj}`} size="h2" />
        {Object.entries(agreementData).map(([key, value], index) => (
          <LabelWithValue key={key} labelText={key} valueText={value} />
        ))}
      </main>
    </Layout>
  );
};

export default AgreementViewPage;
