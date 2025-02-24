import React, { useEffect, useState } from "react";
import "./styles.scss";
import Title from "components/Texts/Title";
import Layout from "components/Layouts/Layout";
import { useNavigate } from "react-router-dom";
import LabelWithValue from "components/Texts/LabelWithValue";
import { useJobVacancyRegister } from "hooks/useJobVacancyRegister";
import { IJObVacancyRegister } from "types/jobVacancyRegister";

const JobVacancyRegistrationViewPage: React.FC = () => {
  const navigate = useNavigate();
  const { jobVacancyRegister } = useJobVacancyRegister();

  const [jobVacancyData, setJobVacancyData] = useState<IJObVacancyRegister>(
    {} as IJObVacancyRegister
  );

  useEffect(() => {
    setJobVacancyData(jobVacancyRegister);
  }, []);

  return (
    <Layout className="job-vacancy" hasNavbar pageTitle="Contas" hasToolBar>
      <main className="job-vacancy__main margin-ver-16">
        <Title text={`Empresa: ${jobVacancyData.vacancyTradeName}`} size="h2" />
        {Object.entries(jobVacancyData).map(([key, value], index) => (
          <LabelWithValue key={key} labelText={key} valueText={value} />
        ))}
      </main>
    </Layout>
  );
};

export default JobVacancyRegistrationViewPage;
