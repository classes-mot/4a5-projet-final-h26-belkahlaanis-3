import "./buildCard.css";
export default function BuildCard({ nomBuild, estPrivee }) {
  return (
    <div className="build-card">
      <p className="build-card-name">{nomBuild}</p>
      <div className="build-card-actions">
        {estPrivee && <button className="btn">Supprimer</button>}
        <button className="btn">Acceder</button>
      </div>
    </div>
  );
}
