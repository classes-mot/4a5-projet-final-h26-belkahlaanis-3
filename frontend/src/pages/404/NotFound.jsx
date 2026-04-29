import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>404</h1>
      <p>Page non trouvée</p>
      <button type="button" onClick={() => navigate("/")}>
        Retour à l'accueil
      </button>
    </div>
  );
}
