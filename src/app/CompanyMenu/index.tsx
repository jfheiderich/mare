import React, { useState } from "react";
import "./styles.scss";
import Image from "next/image";
import Layout from "@/components/Layouts/Layout/page";
import { useParams, useRouter } from "next/navigation";
import InputText from "@/components/Inputs/InputText/page";
import BuildIconWhite from "../../public/icons/buildings/buildings-icon-white.svg";
import IdentityIcon from "../../public/icons/identities/identity-icon-white.svg";
import PaperIconWhite from "../../public/icons/papers/paper-icon-white.svg";
import TableIconWhite from "../../public/icons/tables/table-icon-white.svg";
import GridButtons, { ButtonGrid } from "@/components/Buttons/GridButtons/page";

const CompanyMenuPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const buttonsNavigation: ButtonGrid[] = [
    {
      action: () => router.push("/company-registration"),
      icon: BuildIconWhite,
      id: "1",
      text: "Cadastrar Empresa",
    },
    {
      action: () => router.push("/contact-registration"),
      icon: IdentityIcon,
      id: "2",
      text: "Cadastrar Contato",
    },
    {
      action: () => router.push("/agreement-registration"),
      icon: PaperIconWhite,
      id: "3",
      text: "Cadastrar Contrato",
    },
    {
      action: () => router.push("/companies-list-register"),
      icon: TableIconWhite,
      id: "4",
      text: "Visualizar Registros",
    },
  ];

  return (
    <Layout className="company-menu" hasNavbar hasToolBar pageTitle="Contas">
      <main className="company-menu__main">
        <InputText
          labelId="search"
          onChange={setSearchValue}
          value={searchValue}
        />

        <GridButtons
          buttons={buttonsNavigation}
          className="padding-16 padding-top-40"
        />
      </main>
    </Layout>
  );
};

export default CompanyMenuPage;
