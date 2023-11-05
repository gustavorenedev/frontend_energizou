import { Button } from "../button/Button";
import { ICompany } from "../companyPreview/companyPreview";
import "./CompanyModal.style.less";

// Propriedades para o componente modal
type ModalProps = {
  isOpen: boolean; // Define se o modal está aberto ou fechado
  onClose: () => void; // Função para fechar o modal
  company: ICompany; // Dados da empresa a ser exibida
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, company }) => {
  if (!isOpen) {
    return null; // Não renderizar nada se o modal estiver fechado
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Detalhes da Empresa</h2>
        <div className="modal-itens">
          <div>ID: {company.id}</div>
          <div>Cliente: {company.client_name}</div>
          <div>Razão: {company.company_name}</div>
          <div>CNPJ: {company.company_cnpj}</div>
          <div>CEP: {company.company_zip_code}</div>
          <div>Endereço: {company.company_address}</div>
          <div>Número: {company.company_number}</div>
          <div>Telefone: {company.company_phone}</div>
          <div>E-mail: {company.company_email}</div>
        </div>

        <Button onClick={onClose}>Fechar</Button>
      </div>
    </div>
  );
};

export default Modal;
