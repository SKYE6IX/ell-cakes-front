import ErrorFolderIcon from "../icons/ErrorFolderIcon";
import "./error-display.scss";

type ErrorDisplayProps = {
  reset: () => void;
};

function ErrorDisplay({ reset }: ErrorDisplayProps) {
  return (
    <div className="error-display">
      <ErrorFolderIcon />
      <h3 className="error-display__title">Что-то пошло не так</h3>
      <p aria-live="polite" className="error-display__message">
        Иногда такое случается. Обновите страницу или загляните чуть позже
      </p>
      <button onClick={reset} className="error-display__button">
        Повторить попытку
      </button>
    </div>
  );
}

export default ErrorDisplay;
