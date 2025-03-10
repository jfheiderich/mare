"use client";
import React, { useEffect, useState } from "react";
import "./styles.scss";
import Title from "@/components/Texts/Title";
import Layout from "@/components/Layouts/Layout/page";
import LabelWithValue from "@/components/Texts/LabelWithValue";
import { useContactRegister } from "@/hooks/useContactRegister";

const ContactViewPage: React.FC = () => {
  const { contactRegister, setContactRegister } = useContactRegister();

  interface ContactData {
    "CNPJ da Empresa": string;
    "Nome Completo": string;
    Cargo: string;
    "Área de atuação": string;
    Email: string;
    Telefone: string;
    Celular: string;
    LinkedIn?: string;
  }

  const [contactData, setContactData] = useState<ContactData>(
    {} as ContactData
  );

  useEffect(() => {
    const prepareData = {
      "CNPJ da Empresa": contactRegister.cnpj,
      "Nome Completo": contactRegister.contactName,
      Cargo: contactRegister.contactPosition,
      "Área de atuação": contactRegister.contactArea,
      Email: contactRegister.contactEmail,
      Telefone: contactRegister.contactPhone,
      Celular: contactRegister.contactCellPhone,
      LinkedIn: contactRegister.contactLinkedInLink,
    };
    setContactData(prepareData);
  }, []);

  return (
    <Layout className="contact-view " hasNavbar styleNav="company" hasToolBar>
      <main className="contact-view__main">
        <Title text={`Empresa: ${contactData["CNPJ da Empresa"]}`} size="h2" />
        {Object.entries(contactData).map(([key, value], index) => (
          <LabelWithValue key={key} labelText={key} valueText={value} />
        ))}
      </main>
    </Layout>
  );
};

export default ContactViewPage;
