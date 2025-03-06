"user client";
import React, { useEffect, useState } from "react";
import "./styles.scss";
import Image from "next/image";
import LinesWaves from "../../../public/icons/oceanLines/wave-logo.svg";
import Toolbar, { ToolbarButton } from "@/components/Toolbar/page";
import BuildingIconBlack from "../../../public/icons/buildings/buildings-icon-black.svg";
import BuildingIconGreen from "../../../public/icons/buildings/buildings-icon-green-dark.svg";
import WalletIcon from "../../../public/icons/wallets/wallet-icon-black.svg";
import ProfileIcon from "../../../public/icons/profiles/person-icon-black.svg";
import { useRouter } from "next/navigation";
import HomeIcon from "../../../public/icons/home/home-icon-black.svg";
import TableIcon from "../../../public/icons/tables/table-icon-black.svg";
import InstagramIcon from "../../../public/icons/socialMedias/instagram-icon-white.svg";
import LinkedinIcon from "../../../public/icons/socialMedias/linkedIn-icon-white.svg";
import WhatsAppIcon from "../../../public/icons/socialMedias/whatsapp-icon-white.svg";
import ChevronDown from "../../../public/icons/chevrons/chevron-down-dark-blue.svg";
import ChevronRight from "../../../public/icons/chevrons/chevron-right-dark-ocean-blue.svg";

import FooterWave from "../../../public/icons/oceanLines/footer-wave.png";
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

const NavbarLayout: React.FC<NavbarLayoutProps> = (props) => {
  const { className, loginCandidate, loginCompany, loginMediator, styleNav } =
    props;
  const [isOpenLoginDropDown, setIsOpenLoginDropDown] = useState(false);
  const [elementToShow, setElementToShow] = useState<NavElements[]>([]);

  useEffect(() => {
    const element = navbarElements.filter((el) => el.id === styleNav);

    setElementToShow(element);
  }, [styleNav]);

  const loginModesList = [
    {
      id: "1",
      text: "Sou empresa",
      action: () => loginCompany(),
    },
    {
      id: "2",
      text: "Sou Candidato",
      action: loginCandidate || (() => {}),
    },
    {
      id: "3",
      text: "Sou Mediador",
      action: loginMediator || (() => {}),
    },
  ];

  const navbarElements: NavElements[] = [
    {
      id: "mare",
      elementPrimary: (
        <p className="navbar__text-wrapper">
          <span className="text-wrapper__bold">MARE</span> Conecta
        </p>
      ),
      elementSecondary: (
        <div className="navbar__login-wrapper">
          <button
            className="login-wrapper__button"
            onClick={() => setIsOpenLoginDropDown((prev) => !prev)}
          >
            Entrar
            <span
              className={`button__arrow-wrapper ${
                isOpenLoginDropDown ? "upside-down" : ""
              }`}
            >
              <Image
                width={16}
                height={10}
                src={ChevronDown}
                alt="seta para baixo"
              />
            </span>
          </button>
          {isOpenLoginDropDown ? (
            <div className="login-wrapper__drop-down">
              <ul className="drop-down__list">
                {loginModesList.map((mode, index, arr) => {
                  return (
                    <li
                      className="list__list-item"
                      key={mode.id}
                      onClick={mode.action}
                    >
                      {mode.text}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            false
          )}
        </div>
      ),
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

  return (
    <nav className={`layout-component__navbar ${className ?? ""}`}>
      {elementToShow.map((element, index) => {
        return (
          <div key={index} className="navbar__inner">
            {element.elementPrimary}
            <figure className="navbar__logo-wrapper">
              <Image
                width={100}
                height={20}
                src={LinesWaves}
                alt="ondas azuis"
              />
            </figure>
            {element.elementSecondary}
          </div>
        );
      })}
    </nav>
  );
};

export default NavbarLayout;

interface PrimaryElementNavBarProps {
  image: string | StaticImport;
  alt: string;
  text: string;
}

const PrimaryElementNavBar: React.FC<PrimaryElementNavBarProps> = (props) => {
  const { alt, image, text } = props;
  return (
    <div className="navbar__primary-element">
      <Image src={image} alt={alt} width={24} height={24} />
      <p className="primary-element__text">{text}</p>
    </div>
  );
};

interface SecondaryElementNavBarProps {}

const SecondaryElementNavBar: React.FC<SecondaryElementNavBarProps> = (
  props
) => {
  const {} = props;
  return (
    <div className="navbar__secondary-element">
      <Image src={ChevronRight} alt="seta para direita" width={8} height={12} />
      <p className="secondary-element">Voltar</p>
    </div>
  );
};
