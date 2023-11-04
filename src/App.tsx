import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddCompany from "./pages/addCompany/AddCompany";
import Home from "./pages/home/Home";
import { routes } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.add_company} element={<AddCompany />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
