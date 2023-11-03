import { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Table from "../../components/table/Table";

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
      <Header />
      <section className="contentContainer">
        <h2>Tabela de empresas</h2>
        <Table list={companyList} />
      </section>
      <Footer />
    </div>
  );
}
