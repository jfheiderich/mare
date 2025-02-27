"use client";
import React, { useEffect, useState } from "react";
import "./styles.scss";
import Image from "next/image";
import Title from "@/components/Texts/Title";
import Layout from "@/components/Layouts/Layout/page";
import { useParams, useRouter } from "next/navigation";
import LabelWithValue from "@/components/Texts/LabelWithValue";
import { useApprovedRegister } from "@/hooks/useApprovedRegister";
import { IApprovedRegister } from "@/types/approvedRegister";

const ApprovedRegistrationViewPage: React.FC = () => {
  const router = useRouter();
  console.log("chegou na view?");
  const { approvedRegister } = useApprovedRegister();

  const [approvedData, setApprovedData] = useState<IApprovedRegister>(
    {} as IApprovedRegister
  );

  useEffect(() => {
    setApprovedData(approvedRegister);
  }, []);

  return (
    <Layout className="agreement-view" hasNavbar pageTitle="Contas" hasToolBar>
      <main className="agreement-view__main margin-ver-16">
        <Title text={`Cadastro de Aprovado`} size="h2" />

        {Object.entries(approvedData).map(([key, value]) => {
          if (Array.isArray(value)) {
            return value.map((experience, index) => (
              <LabelWithValue
                key={`${key}-${index}`}
                labelText={`Experiência ${index + 1}`}
                valueText={`Função: ${experience.role}, Tempo: ${experience.time}`}
              />
            ));
          }

          return (
            <LabelWithValue
              key={key}
              labelText={key}
              valueText={
                typeof value === "object" ? JSON.stringify(value) : value
              }
            />
          );
        })}
      </main>
    </Layout>
  );
};

export default ApprovedRegistrationViewPage;
