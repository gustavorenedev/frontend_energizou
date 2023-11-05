import React, { useState } from "react";
import CompanyForm from "../../components/form/Form";
import Layout from "../../components/layout/Layout";
import { Button } from "../../components/button/Button";
import { validateForm } from "../../utils/validationsErrors";
import ErrorMessage from "../../components/errorMessage/errorMessage";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import "./AddCompany.style.less";
import { createCompany, checkExistingCnpj } from "../../api/service/fetchApis";

const AddCompany = () => {
  const navigate = useNavigate();

  const initialFormData = {
    client_name: "",
    client_password: "",
    company_name: "",
    company_cnpj: "",
    company_zip_code: "",
    company_address: "",
    company_number: "",
    company_phone: "",
    company_email: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({
    ...initialFormData,
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
      try {
        const cnpjExists = await checkExistingCnpj(formData.company_cnpj);

        if (cnpjExists) {
          setCnpjError("CNPJ já existe, por favor, escolha outro.");
        } else {
          const successMessage = await createCompany(formData);
          setSuccessMessage(successMessage);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const renderErrorMessages = () => {
    const errorFields = [
      "client_name",
      "client_password",
      "company_name",
      "company_cnpj",
      "company_zip_code",
      "company_address",
      "company_number",
      "company_phone",
      "company_email",
    ];

    return errorFields.map((field) => (
      <ErrorMessage key={field} error={formErrors[field]} />
    ));
  };

  return (
    <Layout>
      <div>
        <h1>Insira todos os dados</h1>
        <CompanyForm formData={formData} onChange={handleChange} />
        {renderErrorMessages()}
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
