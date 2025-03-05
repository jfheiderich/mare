"use client";
import React, { useEffect, useState } from "react";
import "./styles.scss";
import Image from "next/image";
import Title from "@/components/Texts/Title";
import Paragraph from "@/components/Texts/Paragraph";
import Layout from "@/components/Layouts/Layout/page";
import { useParams, useRouter } from "next/navigation";
import InputText from "@/components/Inputs/InputText/page";
import LIST_ALL_CANDIDATES, {
  ListAllCandidatesResponse,
} from "@/api/candidates/listAllCandidates";
import { useUserInfo } from "@/hooks/userInfo";
import ListItemLink from "@/components/ListItemLink/page";
import { useCandidateManagement } from "@/hooks/useCandidateManagement";
import { useCandidateSelect } from "@/hooks/useCandidateSelect";
import InputEdit from "@/components/Inputs/InputEdit/page";

const CandidateEditPage: React.FC = () => {
  const router = useRouter();
  const { candidateSelect } = useCandidateSelect();

  const { userInfo } = useUserInfo();

  const [searchList, setSearchList] = useState("");
  const [candidate, setCandidate] = useState<ListAllCandidatesResponse | null>(
    candidateSelect
  );

  useEffect(() => {
    // Inicializa o candidato selecionado
    setCandidate(candidateSelect);
  }, [candidateSelect]);

  const handleInputChange = (field: string, value: string | null) => {
    if (candidate && value) {
      setCandidate((prevCandidate: any) => ({
        ...prevCandidate,
        [field]: value,
      }));
    }
  };

  const handleCoursesChange = (index: number, value: string) => {
    if (candidate && candidate.courses) {
      const updatedCourses = [...candidate.courses];
      updatedCourses[index] = value;
      setCandidate((prevCandidate: any) => ({
        ...prevCandidate,
        courses: updatedCourses,
      }));
    }
  };

  return (
    <Layout
      className="candidate-edit "
      hasNavbar
      hasToolBar
      pageTitle="Visualizar Registros"
    >
      <Title text="Visualizar Registros" size="h1" />

      <InputText onChange={setSearchList} value={searchList} />

      <main className="candidate-edit__main">
        {candidate &&
          Object.entries(candidate)
            .filter(
              ([key]) =>
                !["id", "created_at", "destroyed_at", "updated_at"].includes(
                  key
                )
            )
            .map(([key, value], index) => {
              if (key === "courses" && Array.isArray(value)) {
                return (
                  <div key={index}>
                    {value.map((course, courseIndex) => (
                      <div key={courseIndex}>
                        <InputEdit
                          valueInput={course}
                          setValueInput={(newValue) =>
                            handleCoursesChange(courseIndex, newValue)
                          }
                        />
                      </div>
                    ))}
                  </div>
                );
              }

              return (
                <div key={index}>
                  <InputEdit
                    valueInput={value as string}
                    setValueInput={(newValue) =>
                      handleInputChange(key, newValue)
                    }
                  />
                </div>
              );
            })}
      </main>
    </Layout>
  );
};

export default CandidateEditPage;
