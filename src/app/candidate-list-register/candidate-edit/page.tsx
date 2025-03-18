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
import LabelWithValue from "@/components/Texts/LabelWithValue";
import { formatDateAndTime } from "@/utils/formatDateHour";

const CandidateEditPage: React.FC = () => {
  const router = useRouter();
  const { candidateSelect } = useCandidateSelect();
  const { userInfo } = useUserInfo();
  const [candidate, setCandidate] = useState<ListAllCandidatesResponse | null>(
    candidateSelect
  );

  useEffect(() => {
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
      className="candidate-edit"
      hasNavbar
      hasToolBar
      styleNav="list-registers"
    >
      <main className="candidate-edit__main wrapper standard-height">
        <Title text="Editar registro de candidato" size="h1" />

        <section className="candidate-edit__register-details">
          <div className="register-details__inner inner">
            <section className="inner__headers">
              <p className="headers__header">Registro Realizado via:</p>
              <p className="headers__header">Registrado em:</p>
              {candidateSelect?.updated_at && (
                <p className="headers__header">Atualizado em:</p>
              )}
              {candidateSelect?.destroyed_at && (
                <p className="headers__header">Deletado em:</p>
              )}
            </section>
            <section className="inner__values">
              <p className="values__value">
                {candidateSelect?.registration_via?.toUpperCase()}
              </p>
              <p className="values__value">{`${
                formatDateAndTime(candidateSelect?.created_at).formattedDate
              } às ${
                formatDateAndTime(candidateSelect?.created_at).formattedTime
              }`}</p>
              {candidateSelect?.updated_at && (
                <p className="values__value">{`${
                  formatDateAndTime(candidateSelect?.updated_at).formattedDate
                } às ${
                  formatDateAndTime(candidateSelect?.updated_at).formattedTime
                }`}</p>
              )}
              {candidateSelect?.destroyed_at && (
                <p className="values__value">{`${
                  formatDateAndTime(candidateSelect?.destroyed_at).formattedDate
                } às ${
                  formatDateAndTime(candidateSelect?.destroyed_at).formattedTime
                }`}</p>
              )}
            </section>
          </div>
        </section>
        <section className="candidate-edit__form-edit form-core">
          <InputEdit
            valueInput={candidateSelect?.name}
            label="Nome"
            setValueInput={(newValue) => handleInputChange("name", newValue)}
          />
          <InputEdit
            valueInput={candidateSelect?.cpf}
            label="CPF"
            mask="999.999.999-99"
            setValueInput={(newValue) => handleInputChange("cpf", newValue)}
          />
          <InputEdit
            valueInput={candidateSelect?.birthDate}
            label="Data de Nascimento"
            mask="99/99/9999"
            setValueInput={(newValue) =>
              handleInputChange("birthDate", newValue)
            }
          />
          <InputEdit
            valueInput={candidateSelect?.phone}
            label="Número de Telefone"
            mask="(99) 99999-9999"
            setValueInput={(newValue) => handleInputChange("phone", newValue)}
          />
          <InputEdit
            valueInput={candidateSelect?.phone}
            label="Número de Telefone"
            mask="(99) 99999-9999"
            setValueInput={(newValue) => handleInputChange("phone", newValue)}
          />
          <InputEdit
            valueInput={candidateSelect?.cep}
            label="CEP"
            mask="99999-999"
            setValueInput={(newValue) => handleInputChange("cep", newValue)}
          />
          <InputEdit
            valueInput={candidateSelect?.city}
            label="Cidade"
            setValueInput={(newValue) => handleInputChange("city", newValue)}
          />
          <InputEdit
            valueInput={candidateSelect?.state}
            label="Estado"
            setValueInput={(newValue) => handleInputChange("state", newValue)}
          />
          <InputEdit
            valueInput={candidateSelect?.neighborhood}
            label="Bairro"
            setValueInput={(newValue) =>
              handleInputChange("neighborhood", newValue)
            }
          />
          <InputEdit
            valueInput={candidateSelect?.pcd}
            label="PCD"
            setValueInput={(newValue) => handleInputChange("pcd", newValue)}
          />
          <InputEdit
            valueInput={candidateSelect?.gender}
            label="Gênero"
            setValueInput={(newValue) => handleInputChange("gender", newValue)}
          />
          <InputEdit
            valueInput={candidateSelect?.race}
            label="Raça	"
            setValueInput={(newValue) => handleInputChange("race", newValue)}
          />
          <InputEdit
            valueInput={candidateSelect?.education}
            label="Escolaridade"
            setValueInput={(newValue) =>
              handleInputChange("education", newValue)
            }
          />
          {/* TODO */}
          {/* <InputEdit
          valueInput={candidateSelect?.courses[0]}
          label="Cursos"
          setValueInput={(newValue) => handleInputChange("courses", newValue)}
        /> */}
          <InputEdit
            valueInput={candidateSelect?.note}
            label="Mensagem"
            setValueInput={(newValue) => handleInputChange("note", newValue)}
          />
        </section>
      </main>
    </Layout>
  );
};

export default CandidateEditPage;
