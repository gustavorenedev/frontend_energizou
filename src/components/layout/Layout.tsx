import Footer from "../footer/Footer";
import Header from "../header/Header";
import './Layout.style.less'

// Propriedades para o componente de layout
interface LayoutProps {
  children: React.ReactNode; // Conteúdo da página
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <div className="elementMain">
        <div className="layoutContainer">{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
