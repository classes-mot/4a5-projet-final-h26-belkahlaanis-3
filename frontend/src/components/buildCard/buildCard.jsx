export default function BuildCard({nomBuild,estPrivee}) {
  return (
    <div>
      <p>{nomBuild}</p>
      {estPrivee && <button>Supprimer</button>}
      <button>Acceder</button>
    </div>
  );
}
