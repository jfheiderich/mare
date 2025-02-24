import React, { useEffect, useState } from "react";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import whiteWaves from "../../assets/icons/oceanLines/ocean-lines.opacity.svg";
import Title from "components/Texts/Title";
import Button from "components/Buttons/Button";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className={`not-found-page`}>
      <div className="not-found-page__logo-container">
        <img src={whiteWaves} alt="Mare logo" />
      </div>
      <Title
        size="h1"
        text="Desculpe! Página não encontrada."
        className="not-found-page__sorry-text"
      />
      <Button
        buttonStyle="primary"
        buttonText="Voltar para Mare"
        onClick={() => navigate("/home")}
        className="not-found-page__button-back"
      />
    </section>
  );
};

export default NotFoundPage;
