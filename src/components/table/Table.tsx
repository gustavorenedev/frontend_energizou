import { Button } from "../button/Button";
import { ICompany } from "../companyPreview/companyPreview";
import "./Table.style.less";

type Props = {
  list: ICompany[];
};

const Table = (props: Props) => {
  const { list } = props;

  if (list.length === 0) {
    return <div>Você não possui uma empresa ainda. Deseja criar uma?</div>;
  }

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Razão</th>
            <th>CNPJ</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {list.map((company) => (
            <tr key={company.id}>
              <td>{company.id}</td>
              <td>{company.client_name}</td>
              <td>{company.company_name}</td>
              <td>{company.company_cnpj}</td>
              <td>
                <div className="button-container">
                  <Button onClick={() => console.log("View")}>Ver</Button>
                  <Button onClick={() => console.log("Edit")}>Editar</Button>
                  <Button onClick={() => console.log("Delete")}>Deletar</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
