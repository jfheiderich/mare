"use client";
import React, { useEffect, useState } from "react";
import "./styles.scss";
import Image from "next/image";
import Title from "@/components/Texts/Title";
import Paragraph from "@/components/Texts/Paragraph";
import Layout from "@/components/Layouts/Layout/page";
import { useParams, useRouter } from "next/navigation";
import LabelWithValue from "@/components/Texts/LabelWithValue";
import { ICompanyRegister } from "@/types/companyRegister";
import { useCompanyRegister } from "@/hooks/useCompanyRegister";

const CandidateManagementView: React.FC = () => {
  const router = useRouter();
  const { companyRegister } = useCompanyRegister();

  const [companyData, setCompanyData] = useState<ICompanyRegister>(
    {} as ICompanyRegister
  );

  useEffect(() => {
    setCompanyData(companyRegister);
  }, []);

  return (
    <Layout className="company-view" hasNavbar styleNav="company" hasToolBar>
      <main className="company-view__main">
        <Title text={`Empresa: ${companyData.corporateName}`} size="h2" />
        {Object.entries(companyData).map(([key, value], index) => (
          <LabelWithValue key={key} labelText={key} valueText={value} />
        ))}
      </main>
    </Layout>
  );
};

export default CandidateManagementView;
