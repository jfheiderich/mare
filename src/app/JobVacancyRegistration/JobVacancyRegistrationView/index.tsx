"use client";
import React, { useEffect, useState } from "react";
import "./styles.scss";
import Image from "next/image";
import Title from "@/components/Texts/Title";
import Layout from "@/components/Layouts/Layout/page";
import { useParams, useRouter } from "next/navigation";
import LabelWithValue from "@/components/Texts/LabelWithValue";
import { useJobVacancyRegister } from "@/hooks/useJobVacancyRegister";
import { IJObVacancyRegister } from "@/types/jobVacancyRegister";

const JobVacancyRegistrationViewPage: React.FC = () => {
  const router = useRouter();
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
