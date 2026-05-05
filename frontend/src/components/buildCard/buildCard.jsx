import "./buildCard.css";
export default function BuildCard({ nomBuild, estPrivee, supprimer, acceder }) {
  return (
    <div className="build-card">
      <p className="build-card-name">{nomBuild}</p>
      <div className="build-card-actions">
        {estPrivee && (
          <button className="btn" onClick={supprimer}>
            Supprimer
          </button>
        )}
        <button className="btn" onClick={acceder}>
          Acceder
        </button>
      </div>
    </div>
  );
}
