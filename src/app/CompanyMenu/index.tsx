import React, { useState } from "react";
import "./styles.scss";
import Layout from "components/Layouts/Layout";
import { useNavigate } from "react-router-dom";
import InputText from "components/Inputs/InputText";
import BuildIconWhite from "assets/icons/buildings/buildings-icon-white.svg";
import IdentityIcon from "assets/icons/identities/identity-icon-white.svg";
import PaperIconWhite from "assets/icons/papers/paper-icon-white.svg";
import TableIconWhite from "assets/icons/tables/table-icon-white.svg";
import GridButtons, { ButtonGrid } from "components/Buttons/GridButtons";

const CompanyMenuPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const buttonsNavigation: ButtonGrid[] = [
    {
      action: () => navigate("/company-registration"),
      icon: BuildIconWhite,
      id: "1",
      text: "Cadastrar Empresa",
    },
    {
      action: () => navigate("/contact-registration"),
      icon: IdentityIcon,
      id: "2",
      text: "Cadastrar Contato",
    },
    {
      action: () => navigate("/agreement-registration"),
      icon: PaperIconWhite,
      id: "3",
      text: "Cadastrar Contrato",
    },
    {
      action: () => navigate("/companies-list-register"),
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
