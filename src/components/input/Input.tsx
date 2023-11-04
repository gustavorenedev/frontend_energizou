import "./Input.style.less";

interface InputProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  id?: string;
  value?: string;
  onChange?: React.ReactEventHandler;
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
      <label htmlFor={name}>{label}</label>
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
