"use client";
import React, { useEffect, useState } from "react";
import "./styles.scss";
import Image from "next/image";
import Title from "@/components/Texts/Title";
import Layout from "@/components/Layouts/Layout/page";
import { useParams, useRouter } from "next/navigation";
import LabelWithValue from "@/components/Texts/LabelWithValue";
import { useCandidateManagement } from "@/hooks/useCandidateManagement";
import { ICandidateManagement } from "@/types/candidateManagement";

const CandidateRegistrationViewPage: React.FC = () => {
  const router = useRouter();
  const { candidateManagement } = useCandidateManagement();

  const [candidateData, setCandidateData] = useState<ICandidateManagement>(
    {} as ICandidateManagement
  );

  useEffect(() => {
    setCandidateData(candidateManagement);
  }, []);

  return (
    <Layout
      className="candidate-registration"
      hasNavbar
      pageTitle="Processo Seletivo"
      hasToolBar
    >
      <main className="candidate-registration__main margin-ver-16">
        <Title text={`Gestão do Candidato`} size="h2" />

        {Object.entries(candidateData).map(([key, value]) => {
          if (Array.isArray(value)) {
            return value.map((item, index) => (
              <LabelWithValue
                key={`${key}-${index}`}
                labelText={`${key} ${index + 1}`}
                valueText={
                  typeof item === "object" ? JSON.stringify(item) : item
                }
              />
            ));
          }

          if (typeof value === "object" && value !== null) {
            return (
              <LabelWithValue
                key={key}
                labelText={key}
                valueText={JSON.stringify(value)}
              />
            );
          }

          return <LabelWithValue key={key} labelText={key} valueText={value} />;
        })}
      </main>
    </Layout>
  );
};

export default CandidateRegistrationViewPage;
