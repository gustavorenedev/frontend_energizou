import { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import { Button } from "../../components/button/Button";
import Layout from "../../components/layout/Layout";
import "./Home.style.less";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { getCompanies, deleteCompany } from "../../api/service/fetchApis";

export default function Home() {
  const navigate = useNavigate();
  const [companyList, setCompanyList] = useState([]);

  const handleAddCompany = () => {
    navigate(routes.add_company);
  };

  const handleDeleteCompany = async (companyId) => {
    try {
      await deleteCompany(companyId);
      getCompanyList();
    } catch (error) {
      console.log(`Error deleting company: ${error}`);
    }
  };

  const getCompanyList = async () => {
    try {
      const data = await getCompanies();
      setCompanyList(data);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  useEffect(() => {
    getCompanyList();
  }, [companyList]);

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
