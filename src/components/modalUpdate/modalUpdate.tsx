import React, { useState } from "react";
import { Button } from "../button/Button";
import { ICompany } from "../companyPreview/companyPreview";
import "./modalUpdate.style.less";
import CompanyForm from "../form/Form";
import { checkExistingCnpj, updateCompany } from "../../api/service/fetchApis";
import { validateForm } from "../../utils/validationsErrors";
import ErrorMessage from "../errorMessage/errorMessage";

// Props para o componente EditCompanyModal
type EditCompanyModalProps = {
  isOpen: boolean; // Define se o modal de edição está aberto
  onClose: () => void; // Função para fechar o modal
  company: ICompany; // Empresa a ser editada
  onUpdateCompany: (updatedCompany: ICompany) => void; // Função para atualizar a empresa
};

// Componente de modal para edição de empresa
const EditCompanyModal: React.FC<EditCompanyModalProps> = ({
  isOpen,
  onClose,
  company,
  onUpdateCompany,
}) => {
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

  // Estado para controlar os erros do formulário
  const [formErrors, setFormErrors] = useState({
    ...initialFormData,
  });

  // Estado para armazenar os dados da empresa em edição
  const [editedCompany, setEditedCompany] = useState({ ...company });

  // Estado para exibir uma mensagem de sucesso
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Estado para armazenar o CNPJ da empresa
  const [companyCnpj, setCompanyCnpj] = useState<string>("");

  // Estado para armazenar o ID da empresa
  const [companyId, setCompanyId] = useState<number>(0);

  // Função para lidar com a edição da empresa
  const handleEdit = async () => {
    // Atualiza o CNPJ e o ID da empresa
    setCompanyCnpj(company.company_cnpj);
    setCompanyId(company.id);

    // Valida o formulário
    const errors = validateForm(editedCompany);

    // Verifica se há erros no formulário
    if (Object.values(errors).some((error) => error !== null)) {
      setFormErrors(errors);
      setSuccessMessage(null);
      return;
    }

    try {
      // Realiza a atualização da empresa
      const updatedData = await updateCompany(editedCompany);

      // Chama a função de atualização da empresa no componente pai
      onUpdateCompany(updatedData);

      // Exibe uma mensagem de sucesso e fecha o modal após um segundo
      setSuccessMessage("Empresa atualizada com sucesso.");
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      console.error("Erro na solicitação PUT", error);
    }
  };

  // Função para renderizar mensagens de erro
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

  // Função para lidar com a alteração de campos de entrada
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "company_cnpj" && companyId !== 1) {
      if (value !== companyCnpj) {
        // Verifica se o CNPJ já existe
        checkExistingCnpj(value).then((cnpjExists) => {
          if (cnpjExists) {
            setFormErrors({
              ...formErrors,
              [name]: "CNPJ já existe, por favor, escolha outro.",
            });
          } else {
            setFormErrors({
              ...formErrors,
              [name]: null,
            });
          }
        });
      }
    }

    // Atualiza os dados da empresa em edição
    setEditedCompany({
      ...editedCompany,
      [name]: value,
    });
  };

  return (
    <div className={`edit-company-modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2>Editar Empresa</h2>
        <CompanyForm formData={editedCompany} onChange={handleInputChange} />
        {renderErrorMessages()}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        <div className="boxButtons">
          <Button onClick={handleEdit}>Salvar</Button>
          <Button onClick={onClose}>Cancelar</Button>
        </div>
      </div>
    </div>
  );
};

export default EditCompanyModal;
