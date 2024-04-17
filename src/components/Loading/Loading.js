import "./Loading.scss";

// Composant qui affiche un spinner de chargement
export function Loading() {
  return (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}