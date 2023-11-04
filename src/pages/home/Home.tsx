import { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import { Button } from "../../components/button/Button";
import Layout from "../../components/layout/Layout";
import "./Home.style.less";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";

export default function Home() {
  const navigate = useNavigate();
  const [companyList, setCompanyList] = useState([]);

  const handleAddCompany = () => {
    navigate(routes.add_company);
  };

  const getCompanies = async () => {
    try {
      const response = await fetch("http://localhost:3000/companies");
      const data = await response.json();
      setCompanyList(data);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  const handleDeleteCompany = async (companyId: number) => {
    try {
      await fetch(`http://localhost:3000/companies/${companyId}`, {
        method: "DELETE",
      });

      getCompanies();
    } catch (error) {
      console.log(`Error deleting company: ${error}`);
    }
  };

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <Layout>
      <section className="contentContainer">
        <div className="contentMain">
          <h2>Tabela de empresas</h2>
          <Button onClick={handleAddCompany}>Adicionar uma empresa</Button>
        </div>

        <Table list={companyList} onDeleteCompany={handleDeleteCompany} />
      </section>
    </Layout>
  );
}
