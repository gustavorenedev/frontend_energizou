import logo from "../../assets/energizouLogo.png";
import "./Header.style.less";

// Componente de cabeçalho da página
const Header = () => {
  return (
    <div className="elementHeader">
      <div className="headerContainer">
        <h1>CRUD de Empresas</h1>
        <img src={logo} alt="Logo da Empresa" />
      </div>
    </div>
  );
};

export default Header;
