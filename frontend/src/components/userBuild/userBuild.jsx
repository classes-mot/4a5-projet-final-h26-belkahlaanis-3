import { useNavigate } from "react-router-dom";
import BuildCardInfo from "../BuildCardInfo/buildCardInfo";
import BuildListBox from "../buildListBox/buildListbox";
import { useEffect, useState } from "react";
import BuildCardConteneur from "../BuildCardConteneur/buildCardContenuer";

export default function UserBuild() {
  const navigate = useNavigate();
  const typeEquipements = ["Helm", "Chest Armor", "Leg Armor", "Gauntlets"];
  const typeArtefacts = ["artefact1", "artefact2", "artefact3", "artefact4"];
  const typeStats = ["hp", "fp", "end", "str", "dex", "int", "faith", "arc"];
  const [items, setItems] = useState(null);
  const [page, setPage] = useState(0);
  useEffect(() => {
    const sendRequest = async () => {
      try {
        const url = "http://localhost:5000/api/item/armures/" + page;
        const reponse = await fetch(url);
        if (!reponse.ok) {
          throw new Error("erreur survenue");
        }
        new Error("erreur survenue");

        const reponseData = await reponse.json();
        setItems(reponseData.armures.data);
      } catch (erreur) {
        console.log(erreur);
      }
    };

    sendRequest();
  }, [page]);

  if (!items) return <p>Loading...</p>;
  return (
    <div>
      <button onClick={() => navigate("/menu")}>Quitter</button>
      <h1>titre</h1>
      <h2>Equipement </h2>
      {typeEquipements.map((typeE) => (
        <div key={typeE}>
          <BuildCardConteneur type={typeE} />
        </div>
      ))}
      <h2>Artefacs</h2>
      {typeArtefacts.map((typeA) => (
        <div key={typeA}>
          <BuildCardConteneur type={"Talisment"} />
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
          <div key={item.name}>
            <BuildCardInfo
              type={item.category}
              objet={item}
              img={`/assets/${item.name}.png`}
            />
          </div>
        ))}
      </BuildListBox>
      <button
        onClick={() => {
          if (page === 0) {
            console.log("minimum atteint");
          } else {
            setPage(page - 1);
          }
        }}
      >
        Avant
      </button>
      <button
        onClick={() => {
          setPage(page + 1);
        }}
      >
        Suivant
      </button>
      <button>Enregistrer</button>
      <button>Rendre public</button>
    </div>
  );
}
