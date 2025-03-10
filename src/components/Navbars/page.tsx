"use client";
import React, { useEffect, useState, useMemo } from "react";
import "./styles.scss";
import Image from "next/image";
import LinesWaves from "../../../public/icons/oceanLines/wave-logo.svg";
import Toolbar, { ToolbarButton } from "@/components/Toolbar/page";
import BuildingIconGreen from "../../../public/icons/buildings/buildings-icon-green-dark.svg";
import WalletIcon from "../../../public/icons/wallets/wallet-icon-black.svg";
import ProfileIcon from "../../../public/icons/profiles/person-icon-black.svg";
import TableIcon from "../../../public/icons/tables/table-icon-black.svg";
import ChevronDown from "../../../public/icons/chevrons/chevron-down-dark-blue.svg";
import ChevronRight from "../../../public/icons/chevrons/chevron-right-dark-ocean-blue.svg";

import { StaticImport } from "next/dist/shared/lib/get-img-props";

type NavElements = {
  id: string;
  elementPrimary: React.JSX.Element;
  elementSecondary: React.JSX.Element;
};

interface NavbarLayoutProps {
  className?: string;
  loginCompany: () => void;
  loginCandidate: () => void;
  loginMediator: () => void;
  styleNav:
    | "mare"
    | "company"
    | "selection-process"
    | "profile"
    | "list-registers";
}
interface PrimaryElementNavBarProps {
  image: string | StaticImport;
  alt: string;
  text: string;
}

interface LoginDropdownProps {
  loginCandidate?: () => void;
  loginCompany?: () => void;
  loginMediator?: () => void;
}

const PrimaryElementNavBar: React.FC<PrimaryElementNavBarProps> = ({
  alt,
  image,
  text,
}) => (
  <div className="navbar__primary-element">
    <Image src={image} alt={alt} width={24} height={24} />
    <p className="primary-element__text">{text}</p>
  </div>
);
const SecondaryElementNavBar: React.FC = () => (
  <div className="navbar__secondary-element">
    <Image src={ChevronRight} alt="seta para direita" width={8} height={12} />
    <p className="secondary-element">Voltar</p>
  </div>
);

const LoginDropdown: React.FC<LoginDropdownProps> = ({
  loginCandidate,
  loginCompany,
  loginMediator,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const loginModesList = [
    { id: "1", text: "Sou empresa", action: loginCompany || (() => {}) },
    { id: "2", text: "Sou Candidato", action: loginCandidate || (() => {}) },
    { id: "3", text: "Sou Mediador", action: loginMediator || (() => {}) },
  ];

  return (
    <div className="navbar__login-wrapper">
      <button
        className="login-wrapper__button"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Entrar
        <span
          className={`button__arrow-wrapper ${isOpen ? "upside-down" : ""}`}
        >
          <Image
            width={16}
            height={10}
            src={ChevronDown}
            alt="seta para baixo"
          />
        </span>
      </button>
      {isOpen && (
        <div className="login-wrapper__drop-down">
          <ul className="drop-down__list">
            {loginModesList.map((mode) => (
              <li
                className="list__list-item"
                key={mode.id}
                onClick={mode.action}
              >
                {mode.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const navbarElements: NavElements[] = [
  {
    id: "mare",
    elementPrimary: (
      <p className="navbar__text-wrapper">
        <span className="text-wrapper__bold">MARE</span> Conecta
      </p>
    ),
    elementSecondary: <LoginDropdown />,
  },
  {
    id: "company",
    elementPrimary: (
      <PrimaryElementNavBar
        text="Contas"
        alt="companhia"
        image={BuildingIconGreen}
      />
    ),
    elementSecondary: <SecondaryElementNavBar />,
  },
  {
    id: "selection-process",
    elementPrimary: (
      <PrimaryElementNavBar
        text="Processo Seletivo"
        alt="bolsa"
        image={WalletIcon}
      />
    ),
    elementSecondary: <SecondaryElementNavBar />,
  },
  {
    id: "profile",
    elementPrimary: (
      <PrimaryElementNavBar text="Perfil" alt="avatar" image={ProfileIcon} />
    ),
    elementSecondary: <SecondaryElementNavBar />,
  },
  {
    id: "list-registers",
    elementPrimary: (
      <PrimaryElementNavBar
        text="Visualizar Registros"
        alt="tabela"
        image={TableIcon}
      />
    ),
    elementSecondary: <SecondaryElementNavBar />,
  },
];

const NavbarLayout: React.FC<NavbarLayoutProps> = ({
  className,
  loginCandidate,
  loginCompany,
  loginMediator,
  styleNav,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const elementToShow = useMemo(
    () => navbarElements.find((el) => el.id === styleNav),
    [styleNav]
  );

  if (!isMounted) return null;

  return (
    <nav className={`layout-component__navbar ${className ?? ""}`}>
      {elementToShow && (
        <div className="navbar__inner">
          {elementToShow.elementPrimary}
          <figure className="navbar__logo-wrapper">
            <Image width={100} height={20} src={LinesWaves} alt="ondas azuis" />
          </figure>
          {React.cloneElement(elementToShow.elementSecondary, {
            loginCandidate,
            loginCompany,
            loginMediator,
          })}
        </div>
      )}
    </nav>
  );
};

export default NavbarLayout;
