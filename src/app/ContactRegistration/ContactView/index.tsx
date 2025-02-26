"use client";
import React, { useEffect, useState } from "react";
import "./styles.scss";
import Image from "next/image";
import Title from "@/components/Texts/Title";
import Layout from "@/components/Layouts/Layout";
import { useParams, useRouter } from "next/navigation";
import LabelWithValue from "@/components/Texts/LabelWithValue";
import { useContactRegister } from "@/hooks/useContactRegister";
import { IContactRegister } from "@/types/contactRegister";

const ContactViewPage: React.FC = () => {
  const router = useRouter();
  const { contactRegister, setContactRegister } = useContactRegister();

  const [contactData, setContactData] = useState<IContactRegister>(
    {} as IContactRegister
  );

  useEffect(() => {
    setContactData(contactRegister);
  }, []);

  return (
    <Layout className="contact-view" hasNavbar pageTitle="Contas" hasToolBar>
      <main className="contact-view__main margin-ver-16">
        <Title text={`Empresa: ${contactData.cnpj}`} size="h2" />
        {Object.entries(contactData).map(([key, value], index) => (
          <LabelWithValue key={key} labelText={key} valueText={value} />
        ))}
      </main>
    </Layout>
  );
};

export default ContactViewPage;
