type ErrorMessageProps = {
  error: string | null;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return error ? <div className="error-message">{error}</div> : null;
};

export default ErrorMessage;
