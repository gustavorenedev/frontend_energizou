import "./Button.style.less";

// Definição das propriedades que o botão irá receber
interface ButtonProps {
  children: React.ReactNode; // Conteúdo interno do botão
  link?: string; // URL opcional para redirecionar
  onClick: React.ReactEventHandler; // Manipulador de evento de clique
}

// Componente de botão reutilizável
export const Button = ({ children, link, onClick, ...rest }: ButtonProps) => {
  return (
    <button className="button" link={link} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};
