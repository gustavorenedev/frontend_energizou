// Componente de exibição de mensagens de erro
type ErrorMessageProps = {
  error: string | null; // Mensagem de erro (pode ser nula)
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return error ? <div className="error-message">{error}</div> : null;
};

export default ErrorMessage;
