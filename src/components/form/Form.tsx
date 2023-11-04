import React from "react";
import Input from "../input/Input";

type FormData = {
  client_name: string;
  client_password: string;
  company_name: string;
  company_cnpj: string;
  company_zip_code: string;
  company_address: string;
  company_number: string;
  company_phone: string;
  company_email: string;
};

type Props = {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CompanyForm: React.FC<Props> = ({ formData, onChange }) => {
  return (
    <form>
      <Input
        label="Nome do Cliente"
        type="text"
        name="client_name"
        value={formData.client_name}
        onChange={onChange}
      />
      <Input
        label="Senha do Cliente"
        type="password"
        name="client_password"
        value={formData.client_password}
        onChange={onChange}
      />
      <Input
        label="Razão Social da Empresa"
        type="text"
        name="company_name"
        value={formData.company_name}
        onChange={onChange}
      />
      <Input
        label="CNPJ da Empresa"
        type="text"
        name="company_cnpj"
        value={formData.company_cnpj}
        onChange={onChange}
      />
      <Input
        label="CEP da Empresa"
        type="text"
        name="company_zip_code"
        value={formData.company_zip_code}
        onChange={onChange}
      />
      <Input
        label="Endereço da Empresa"
        type="text"
        name="company_address"
        value={formData.company_address}
        onChange={onChange}
      />
      <Input
        label="Número da Empresa"
        type="text"
        name="company_number"
        value={formData.company_number}
        onChange={onChange}
      />
      <Input
        label="Telefone da Empresa"
        type="text"
        name="company_phone"
        value={formData.company_phone}
        onChange={onChange}
      />
      <Input
        label="Email da Empresa"
        type="email"
        name="company_email"
        value={formData.company_email}
        onChange={onChange}
      />
    </form>
  );
};

export default CompanyForm;
