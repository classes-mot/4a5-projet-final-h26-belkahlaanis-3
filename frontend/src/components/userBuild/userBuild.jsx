import { useNavigate } from "react-router-dom";
import BuildCardInfo from "../BuildCardInfo/buildCardInfo";
import BuildListBox from "../buildListBox/buildListbox";

export default function UserBuild() {
  const navigate = useNavigate();
  const typeEquipements = ["casque", "plastron", "pantalon", "botte"];
  const typeArtefacts = ["artefact1", "artefact2", "artefact3", "artefact4"];
  const typeStats = ["hp", "fp", "end", "str", "dex", "int", "faith", "arc"];
  const items = [
  { id: "1", name: "Heaume de Margit", type: "casque", image: "", description: "Heaume porté par Margit le Mal Présage." },
  { id: "2", name: "Plastron de Godrick", type: "plastron", image: "", description: "Armure lourde du seigneur Godrick." },
  { id: "3", name: "Jambières de Malenia", type: "pantalon", image: "", description: "Jambières légères de la lame de Miquella." },
  { id: "4", name: "Bottes de Radahn", type: "botte", image: "", description: "Bottes massives du général des étoiles." },
  { id: "5", name: "Heaume de Rykard", type: "casque", image: "", description: "Heaume du seigneur du blasphème." },
];

  return (
    <div>
      <button onClick={() => navigate("/menu")}>Quitter</button>
      <h1>titre</h1>
      <h2>Equipement</h2>
      {typeEquipements.map((typeE) => (
        <div key={typeE}>
          <BuildCardInfo type={typeE} />
        </div>
      ))}
      <h2>Artefacs</h2>
      {typeArtefacts.map((typeA) => (
        <div key={typeA}>
          <BuildCardInfo type={typeA} />
        </div>
      ))}
      <h2>Stats</h2>
      {typeStats.map((typeS) => (
        <div key={typeS}>
          <label>
            {typeS}
            <input id={typeS} type="number" />
          </label>
        </div>
      ))}
      <h3>barre de recherche</h3>
      <div key={""}>
        <BuildListBox items={items} />
      </div>
      <button>Enregistrer</button>
      <button>Rendre public</button>
    </div>
  );
}
