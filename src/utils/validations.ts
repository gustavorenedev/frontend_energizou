// Função que valida se o nome do cliente é preenchido
export const isValidClientName = (name: string): string | null => {
  if (name.trim() === "") {
    return "Nome do Cliente é obrigatório.";
  }
  return null;
};

// Função que valida se a senha tem pelo menos 6 caracteres
export const isValidPassword = (password: string): string | null => {
  if (password.length < 6) {
    return "A senha deve ter pelo menos 6 caracteres.";
  }
  return null;
};

// Função que valida se o nome da empresa (Razão Social) é preenchido
export const isValidCompanyName = (name: string): string | null => {
  if (name.trim() === "") {
    return "Nome da empresa (Razão Social) é obrigatório.";
  }
  return null;
};

// Função que valida o formato do CNPJ
export const isValidCnpj = (cnpj: string): string | null => {
  const cnpjPattern = /^[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}-[0-9]{2}$/;
  if (!cnpjPattern.test(cnpj)) {
    return "CNPJ inválido. Deve seguir o formato XX.XXX.XXX/XXXX-XX";
  }
  return null;
};

// Função que valida o formato do CEP
export const isValidCep = (cep: string): string | null => {
  const cepPattern = /^[0-9]{5}-[0-9]{3}$/;
  if (!cepPattern.test(cep)) {
    return "CEP inválido. Deve seguir o formato XXXXX-XXX";
  }
  return null;
};

// Função que valida se o endereço é preenchido
export const isValidAddress = (address: string): string | null => {
  if (address.trim() === "") {
    return "Endereço é obrigatório.";
  }
  return null;
};

// Função que valida o número do endereço
export const isValidNumber = (number: string): string | null => {
  const numberPattern = /^[1-9][0-9]{0,3}$/;
  if (!numberPattern.test(number)) {
    return "Número inválido. Deve ser um número inteiro válido e até 10.";
  }
  return null;
};

// Função que valida o formato do telefone
export const isValidPhone = (phone: string): string | null => {
  const phonePattern = /^\+55\([0-9]{2}\)[0-9]{5}-[0-9]{4}$/;
  if (!phonePattern.test(phone)) {
    return "Telefone inválido. Deve seguir o formato +55(XX)XXXXX-XXXX";
  }
  return null;
};

// Função que valida o formato do email
export const isValidEmail = (email: string): string | null => {
  const emailPattern = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
  if (!emailPattern.test(email)) {
    return "Email inválido. Deve seguir o formato xxxxxx@xxxx.com.";
  }
  return null;
};

// Função que remove caracteres não numéricos de um CNPJ
export const cleanCnpj = (cnpj: string): string => {
  return cnpj.replace(/[^0-9]/g, "");
};
