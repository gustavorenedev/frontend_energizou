import "./Input.style.less";

// Propriedades para o componente de entrada de dados
interface InputProps {
  label: string; // Rótulo para a entrada
  type: string; // Tipo de entrada (por exemplo, text, password, etc.)
  name: string; // Nome da entrada
  id?: string; // ID da entrada (opcional)
  value?: string; // Valor da entrada
  placeholder: string; // Texto de espaço reservado
  onChange?: React.ReactEventHandler; // Manipulador de evento de mudança
}

const Input = ({
  label,
  type,
  name,
  id,
  value,
  placeholder,
  onChange,
}: InputProps) => {
  return (
    <div className="input-container">
      <label htmlFor={name}>{label}</label>{/* Rótulo da entrada */}
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
