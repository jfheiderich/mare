import React, { useState } from "react";
import "./styles.scss";
import Layout from "components/Layouts/Layout";
import { useNavigate } from "react-router-dom";
import InputText from "components/Inputs/InputText";
import TableIconWhite from "assets/icons/tables/table-icon-white.svg";
import GridButtons, { ButtonGrid } from "components/Buttons/GridButtons";
import WalletSimpleWhite from "assets/icons/wallets/wallet-simple-icon-white.svg";
import PersonSquareWhite from "assets/icons/profiles/person-square-icon-white.svg";
import PeopleSquareWhite from "assets/icons/profiles/people-square-icon-white.svg";

const SelectionProcessMenuPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const buttonsNavigation: ButtonGrid[] = [
    {
      action: () => navigate("/job-vacancy-registration"),
      icon: WalletSimpleWhite,
      id: "1",
      text: "Cadastrar Vaga",
    },
    {
      action: () => navigate("/candidate-registration"),
      icon: PersonSquareWhite,
      id: "2",
      text: "Cadastrar Candidato",
    },
    {
      action: () => navigate("/candidate-management"),
      icon: PeopleSquareWhite,
      id: "3",
      text: "Gerenciar Candidato",
    },
    {
      action: () => navigate("/approved-registration"),
      icon: PeopleSquareWhite,
      id: "4",
      text: "Cadastrar Aprovado",
    },
    {
      action: () => navigate("/approved-list-register"),
      icon: TableIconWhite,
      id: "5",
      text: "Visualizar Registros",
    },
  ];

  return (
    <Layout
      className="selection-process-menu"
      hasNavbar
      hasToolBar
      pageTitle="Processo Seletivo"
    >
      <main className="selection-process-menu__main">
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

export default SelectionProcessMenuPage;
