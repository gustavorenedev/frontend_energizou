import React, { useState } from "react";
import { Button } from "../button/Button";
import { ICompany } from "../companyPreview/companyPreview";
import "./modalUpdate.style.less";
import CompanyForm from "../form/Form";
import { updateCompany } from "../../api/service/fetchApis";
import { validateForm } from "../../utils/validationsErrors";
import ErrorMessage from "../errorMessage/errorMessage";

type EditCompanyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  company: ICompany;
  onUpdateCompany: (updatedCompany: ICompany) => void;
};

const EditCompanyModal: React.FC<EditCompanyModalProps> = ({
  isOpen,
  onClose,
  company,
  onUpdateCompany,
}) => {
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
  const [formErrors, setFormErrors] = useState({
    ...initialFormData,
  });
  const [editedCompany, setEditedCompany] = useState({ ...company });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleEdit = async () => {
    const errors = validateForm(editedCompany);

    if (Object.values(errors).some((error) => error !== null)) {
      setFormErrors(errors);
      setSuccessMessage(null);
      return;
    }

    // Caso não haja erros, prossiga com a edição
    try {
      const updatedData = await updateCompany(editedCompany); // Chama o serviço de API para atualizar a empresa

      onUpdateCompany(updatedData); // Atualize a empresa na lista local com os dados atualizados da API
      setSuccessMessage("Empresa atualizada com sucesso."); // Defina a mensagem de sucesso
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      console.error("Erro na solicitação PUT", error);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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
        <Button onClick={handleEdit}>Salvar</Button>
        <Button onClick={onClose}>Cancelar</Button>
      </div>
    </div>
  );
};

export default EditCompanyModal;
