"use client";
import React, { useRef, useState } from "react";
import "./styles.scss";
import Image from "next/image";
import Title from "@/components/Texts/Title";
import Layout from "@/components/Layouts/Layout/page";
import { useParams, useRouter } from "next/navigation";
import InputText from "@/components/Inputs/InputText/page";
import Button from "@/components/Buttons/Button";
import { Experience } from "@/types/experience";
import InputTextSelect, {
  IOptionInputTextSelectProps,
} from "@/components/Inputs/InputTextSelect/page";
import STATES from "@/mocks/states";
import { getSearchAddressByCEP } from "@/api/getSearchApi";
import MARITAL_STATUS from "@/mocks/maritalStatus";
import PCD from "@/mocks/pcd";
import GENDERS from "@/mocks/gender";
import RACES from "@/mocks/race";
import EDUCATION from "@/mocks/education";
import EXPERIENCE from "@/mocks/experience";
import CloseIconRed from "../../public/icons/closes/close-icon-red-blood.svg";
import { useApprovedRegister } from "@/hooks/useApprovedRegister";

const ApprovedRegistrationPage: React.FC = () => {
  const router = useRouter();
  const { setApprovedRegister } = useApprovedRegister();
  const formRef = useRef<HTMLElement | null>(null);
  const [registerStep, setRegisterStep] = useState(1);
  const [approvedDoc, setApprovedDoc] = useState({
    cpf: "",
    rg: "",
    docIssuedOrg: "",
    docIssuedState: "",
    docExpeditionDate: "",
    name: "",
    birthDate: "",
    maritalStatus: "",
    motherName: "",
    fatherName: "",
  });

  const [approvedAddress, setApprovedAddress] = useState({
    cep: "",
    street: "",
    number: "",
    complement: "",
    state: "",
    city: "",
    phone: "",
    neighborhood: "",
  });

  const [approvedSpecifications, setApprovedSpecifications] = useState({
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
    rgIsWarning: false,
    docIssuedOrgIsWarning: false,
    docIssuedStateIsWarning: false,
    docExpeditionDateIsWarning: false,
    nameIsWarning: false,
    birthDateIsWarning: false,
    maritalStatusIsWarning: false,
    motherNameIsWarning: false,
    fatherNameIsWarning: false,
    cepIsWarning: false,
    streetIsWarning: false,
    numberIsWarning: false,
    complementIsWarning: false,
    stateIsWarning: false,
    cityIsWarning: false,
    phoneIsWarning: false,
    pcdIsWarning: false,
    genderIsWarning: false,
    raceIsWarning: false,
    educationIsWarning: false,
    coursesIsWarning: false,
    neighborhoodIsWarning: false,
  });

  const resetWarnings = () => {
    setWarningInput({
      cpfIsWarning: false,
      rgIsWarning: false,
      docIssuedOrgIsWarning: false,
      docIssuedStateIsWarning: false,
      docExpeditionDateIsWarning: false,
      nameIsWarning: false,
      birthDateIsWarning: false,
      maritalStatusIsWarning: false,
      motherNameIsWarning: false,
      fatherNameIsWarning: false,
      cepIsWarning: false,
      streetIsWarning: false,
      numberIsWarning: false,
      complementIsWarning: false,
      stateIsWarning: false,
      cityIsWarning: false,
      phoneIsWarning: false,
      pcdIsWarning: false,
      genderIsWarning: false,
      raceIsWarning: false,
      educationIsWarning: false,
      coursesIsWarning: false,
      neighborhoodIsWarning: false,
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
      if (!validateStringObject(approvedDoc)) {
        return;
      }
    }

    if (registerStep === 2) {
      if (!validateStringObject(approvedAddress)) {
        return;
      }
    }

    if (registerStep === 3) {
      if (!validateStringObject(approvedSpecifications)) {
        return;
      }

      const prepareData = {
        experiences: experiencesAdded,
        ...approvedSpecifications,
        ...approvedDoc,
        ...approvedAddress,
      };

      console.log(prepareData);

      setApprovedRegister(prepareData);

      router.push("/approved-registration-view");
    }

    setRegisterStep((prev) => prev + 1);
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

  const searchAddressByCEP = async (cep: string) => {
    try {
      setApprovedAddress((prev) => ({
        ...prev,
        cep: cep,
      }));
      if (cep.length === 9) {
        const resAddress = await getSearchAddressByCEP(cep);
        setApprovedAddress((prev) => ({
          ...prev,
          cep: cep,
          street: resAddress.logradouro,
          state: resAddress.uf,
          city: resAddress.localidade,
          neighborhood: resAddress.bairro,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout
      className="approved-registration"
      hasNavbar
      pageTitle="Processo Seletivo"
      hasToolBar
    >
      <Title size="h2" text={`Cadastrar Aprovado (${registerStep}/3)`} />
      <main className="approved-registration__form " ref={formRef}>
        {registerStep === 1 ? (
          <div className="form__wrapper">
            <InputText
              onChange={(value) =>
                setApprovedDoc((prev) => ({ ...prev, cpf: value }))
              }
              value={approvedDoc.cpf}
              label="CPF"
              placeholder=""
              mask="999.999.999-99"
              isWarning={warningInput.cpfIsWarning}
            />

            <InputText
              onChange={(value) =>
                setApprovedDoc((prev) => ({ ...prev, rg: value }))
              }
              value={approvedDoc.rg}
              label="RG"
              placeholder=""
              isWarning={warningInput.rgIsWarning}
            />

            <div className="wrapper__grid-template--for-3">
              <InputText
                onChange={(value) =>
                  setApprovedDoc((prev) => ({ ...prev, docIssuedOrg: value }))
                }
                value={approvedDoc.docIssuedOrg}
                label="Órgão expeditor"
                placeholder=""
                isWarning={warningInput.docIssuedOrgIsWarning}
              />
              <InputTextSelect
                options={stateElements}
                searchOptions
                setInputValue={(value) =>
                  setApprovedDoc((prev) => ({
                    ...prev,
                    docIssuedState: value,
                  }))
                }
                label="Estado expeditor"
                inputValue={approvedDoc.docIssuedState}
                isWarning={warningInput.docIssuedStateIsWarning}
              />
              <InputText
                onChange={(value) =>
                  setApprovedDoc((prev) => ({
                    ...prev,
                    docExpeditionDate: value,
                  }))
                }
                value={approvedDoc.docExpeditionDate}
                label="Data de expedição"
                placeholder="dia/mês/ano"
                mask="99/99/9999"
                isWarning={warningInput.docExpeditionDateIsWarning}
              />
            </div>
            <InputText
              onChange={(value) =>
                setApprovedDoc((prev) => ({ ...prev, name: value }))
              }
              value={approvedDoc.name}
              label="Nome completo"
              placeholder=""
              isWarning={warningInput.nameIsWarning}
            />
            <div className="wrapper__grid-template--for-2">
              <InputText
                onChange={(value) =>
                  setApprovedDoc((prev) => ({ ...prev, birthDate: value }))
                }
                value={approvedDoc.birthDate}
                label="Data de Nascimento"
                placeholder="dia/mês/ano"
                mask="99/99/9999"
                isWarning={warningInput.birthDateIsWarning}
              />

              <InputTextSelect
                options={MARITAL_STATUS}
                searchOptions
                setInputValue={(value) =>
                  setApprovedDoc((prev) => ({
                    ...prev,
                    maritalStatus: value,
                  }))
                }
                label="Estado Civil"
                inputValue={approvedDoc.maritalStatus}
                isWarning={warningInput.maritalStatusIsWarning}
              />
            </div>

            <InputText
              onChange={(value) =>
                setApprovedDoc((prev) => ({
                  ...prev,
                  motherName: value,
                }))
              }
              value={approvedDoc.motherName}
              label="Nome da mãe"
              isWarning={warningInput.motherNameIsWarning}
            />
            <InputText
              onChange={(value) =>
                setApprovedDoc((prev) => ({
                  ...prev,
                  fatherName: value,
                }))
              }
              value={approvedDoc.fatherName}
              label="Nome do pai"
              isWarning={warningInput.fatherNameIsWarning}
            />
          </div>
        ) : (
          false
        )}

        {registerStep === 2 ? (
          <div className="form__wrapper">
            <InputText
              onChange={searchAddressByCEP}
              value={approvedAddress.cep}
              label="CEP"
              mask="99999-999"
              placeholder=""
              type="text"
              isWarning={warningInput.cepIsWarning}
            />

            <InputText
              onChange={(value) =>
                setApprovedAddress((prev) => ({ ...prev, city: value }))
              }
              value={approvedAddress.city}
              label="Endereço"
              placeholder=""
              isWarning={warningInput.cityIsWarning}
            />

            <div className="wrapper__grid-template--modified">
              <InputText
                onChange={(value) =>
                  setApprovedAddress((prev) => ({ ...prev, number: value }))
                }
                value={approvedAddress.number}
                label="Número"
                placeholder=""
                isWarning={warningInput.numberIsWarning}
              />
              <InputText
                onChange={(value) =>
                  setApprovedAddress((prev) => ({ ...prev, complement: value }))
                }
                value={approvedAddress.complement}
                label="Complemento"
                placeholder=""
                isWarning={warningInput.complementIsWarning}
              />
            </div>
            <InputText
              onChange={(value) =>
                setApprovedAddress((prev) => ({ ...prev, neighborhood: value }))
              }
              value={approvedAddress.neighborhood}
              label="Bairro"
              placeholder=""
              isWarning={warningInput.neighborhoodIsWarning}
            />
            <div className="wrapper__grid-template--modified">
              <InputTextSelect
                options={stateElements}
                searchOptions
                setInputValue={(value) =>
                  setApprovedAddress((prev) => ({
                    ...prev,
                    state: value,
                  }))
                }
                label="Estado"
                inputValue={approvedAddress.state}
                isWarning={warningInput.stateIsWarning}
              />
              <InputText
                onChange={(value) =>
                  setApprovedAddress((prev) => ({ ...prev, city: value }))
                }
                value={approvedAddress.city}
                label="Cidade"
                placeholder=""
                isWarning={warningInput.cityIsWarning}
              />
            </div>
            <InputText
              onChange={(value) =>
                setApprovedAddress((prev) => ({ ...prev, phone: value }))
              }
              value={approvedAddress.phone}
              label="Telefone"
              placeholder=""
              type="tel"
              mask="(99) 99999-9999"
              isWarning={warningInput.phoneIsWarning}
            />
          </div>
        ) : (
          false
        )}

        {registerStep === 3 ? (
          <div className="form__wrapper">
            <InputTextSelect
              label="PCD"
              searchOptions
              inputValue={approvedSpecifications.pcd}
              options={PCD}
              setInputValue={(value) =>
                setApprovedSpecifications((prev) => ({
                  ...prev,
                  pcd: value,
                }))
              }
              isWarning={warningInput.pcdIsWarning}
            />
            <div className="wrapper__grid-template--for-2">
              <InputTextSelect
                searchOptions
                label="Gênero"
                inputValue={approvedSpecifications.gender}
                options={GENDERS}
                setInputValue={(value) =>
                  setApprovedSpecifications((prev) => ({
                    ...prev,
                    gender: value,
                  }))
                }
                isWarning={warningInput.genderIsWarning}
              />
              <InputTextSelect
                label="Raça"
                searchOptions
                inputValue={approvedSpecifications.race}
                options={RACES}
                setInputValue={(value) =>
                  setApprovedSpecifications((prev) => ({
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
              inputValue={approvedSpecifications.education}
              options={EDUCATION}
              setInputValue={(value) =>
                setApprovedSpecifications((prev) => ({
                  ...prev,
                  education: value,
                }))
              }
              isWarning={warningInput.educationIsWarning}
            />
            <InputText
              onChange={(value) =>
                setApprovedSpecifications((prev) => ({
                  ...prev,
                  courses: value,
                }))
              }
              type="text"
              value={approvedSpecifications.courses}
              label="Cursos"
              placeholder=""
              isWarning={warningInput.coursesIsWarning}
            />
            <div className="approved-registration__experiences-wrapper">
              <Title size="h3" text="Experiência" />
              {experiencesAdded.length ? (
                <div className="list-experiences">
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
          buttonText={registerStep === 3 ? "Salvar" : "Continuar"}
          onClick={continueHandler}
        />
      </main>
    </Layout>
  );
};

export default ApprovedRegistrationPage;
