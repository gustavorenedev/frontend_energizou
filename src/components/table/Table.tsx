import React, { useState } from "react";
import { Button } from "../button/Button";
import Modal from "../modal/CompanyModal";
import EditCompanyModal from "../../components/modalUpdate/modalUpdate"; // Importe o modal de edição
import { ICompany } from "../companyPreview/companyPreview";
import "./Table.style.less";
import Input from "../input/Input";

// Props para o componente Table
type Props = {
  list: ICompany[]; // Lista de empresas a ser exibida na tabela
  onDeleteCompany: (companyId: number) => void; // Função para excluir uma empresa
};

// Componente de tabela que exibe a lista de empresas
const Table: React.FC<Props> = ({ list, onDeleteCompany }) => {
  // Estados para controlar a empresa selecionada, a abertura do modal de visualização e a abertura do modal de edição
  const [selectedCompany, setSelectedCompany] = useState<ICompany | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [cnpjFilter, setCnpjFilter] = useState<string>(""); // Estado para filtrar a lista de empresas

  const handleUpdateCompany = () => {
    // Implemente a lógica para atualizar uma empresa aqui
  };

  const handleEdit = (company: ICompany) => {
    // Abre o modal de edição com os detalhes da empresa selecionada
    setSelectedCompany(company);
    setIsUpdateModalOpen(true);
  };

  const handleDeleteClick = (companyId: number) => {
    if (window.confirm("Tem certeza de que deseja excluir esta empresa?")) {
      // Chama a função de exclusão da empresa
      onDeleteCompany(companyId);
    }
  };

  const handleViewClick = (company: ICompany) => {
    // Abre o modal de visualização com os detalhes da empresa selecionada
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  // Filtra a lista de empresas com base no CNPJ inserido
  const filteredCompanies = list.filter((company) =>
    company.company_cnpj.includes(cnpjFilter)
  );

  return (
    <div className="table-container">
      <Input
        label="Busque a empresa pelo CNPJ"
        type="text"
        name="cpnj"
        placeholder="Insira o CNPJ"
        value={cnpjFilter}
        onChange={(e) => setCnpjFilter(e.target.value)}
      />
      {filteredCompanies.length === 0 ? (
        <div>Não há nenhuma empresa. Clique em adicionar uma empresa</div>
      ) : (
        <table className="custom-table">
          <tbody>
            {filteredCompanies.map((company) => (
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
                    <Button onClick={() => handleEdit(company)}>Editar</Button>
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
      {isUpdateModalOpen && (
        <EditCompanyModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          company={selectedCompany as ICompany}
          onUpdateCompany={handleUpdateCompany}
        />
      )}
    </div>
  );
};

export default Table;
