import React, { useState } from "react";
import CompanyForm from "../../components/form/Form";
import Layout from "../../components/layout/Layout";
import { Button } from "../../components/button/Button";
import {
  isValidClientName,
  isValidPassword,
  isValidCompanyName,
  isValidCnpj,
  isValidCep,
  isValidAddress,
  isValidNumber,
  isValidPhone,
  isValidEmail,
} from "../../utils/validations";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import "./AddCompany.style.less";

const AddCompany = () => {
  const navigate = useNavigate();

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

  const handleBack = () => {
    navigate(routes.home);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreate = () => {
    if (
      isValidClientName(formData.client_name) &&
      isValidPassword(formData.client_password) &&
      isValidCompanyName(formData.company_name) &&
      isValidCnpj(formData.company_cnpj) &&
      isValidCep(formData.company_zip_code) &&
      isValidAddress(formData.company_address) &&
      isValidNumber(formData.company_number) &&
      isValidPhone(formData.company_phone) &&
      isValidEmail(formData.company_email)
    ) {
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
    }
  };

  return (
    <Layout>
      <div>
        <h1>Insira todos os dados</h1>
        <CompanyForm formData={formData} onChange={handleChange} />
        <div className="boxButtons">
          <Button onClick={handleBack}>Voltar</Button>
          <Button onClick={handleCreate}>Criar Empresa</Button>
        </div>
      </div>
    </Layout>
  );
};

export default AddCompany;
