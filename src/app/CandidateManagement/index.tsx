import React, { useRef, useState } from "react";
import "./styles.scss";
import Title from "components/Texts/Title";
import Paragraph from "components/Texts/Paragraph";
import Layout from "components/Layouts/Layout";
import { useNavigate } from "react-router-dom";
import InputText from "components/Inputs/InputText";
import Button from "components/Buttons/Button";

import { useContactRegister } from "hooks/useContactRegister";
import Textarea from "components/TextAreas/Textarea";
import { useCandidateManagement } from "hooks/useCandidateManagement";

const CandidateManagementPage: React.FC = () => {
  const formRef = useRef<HTMLElement | null>(null);
  const navigate = useNavigate();
  const { setCandidateManagement } = useCandidateManagement();

  const [candidate, setCandidate] = useState({
    cpf: "",
    vacancyId: "",
    processStage: "",
    notes: "",
  });

  const [warningInput, setWarningInput] = useState({
    cpfIsWarning: false,
    vacancyIdIsWarning: false,
    processStageIsWarning: false,
    notesIsWarning: false,
  });

  const resetWarnings = () => {
    setWarningInput({
      cpfIsWarning: false,
      vacancyIdIsWarning: false,
      processStageIsWarning: false,
      notesIsWarning: false,
    });
  };

  const validateStringObject = (object: Record<string, string>) => {
    const warningInputs = Object.entries(object)
      .filter(([_, value]) => !value)
      .map(([key, _]) => `${key}IsWarning`);

    setWarningInput((prev) => {
      const updatedWarnings = warningInputs.reduce((acc, warning) => {
        return { ...acc, [warning]: true };
      }, {} as Record<string, boolean>);

      return { ...prev, ...updatedWarnings };
    });

    setTimeout(() => {
      resetWarnings();
    }, 4000);

    if (warningInputs.length) {
      return false;
    } else {
      return true;
    }
  };

  const continueHandler = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (!validateStringObject(candidate)) {
      return;
    }

    setCandidateManagement(candidate);

    navigate("/candidate-management-view");
  };

  return (
    <Layout
      className="candidate-management"
      hasNavbar
      pageTitle="Processo Seletivo"
      hasToolBar
    >
      <Title size="h2" text="Gestão do Candidato" />
      <main className="candidate-management__form margin-top-16" ref={formRef}>
        <div className="form__wrapper">
          <InputText
            onChange={(value) =>
              setCandidate((prev) => ({ ...prev, cpf: value }))
            }
            value={candidate.cpf}
            label="CPF"
            placeholder=""
            isWarning={warningInput.cpfIsWarning}
            mask="999.999.999-99"
          />

          <InputText
            onChange={(value) =>
              setCandidate((prev) => ({
                ...prev,
                vacancyId: value,
              }))
            }
            value={candidate.vacancyId}
            label="ID da Vaga"
            placeholder=""
            isWarning={warningInput.vacancyIdIsWarning}
          />

          <InputText
            onChange={(value) =>
              setCandidate((prev) => ({ ...prev, processStage: value }))
            }
            value={candidate.processStage}
            label="Estágio no Processo Seletivo"
            placeholder=""
            isWarning={warningInput.processStageIsWarning}
          />
          <Textarea
            onChange={(value) =>
              setCandidate((prev) => ({ ...prev, notes: value }))
            }
            value={candidate.notes}
            isWarning={warningInput.notesIsWarning}
          />
        </div>
        <Button
          className="margin-top-16"
          buttonStyle="primary"
          buttonText="Salvar"
          onClick={continueHandler}
        />
      </main>
    </Layout>
  );
};

export default CandidateManagementPage;
