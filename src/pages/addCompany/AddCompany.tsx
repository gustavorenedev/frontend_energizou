import React, { useState } from "react";
import CompanyForm from "../../components/form/Form";
import Layout from "../../components/layout/Layout";
import { Button } from "../../components/button/Button";

const AddCompany = () => {
  const [formData, setFormData] = useState({
    client_name: "",
    client_password: "",
    company_name: "",
    company_cnpj: "",
    company_zip_code: "",
    company_address: "",
    company_number: "",
    company_phone: "",
    company_email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreate = () => {
    console.log("Dados do formulário:", formData);

    fetch("http://localhost:3000/companies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Solicitação POST bem-sucedida");
        } else {
          console.error("Erro na solicitação POST");
        }
      })
      .catch((error) => {
        console.error("Erro na solicitação POST", error);
      });
  };

  return (
    <Layout>
      <div>
        <h1>Insira todos os dados</h1>
        <CompanyForm formData={formData} onChange={handleChange} />
        <Button onClick={handleCreate}>Criar Empresa</Button>
      </div>
    </Layout>
  );
};

export default AddCompany;
