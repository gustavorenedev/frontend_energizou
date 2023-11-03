import "./Button.style.less";

interface ButtonProps {
  children: React.ReactNode;
  link?: string;
  onClick: React.ReactEventHandler;
}

export const Button = ({ children, link, onClick, ...rest }: ButtonProps) => {
  return (
    <button className="button" link={link} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};
