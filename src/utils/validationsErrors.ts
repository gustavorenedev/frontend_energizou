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
} from "./validations";

type ValidationErrors = {
  client_name: string | null;
  client_password: string | null;
  company_name: string | null;
  company_cnpj: string | null;
  company_zip_code: string | null;
  company_address: string | null;
  company_number: string | null;
  company_phone: string | null;
  company_email: string | null;
};

export const validateForm = (formData: any): ValidationErrors => {
  const errors = {
    client_name: isValidClientName(formData.client_name),
    client_password: isValidPassword(formData.client_password),
    company_name: isValidCompanyName(formData.company_name),
    company_cnpj: isValidCnpj(formData.company_cnpj),
    company_zip_code: isValidCep(formData.company_zip_code),
    company_address: isValidAddress(formData.company_address),
    company_number: isValidNumber(formData.company_number),
    company_phone: isValidPhone(formData.company_phone),
    company_email: isValidEmail(formData.company_email),
  };

  return errors;
};
