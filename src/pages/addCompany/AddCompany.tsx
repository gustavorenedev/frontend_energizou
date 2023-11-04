import React, { useState } from "react";
import CompanyForm from "../../components/form/Form";
import Layout from "../../components/layout/Layout";
import { Button } from "../../components/button/Button";
import { validateForm } from "../../utils/validationsErrors";
import ErrorMessage from "../../components/errorMessage/errorMessage";
import { checkExistingCnpj } from "../../api/service/checkCnpj";
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

  const [formErrors, setFormErrors] = useState({
    client_name: null,
    client_password: null,
    company_name: null,
    company_cnpj: null,
    company_zip_code: null,
    company_address: null,
    company_number: null,
    company_phone: null,
    company_email: null,
  });

  const [cnpjError, setCnpjError] = useState<string | null>(null);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleBack = () => {
    navigate(routes.home);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "company_cnpj") {
      setCnpjError(null);
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const errors = validateForm(formData);

    setFormErrors(errors);

    if (Object.values(errors).every((error) => error === null)) {
      const cnpjExists = await checkExistingCnpj(formData.company_cnpj);

      if (cnpjExists) {
        setCnpjError("CNPJ já existe, por favor, escolha outro.");
      } else {
        try {
          const response = await fetch("http://localhost:3000/companies", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          if (response.ok) {
            setSuccessMessage("Empresa cadastrada com sucesso.");
            setFormData({
              // Limpe os campos após o sucesso
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
          } else {
            console.error("Erro na solicitação POST");
          }
        } catch (error) {
          console.error("Erro na solicitação POST", error);
        }
      }
    }
  };

  return (
    <Layout>
      <div>
        <h1>Insira todos os dados</h1>
        <CompanyForm formData={formData} onChange={handleChange} />
        <ErrorMessage error={formErrors.client_name} />
        <ErrorMessage error={formErrors.client_password} />
        <ErrorMessage error={formErrors.company_name} />
        <ErrorMessage error={formErrors.company_cnpj} />
        <ErrorMessage error={formErrors.company_zip_code} />
        <ErrorMessage error={formErrors.company_address} />
        <ErrorMessage error={formErrors.company_number} />
        <ErrorMessage error={formErrors.company_phone} />
        <ErrorMessage error={formErrors.company_email} />
        <ErrorMessage error={cnpjError} />
        {successMessage && <p>{successMessage}</p>}
        <div className="boxButtons">
          <Button onClick={handleBack}>Voltar</Button>
          <Button onClick={handleSubmit}>Criar Empresa</Button>
        </div>
      </div>
    </Layout>
  );
};

export default AddCompany;
