"use client";
import React, { useEffect, useState } from "react";
import "./styles.scss";
import Title from "@/components/Texts/Title";
import Layout from "@/components/Layouts/Layout/page";
import { useRouter } from "next/navigation";
import InputText from "@/components/Inputs/InputText/page";
import LIST_ALL_CANDIDATES, {
  ListAllCandidatesResponse,
} from "@/api/candidates/listAllCandidates";
import { useUserInfo } from "@/hooks/userInfo";
import ListItemLink from "@/components/ListItemLink/page";
import { useCandidateSelect } from "@/hooks/useCandidateSelect";

const CandidateListRegisterPage: React.FC = () => {
  const router = useRouter();
  const { setCandidateSelect } = useCandidateSelect();

  const { userInfo } = useUserInfo();
  const [candidates, setCandidates] = useState<
    ListAllCandidatesResponse[] | null
  >(null);
  const [candidatesFiltered, setCandidatesFiltered] = useState<
    ListAllCandidatesResponse[] | null
  >(null);
  const [searchList, setSearchList] = useState("");

  useEffect(() => {
    listCandidates();
  }, []);

  const listCandidates = async () => {
    try {
      const request = await LIST_ALL_CANDIDATES(userInfo["@mare_access-token"]);

      switch (request.status) {
        case 200:
          setCandidates(request.res);
          setCandidatesFiltered(request.res);
          break;
        default:
          break;
      }
      console.log(request);
    } catch (error) {
      console.error(error);
    }
  };

  const candidateSelected = (candidate: ListAllCandidatesResponse) => {
    setCandidateSelect(candidate);
    router.push("/candidate-list-register/candidate-edit");
  };

  return (
    <Layout
      className="candidate-list-register"
      hasNavbar
      hasToolBar
      styleNav="list-registers"
    >
      <main className="candidate-list-register__main wrapper standard-height">
        <Title text="Visualizar Registros" size="h1" />

        <InputText onChange={setSearchList} value={searchList} />

        <section className="main__list-wrapper form-core">
          {candidatesFiltered
            ?.filter((candidate) =>
              candidate.name
                .toLocaleLowerCase()
                .startsWith(searchList.toLocaleLowerCase())
            )
            .map((candidate, index) => (
              <ListItemLink
                key={index}
                highlightText={candidate.name}
                simpleText={candidate.birthDate}
                hasArrowRight
                onClick={() => candidateSelected(candidate)}
              />
            ))}
        </section>
      </main>
    </Layout>
  );
};

export default CandidateListRegisterPage;
