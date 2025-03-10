import React, { useState } from "react";
import "./styles.scss";
import Image from "next/image";
import Layout from "@/components/Layouts/Layout/page";
import { useParams, useRouter } from "next/navigation";
import InputText from "@/components/Inputs/InputText/page";
import TableIconWhite from "../../public/icons/tables/table-icon-white.svg";
import GridButtons, { ButtonGrid } from "@/components/Buttons/GridButtons/page";
import WalletSimpleWhite from "../../public/icons/wallets/wallet-simple-icon-white.svg";
import PersonSquareWhite from "../../public/icons/profiles/person-square-icon-white.svg";
import PeopleSquareWhite from "../../public/icons/profiles/people-square-icon-white.svg";

const SelectionProcessMenuPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const buttonsNavigation: ButtonGrid[] = [
    {
      action: () => router.push("/job-vacancy-registration"),
      icon: WalletSimpleWhite,
      id: "1",
      text: "Cadastrar Vaga",
    },
    {
      action: () => router.push("/candidate-registration"),
      icon: PersonSquareWhite,
      id: "2",
      text: "Cadastrar Candidato",
    },
    {
      action: () => router.push("/candidate-management"),
      icon: PeopleSquareWhite,
      id: "3",
      text: "Gerenciar Candidato",
    },
    {
      action: () => router.push("/approved-registration"),
      icon: PeopleSquareWhite,
      id: "4",
      text: "Cadastrar Aprovado",
    },
    {
      action: () => router.push("/approved-list-register"),
      icon: TableIconWhite,
      id: "5",
      text: "Visualizar Registros",
    },
  ];

  return (
    <Layout className="selection-process-menu" hasNavbar hasToolBar>
      <main className="selection-process-menu__main">
        <InputText
          labelId="search"
          onChange={setSearchValue}
          value={searchValue}
        />

        <GridButtons buttons={buttonsNavigation} />
      </main>
    </Layout>
  );
};

export default SelectionProcessMenuPage;
