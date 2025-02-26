"use client";
import React, { useEffect, useState } from "react";
import "./styles.scss";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import whiteWaves from "../../public/icons/oceanLines/ocean-lines.opacity.svg";
import Title from "@/components/Texts/Title";
import Button from "@/components/Buttons/Button";

const NotFoundPage: React.FC = () => {
  const router = useRouter();

  return (
    <section className={`not-found-page`}>
      <div className="not-found-page__logo-container">
        <Image width={100} height={100} src={whiteWaves} alt="Mare logo" />
      </div>
      <Title
        size="h1"
        text="Desculpe! Página não encontrada."
        className="not-found-page__sorry-text"
      />
      <Button
        buttonStyle="primary"
        buttonText="Voltar para Mare"
        onClick={() => router.push("/home")}
        className="not-found-page__button-back"
      />
    </section>
  );
};

export default NotFoundPage;
