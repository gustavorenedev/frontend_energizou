import React, { useState } from "react";
import { Button } from "../button/Button";
import { ICompany } from "../companyPreview/companyPreview";
import "./modalUpdate.style.less";
import CompanyForm from "../form/Form";
import { checkExistingCnpj, updateCompany } from "../../api/service/fetchApis";
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
  const [companyCnpj, setCompanyCnpj] = useState<string>("");
  const [companyId, setCompanyId] = useState<number>(0);

  const handleEdit = async () => {
    setCompanyCnpj(company.company_cnpj);
    setCompanyId(company.id);
    const errors = validateForm(editedCompany);

    if (Object.values(errors).some((error) => error !== null)) {
      setFormErrors(errors);
      setSuccessMessage(null);
      return;
    }

    try {
      const updatedData = await updateCompany(editedCompany);

      onUpdateCompany(updatedData);
      setSuccessMessage("Empresa atualizada com sucesso.");
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

    if (name === "company_cnpj" && companyId !== 1) {
      if (value !== companyCnpj) {
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
