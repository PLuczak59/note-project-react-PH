import "./Button.scss";

export function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="Button">
      {children}
    </button>
  );
}
