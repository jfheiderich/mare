import React, { useEffect, useState } from "react";
import "./styles.scss";
import Title from "components/Texts/Title";
import Paragraph from "components/Texts/Paragraph";
import Layout from "components/Layouts/Layout";
import { useNavigate } from "react-router-dom";
import LabelWithValue from "components/Texts/LabelWithValue";
import { ICompanyRegister } from "types/companyRegister";
import { useCompanyRegister } from "hooks/useCompanyRegister";

const CompanyViewPage: React.FC = () => {
  const navigate = useNavigate();
  const { companyRegister } = useCompanyRegister();

  const [companyData, setCompanyData] = useState<ICompanyRegister>(
    {} as ICompanyRegister
  );

  useEffect(() => {
    setCompanyData(companyRegister);
  }, []);

  return (
    <Layout className="company-view" hasNavbar pageTitle="Contas" hasToolBar>
      <main className="company-view__main margin-ver-16">
        <Title text={`Empresa: ${companyData.corporateName}`} size="h2" />
        {Object.entries(companyData).map(([key, value], index) => (
          <LabelWithValue key={key} labelText={key} valueText={value} />
        ))}
      </main>
    </Layout>
  );
};

export default CompanyViewPage;
