import React, { useEffect, useState } from "react";
import "./styles.scss";
import Title from "components/Texts/Title";
import Layout from "components/Layouts/Layout";
import { useNavigate } from "react-router-dom";
import LabelWithValue from "components/Texts/LabelWithValue";
import { useContactRegister } from "hooks/useContactRegister";
import { IContactRegister } from "types/contactRegister";

const ContactViewPage: React.FC = () => {
  const navigate = useNavigate();
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
