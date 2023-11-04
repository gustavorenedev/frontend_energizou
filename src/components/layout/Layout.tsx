import Footer from "../footer/Footer";
import Header from "../header/Header";
import './Layout.style.less'

interface LayoutProps {
  children: React.ReactNode;
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
