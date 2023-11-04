import React, { useState } from "react";
import { Button } from "../button/Button";
import Modal from "../modal/CompanyModal";
import { ICompany } from "../companyPreview/companyPreview";
import "./Table.style.less";

type Props = {
  list: ICompany[];
  onDeleteCompany: (companyId: number) => void;
};

const Table: React.FC<Props> = ({ list, onDeleteCompany }) => {
  const [selectedCompany, setSelectedCompany] = useState<ICompany | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = (companyId: number) => {
    if (window.confirm("Tem certeza de que deseja excluir esta empresa?")) {
      onDeleteCompany(companyId);
    }
  };

  const handleViewClick = (company: ICompany) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  return (
    <div className="table-container">
      {list.length === 0 ? (
        <div>Não há nenhuma empresa. Clique em adicionar uma empresa</div>
      ) : (
        <table className="custom-table">
          <tbody>
            {list.map((company) => (
              <tr key={company.id}>
                <td>{company.id}</td>
                <td>{company.client_name}</td>
                <td>{company.company_name}</td>
                <td>{company.company_cnpj}</td>
                <td>
                  <div className="button-container">
                    <Button onClick={() => handleViewClick(company)}>
                      Ver
                    </Button>
                    <Button onClick={() => console.log("Edit")}>Editar</Button>
                    <Button onClick={() => handleDeleteClick(company.id)}>
                      Deletar
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        company={selectedCompany}
      />
    </div>
  );
};

export default Table;
