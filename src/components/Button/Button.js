import "./Button.scss";

// Composant Button
export function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="Button">
      {children}
    </button>
  );
}
