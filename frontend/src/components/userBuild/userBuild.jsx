import { useNavigate } from "react-router-dom";
import BuildCardInfo from "../BuildCardInfo/buildCardInfo";
import BuildListBox from "../buildListBox/buildListbox";
import { useEffect, useState } from "react";
import { Draggable } from "react-drag-and-drop";

export default function UserBuild() {
  const navigate = useNavigate();
  const typeEquipements = ["casque", "plastron", "pantalon", "botte"];
  const typeArtefacts = ["artefact1", "artefact2", "artefact3", "artefact4"];
  const typeStats = ["hp", "fp", "end", "str", "dex", "int", "faith", "arc"];
  const [items, setItems] = useState(null);
  useEffect(() => {
    const sendRequest = async () => {
      try {
        const reponse = await fetch("http://localhost:5000/api/item/armures");
        const reponse2 = await fetch(
          "http://localhost:5000/api/item/talisments",
        );
        if (!reponse.ok) {
          throw new Error("erreur survenue");
        }
        if (!reponse2.ok) {
          throw new Error("erreur survenue");
        }
        const reponseData = await reponse.json();
        const reponseData2 = await reponse2.json();
        setItems([...reponseData.armures, ...reponseData2.data]);
      } catch (erreur) {
        console.log(erreur);
      }
    };

    sendRequest();
  }, []);

  if (!items) return <p>Loading...</p>;
  return (
    <div>
      <button onClick={() => navigate("/menu")}>Quitter</button>
      <h1>titre</h1>
      <h2>Equipement </h2>
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
      <BuildListBox>
        {items.map((item) => (
          <div key={item.id}>
            <Draggable>{item.name}</Draggable>
          </div>
        ))}
      </BuildListBox>
      <button>Enregistrer</button>
      <button>Rendre public</button>
    </div>
  );
}
