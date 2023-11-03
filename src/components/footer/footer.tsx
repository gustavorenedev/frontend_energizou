import logoLinkedin from "../../assets/linkedinIcon.png";
import logoGithub from "../../assets/githubIcon.png";
import "./Footer.style.less";

const Footer = () => {
  return (
    <div className="elementFooter">
      <div className="footerContainer">
        <p>Desenvolvido por: Gustavo René</p>
        <div className="footerBox">
          <a
            href="https://www.linkedin.com/in/gustavo-rene-dias/"
            target="_blank"
          >
            <img src={logoLinkedin} alt="Logo linkedin" />
          </a>
          <a href="https://github.com/gustavorenedev" target="_blank">
            <img src={logoGithub} alt="Logo github" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
