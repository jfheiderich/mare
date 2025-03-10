"use client";
import React, { useRef, useState } from "react";
import "./styles.scss";
import Image from "next/image";
import Layout from "@/components/Layouts/Layout/page";
import InputText from "@/components/Inputs/InputText/page";
import Title from "@/components/Texts/Title";
import Button from "@/components/Buttons/Button";
import { useParams, useRouter } from "next/navigation";
import CloseIconRed from "../../public/icons/closes/close-icon-red-blood.svg";
import InputTextSelect, {
  IOptionInputTextSelectProps,
} from "@/components/Inputs/InputTextSelect/page";
import STATES from "@/mocks/states";
import PCD from "@/mocks/pcd";
import GENDERS from "@/mocks/gender";
import RACES from "@/mocks/race";
import EDUCATION from "@/mocks/education";
import EXPERIENCE from "@/mocks/experience";
import { useCandidateRegister } from "@/hooks/userCandidateRegister";
import { Experience } from "@/types/experience";
import { getSearchAddressByCEP } from "@/api/getSearchApi";

const CandidateRegistrationPage: React.FC = () => {
  const router = useRouter();
  const formRef = useRef<HTMLElement | null>(null);

  const { setCandidateRegister } = useCandidateRegister();
  const [registerStep, setRegisterStep] = useState(1);
  const [candidate, setCandidate] = useState({
    cpf: "",
    name: "",
    birthDate: "",
    phone: "",
    cep: "",
    city: "",
    state: "",
    neighborhood: "",
  });

  const [particularities, setParticularities] = useState({
    pcd: "",
    gender: "",
    race: "",
    education: "",
    courses: "",
  });

  const [experience, setExperience] = useState<Experience>({} as Experience);
  const [experiencesAdded, setExperiencesAdded] = useState<Experience[]>([]);

  const [warningInput, setWarningInput] = useState({
    cpfIsWarning: false,
    nameIsWarning: false,
    birthDateIsWarning: false,
    phoneIsWarning: false,
    cepIsWarning: false,
    pcdIsWarning: false,
    genderIsWarning: false,
    raceIsWarning: false,
    educationIsWarning: false,
    coursesIsWarning: false,
    stateIsWarning: false,
    neighborhoodIsWarning: false,
    cityIsWarning: false,
  });

  const resetWarnings = () => {
    setWarningInput({
      cpfIsWarning: false,
      nameIsWarning: false,
      birthDateIsWarning: false,
      phoneIsWarning: false,
      cepIsWarning: false,
      pcdIsWarning: false,
      genderIsWarning: false,
      raceIsWarning: false,
      educationIsWarning: false,
      coursesIsWarning: false,
      stateIsWarning: false,
      neighborhoodIsWarning: false,
      cityIsWarning: false,
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
    if (registerStep === 1) {
      if (!validateStringObject(candidate)) {
        return;
      }
    }

    if (registerStep === 2) {
      if (!validateStringObject(particularities)) {
        return;
      }

      const prepareData = {
        experiences: experiencesAdded,
        ...candidate,
        ...particularities,
      };

      setCandidateRegister(prepareData);

      router.push("/candidate-register");
      return;
    }

    setRegisterStep((prev) => prev + 1);
  };

  const searchAddressByCEP = async (cep: string) => {
    try {
      setCandidate((prev) => ({
        ...prev,
        cep: cep,
      }));
      if (cep.length === 9) {
        const resAddress = await getSearchAddressByCEP(cep);
        setCandidate((prev) => ({
          ...prev,
          city: resAddress.localidade,
          neighborhood: resAddress.bairro,
          cep: cep,
          state: resAddress.uf,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const stateElements: IOptionInputTextSelectProps[] = STATES.map((states) => {
    return {
      groupName: "states",
      label: states.acronym,
      value: states.acronym,
    };
  });

  const addExperience = () => {
    setExperiencesAdded((prev) => [...prev, experience]);
    setExperience({ role: "", time: "" });
  };

  const deleteExperience = (experience: Experience) => {
    const deletedExp = experiencesAdded.filter((exp) => exp !== experience);
    setExperiencesAdded(deletedExp);
  };

  return (
    <Layout
      className="candidate-registration"
      hasNavbar
      hasToolBar
      styleNav="Processo Seletivo"
    >
      <Title size="h2" text={`Cadastrar Candidato (${registerStep}/2)`} />
      <main className="candidate-registration__main" ref={formRef}>
        {registerStep === 1 ? (
          <div className="form__wrapper ">
            <InputText
              onChange={(value) =>
                setCandidate((prev) => ({
                  ...prev,
                  cpf: value,
                }))
              }
              value={candidate.cpf}
              label="CPF"
              placeholder=""
              mask="999.999.999-99"
              isWarning={warningInput.cpfIsWarning}
            />
            <InputText
              onChange={(value) =>
                setCandidate((prev) => ({
                  ...prev,
                  name: value,
                }))
              }
              value={candidate.name}
              label="Nome completo"
              placeholder=""
              isWarning={warningInput.nameIsWarning}
            />
            <div className="wrapper__grid-template">
              <InputText
                onChange={(value) =>
                  setCandidate((prev) => ({
                    ...prev,
                    birthDate: value,
                  }))
                }
                value={candidate.birthDate}
                label="Data de nascimento"
                placeholder="dia/mês/ano"
                mask="99/99/9999"
                isWarning={warningInput.birthDateIsWarning}
              />
              <InputText
                onChange={(value) =>
                  setCandidate((prev) => ({
                    ...prev,
                    phone: value,
                  }))
                }
                type="tel"
                mask="(99) 99999-9999"
                value={candidate.phone}
                label="Telefone"
                placeholder=""
                isWarning={warningInput.phoneIsWarning}
              />
            </div>
            <InputText
              onChange={searchAddressByCEP}
              value={candidate.cep}
              label="CEP"
              mask="99999-999"
              placeholder=""
              type="text"
              isWarning={warningInput.cepIsWarning}
            />
            <div className="wrapper__grid-template">
              <InputTextSelect
                options={stateElements}
                searchOptions
                setInputValue={(value) =>
                  setCandidate((prev) => ({
                    ...prev,
                    state: value,
                  }))
                }
                label="Estado"
                inputValue={candidate.state}
                isWarning={warningInput.stateIsWarning}
              />
              <InputText
                onChange={(value) =>
                  setCandidate((prev) => ({
                    ...prev,
                    city: value,
                  }))
                }
                type="text"
                value={candidate.city}
                label="Cidade"
                placeholder=""
                isWarning={warningInput.cityIsWarning}
              />
            </div>
            <InputText
              onChange={(value) =>
                setCandidate((prev) => ({
                  ...prev,
                  neighborhood: value,
                }))
              }
              type="text"
              value={candidate.neighborhood}
              label="Bairro"
              placeholder=""
              isWarning={warningInput.neighborhoodIsWarning}
            />
          </div>
        ) : (
          false
        )}
        {registerStep === 2 ? (
          <div className="form__wrapper">
            <InputTextSelect
              label="PCD"
              searchOptions
              inputValue={particularities.pcd}
              options={PCD}
              setInputValue={(value) =>
                setParticularities((prev) => ({
                  ...prev,
                  pcd: value,
                }))
              }
              isWarning={warningInput.pcdIsWarning}
            />

            <div className="wrapper__grid-template">
              <InputTextSelect
                label="Gênero"
                searchOptions
                inputValue={particularities.gender}
                options={GENDERS}
                setInputValue={(value) =>
                  setParticularities((prev) => ({
                    ...prev,
                    gender: value,
                  }))
                }
                isWarning={warningInput.genderIsWarning}
              />

              <InputTextSelect
                label="Raça"
                searchOptions
                inputValue={particularities.race}
                options={RACES}
                setInputValue={(value) =>
                  setParticularities((prev) => ({
                    ...prev,
                    race: value,
                  }))
                }
                isWarning={warningInput.raceIsWarning}
              />
            </div>
            <InputTextSelect
              label="Escolaridade"
              searchOptions
              inputValue={particularities.education}
              options={EDUCATION}
              setInputValue={(value) =>
                setParticularities((prev) => ({
                  ...prev,
                  education: value,
                }))
              }
              isWarning={warningInput.educationIsWarning}
            />
            <InputText
              onChange={(value) =>
                setParticularities((prev) => ({
                  ...prev,
                  courses: value,
                }))
              }
              type="text"
              value={particularities.courses}
              label="Cursos"
              placeholder=""
              isWarning={warningInput.coursesIsWarning}
            />
            <div className="candidate-registration__experiences-wrapper">
              <Title size="h3" text="Experiência" />
              {experiencesAdded.length ? (
                <div className="list-experiences ">
                  <ul className="list-experience__ul">
                    {experiencesAdded.map((experience, index) => {
                      return (
                        <li key={index} className="list-experience__li">
                          <span className="li__text">{experience.role}</span>
                          <span className="li__text">{experience.time}</span>
                          <Image
                            width={100}
                            height={100}
                            onClick={() => deleteExperience(experience)}
                            src={CloseIconRed}
                            alt="close icon"
                            className="li__delete-icon"
                          />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : (
                false
              )}
              <div className="experiences-wrapper__content ">
                <InputText
                  onChange={(value) =>
                    setExperience((prev) => ({
                      ...prev,
                      role: value,
                    }))
                  }
                  type="text"
                  value={experience.role}
                  label="Função"
                  placeholder=""
                />
                <InputTextSelect
                  label="Tempo"
                  searchOptions
                  inputValue={experience.time}
                  options={EXPERIENCE}
                  setInputValue={(value) =>
                    setExperience((prev) => ({
                      ...prev,
                      time: value,
                    }))
                  }
                />
                <Button
                  buttonStyle="primary"
                  buttonText="Adicionar"
                  onClick={addExperience}
                />
              </div>
            </div>
          </div>
        ) : (
          false
        )}

        <Button
          buttonStyle="primary"
          buttonText={registerStep === 2 ? "Salvar" : "Continuar"}
          onClick={continueHandler}
        />
      </main>
    </Layout>
  );
};

export default CandidateRegistrationPage;
