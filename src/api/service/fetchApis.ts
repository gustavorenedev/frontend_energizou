import { cleanCnpj } from "../../utils/validations";

const apiUrl = import.meta.env.VITE_API_URL;

export async function getCompanies() {
  try {
    const response = await fetch(`${apiUrl}/companies`);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Erro na solicitação GET");
    }
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

export async function deleteCompany(companyId: number) {
  try {
    const response = await fetch(`${apiUrl}/companies/${companyId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Erro na solicitação DELETE");
    }
  } catch (error) {
    throw new Error(`Error deleting company: ${error}`);
  }
}

export async function updateCompany(company: any) {
  try {
    const response = await fetch(`${apiUrl}/companies/${company.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(company),
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Erro na solicitação PUT");
    }
  } catch (error) {
    throw new Error(`Error updating company: ${error}`);
  }
}

export async function createCompany(formData: any): Promise<string> {
  try {
    const response = await fetch(`${apiUrl}/companies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      return "Empresa cadastrada com sucesso.";
    } else {
      throw new Error("Erro na solicitação POST");
    }
  } catch (error) {
    throw new Error(`Erro na solicitação POST: ${error}`);
  }
}

export const checkExistingCnpj = async (cnpj: string) => {
  try {
    const cnpjClean = cleanCnpj(cnpj);
    const response = await fetch(`${apiUrl}/companies/${cnpjClean}`);

    if (response.status === 404) {
      return false;
    }

    const data = await response.json();

    return typeof data === "object" && Object.keys(data).length > 0;
  } catch (error) {
    console.error(`Erro ao verificar CNPJ existente: ${error}`);
    return false;
  }
};
