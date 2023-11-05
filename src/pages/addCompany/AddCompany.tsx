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

// Componente para adicionar uma nova empresa
const AddCompany = () => {
  const navigate = useNavigate();

  // Dados iniciais do formulário
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

  const [formData, setFormData] = useState(initialFormData); // Estado para os dados do formulário
  const [formErrors, setFormErrors] = useState({
    ...initialFormData,
  }); // Estado para erros do formulário
  const [cnpjError, setCnpjError] = useState<string | null>(null); // Estado para erros relacionados ao CNPJ
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Estado para mensagens de sucesso

  const handleBack = () => {
    // Redireciona de volta para a página inicial
    navigate(routes.home);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "company_cnpj") {
      // Limpa os erros relacionados ao CNPJ quando o campo é alterado
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
          // Define um erro se o CNPJ já existir
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
    // Renderiza mensagens de erro para campos específicos
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
