import { Button } from "../button/Button";
import { ICompany } from "../companyPreview/companyPreview";
import "./Table.style.less";

type Props = {
  list: ICompany[];
};

const Table = (props: Props) => {
  const { list } = props;
  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Razão</th>
            <th>CNPJ</th>
            <th>Actions</th>
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
                  <Button onClick={() => console.log("View")}>View</Button>
                  <Button onClick={() => console.log("Edit")}>Edit</Button>
                  <Button onClick={() => console.log("Delete")}>Delete</Button>
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
