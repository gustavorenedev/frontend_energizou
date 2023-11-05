import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddCompany from "./pages/addCompany/AddCompany";
import Home from "./pages/home/Home";
import { routes } from "./routes";

function App() {
  return (
    <BrowserRouter>
      {/* Configuração das rotas da aplicação */}
      <Routes>
        {/* Rota para a página inicial (home) */}
        <Route path={routes.home} element={<Home />} />

        {/* Rota para a página de adicionar uma empresa */}
        <Route path={routes.add_company} element={<AddCompany />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
