import { cleanCnpj } from "../../utils/validations";

export const checkExistingCnpj = async (cnpj: string) => {
  try {
    const cnpjClean = cleanCnpj(cnpj);
    const response = await fetch(
      `http://localhost:3000/companies/${cnpjClean}`
    );

    if (response.status === 404) {
      // CNPJ não encontrado
      return false;
    }

    const data = await response.json();

    return typeof data === "object" && Object.keys(data).length > 0;
  } catch (error) {
    console.error(`Erro ao verificar CNPJ existente: ${error}`);
    return false;
  }
};
