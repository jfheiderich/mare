import React, { ReactNode, useEffect, useState } from "react";
import "./styles.scss";
import Image from "next/image";
import LinesWaves from "../../../../public/icons/oceanLines/wave-logo.svg";
import Toolbar, { ToolbarButton } from "@/components/Toolbar/page";
import BuildingIconBlack from "../../../../public/icons/buildings/buildings-icon-black.svg";
import BuildingIconGreen from "../../../../public/icons/buildings/buildings-icon-green-dark.svg";
import WalletIcon from "../../../../public/icons/wallets/wallet-icon-black.svg";
import ProfileIcon from "../../../../public/icons/profiles/person-icon-black.svg";
import { useRouter } from "next/navigation";
import HomeIcon from "../../../../public/icons/home/home-icon-black.svg";
import TableIcon from "../../../../public/icons/tables/table-icon-black.svg";
import InstagramIcon from "../../../../public/icons/socialMedias/instagram-icon-white.svg";
import LinkedinIcon from "../../../../public/icons/socialMedias/linkedIn-icon-white.svg";
import WhatsAppIcon from "../../../../public/icons/socialMedias/whatsapp-icon-white.svg";
import ChevronDown from "../../../../public/icons/chevrons/chevron-down-dark-blue.svg";
import FooterWave from "../../../../public/icons/oceanLines/footer-wave.png";

interface LayoutProps {
  className?: string;
  children: ReactNode;
  hasNavbar?: boolean;
  hasFooter?: boolean;
  hasFooterContacts?: boolean;
  hasToolBar?: boolean;
  isBackButton?: boolean;
  backButtonLink?: string;
  backButtonText?: string;
  pageTitle?:
    | "Contas"
    | "Processo Seletivo"
    | "Perfil"
    | "Visualizar Registros"
    | undefined;
}

const Layout: React.FC<LayoutProps> = (props) => {
  const {
    className,
    children,
    hasFooter,
    hasNavbar,
    hasToolBar,
    pageTitle,
    isBackButton,
    backButtonLink,
    hasFooterContacts,
    backButtonText,
  } = props;

  const router = useRouter();
  const [isOpenLoginDropDown, setIsOpenLoginDropDown] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const defaultButtons: ToolbarButton[] = [
    {
      id: "0",
      icon: HomeIcon,
      routerTo: "/home",
      text: "Início",
    },
    {
      id: "1",
      icon: BuildingIconBlack,
      routerTo: "/company-menu",
      text: "Contas",
    },
    {
      id: "2",
      icon: WalletIcon,
      routerTo: "/selection-process-menu",
      text: "Processo Seletivo",
    },
    {
      id: "3",
      icon: ProfileIcon,
      routerTo: "",
      text: "Perfil",
    },
  ];

  const loginCompany = () => {
    router.push("/company-login");
  };

  const loginCandidate = () => {};

  const pageTitleDetails = () => {
    switch (pageTitle) {
      case "Contas":
        return { icon: BuildingIconGreen, text: "Contas" };
      case "Perfil":
        return { icon: ProfileIcon, text: pageTitle };
      case "Processo Seletivo":
        return { icon: WalletIcon, text: pageTitle };
      case "Visualizar Registros":
        return { icon: TableIcon, text: pageTitle };

      default:
        return { icon: "", text: "" };
    }
  };

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
      action: loginCandidate || (() => {}),
    },
  ];

  return (
    <div id="layout-component">
      <div className="layout-component-wrapper">
        {hasNavbar ? (
          <nav className="layout-component__navbar">
            <p className="navbar__text-wrapper">
              <span className="text-wrapper__bold">MARE</span> Conecta
            </p>
            <figure className="navbar__logo-wrapper">
              <Image
                width={100}
                height={20}
                src={LinesWaves}
                alt="ondas azuis"
              />
            </figure>

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
          </nav>
        ) : (
          false
        )}
        {/* {pageTitle ? (
          <nav className="layout-component__page-title margin-vert-16">
            {pageTitleDetails().icon &&
            typeof pageTitleDetails().text === "string" ? (
              <Image width={100} height={100} 
                src={pageTitleDetails().icon}
                alt={pageTitleDetails().text}
                className="page-title__icon margin-left-24"
              />
            ) : null}

            <Title size="h3" text={pageTitleDetails().text} />

            <ButtonTextLink
              isBackButton={isBackButton}
              text={!isBackButton && backButtonText ? backButtonText : "Voltar"}
              buttonStyle="light-14"
              className="margin-right-24 button-link"
              onClick={() => {
                if (!isBackButton && backButtonLink) {
                  router.push(backButtonLink);
                }
              }}
            />
          </nav>
        ) : (
          false
        )}*/}
        <div
          id="layout-component__main"
          className={`${className ?? ""} ${hasNavbar ? "space-nav" : ""}`}
        >
          {children}
        </div>

        {hasFooter || hasFooterContacts ? (
          <footer className="layout-component__footer">
            <div className="footer__links-container">
              <div className="footer__links">
                <p className="links__link">Institucional</p>
                <p className="links__link">Contato</p>
              </div>

              {hasFooterContacts ? (
                <div className="footer__social-medias">
                  <span className="social-medias__icon-text-wrapper">
                    <Image
                      width={16}
                      height={16}
                      src={InstagramIcon}
                      alt="Instagram logo"
                      className="icon-text-wrapper__icon"
                    />
                    <p className="icon-text-wrapper__text">/mareconecta</p>
                  </span>
                  <span className="social-medias__icon-text-wrapper">
                    <Image
                      width={16}
                      height={16}
                      src={LinkedinIcon}
                      alt="LinkedIn logo"
                      className="icon-text-wrapper__icon"
                    />
                    <p className="icon-text-wrapper__text">/mareconecta</p>
                  </span>
                  <span className="social-medias__icon-text-wrapper">
                    <Image
                      width={16}
                      height={16}
                      src={WhatsAppIcon}
                      alt="whatsApp logo"
                      className="icon-text-wrapper__icon"
                    />
                    <p className="icon-text-wrapper__text">
                      <a href="tel:+5527996602854"> 27 99660-2854</a>
                    </p>
                  </span>
                </div>
              ) : (
                false
              )}
            </div>

            <Image
              width={100}
              height={200}
              src={FooterWave}
              alt="fundo azul em formato de onda"
            />

            <p className="footer__rights-text">
              MARE Soluções. Todos os direitos reservados. Serra, ES - Brasil
            </p>
          </footer>
        ) : (
          false
        )}
      </div>
      {hasToolBar ? <Toolbar buttons={defaultButtons} /> : false}
    </div>
  );
};

export default Layout;
