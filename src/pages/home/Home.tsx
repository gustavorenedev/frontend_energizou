import { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import { Button } from "../../components/button/Button";
import Layout from "../../components/layout/Layout";
import "./Home.style.less";

export default function Home() {
  const [companyList, setCompanyList] = useState([]);

  const getCompanies = async () => {
    try {
      const response = await fetch("http://localhost:3000/companies");
      const data = await response.json();
      setCompanyList(data);
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <div>
      <Layout>
        <section className="contentContainer">
          <div className="contentMain">
            <h2>Tabela de empresas</h2>
            <Button onClick={() => {}}>Adicionar uma empresa</Button>
          </div>

          <Table list={companyList} />
        </section>
      </Layout>
    </div>
  );
}
