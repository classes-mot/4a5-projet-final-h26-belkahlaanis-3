import { useNavigate, useParams } from "react-router-dom";
import BuildCardInfo from "../BuildCardInfo/buildCardInfo";
import BuildListBox from "../buildListBox/buildListbox";
import { useContext, useEffect, useState } from "react";
import BuildCardConteneur from "../BuildCardConteneur/buildCardContenuer";
import { Auth } from "../../context/auth-context";

export default function UserBuild() {
  const [choix, setChoix] = useState("");
  const [description, setDescription] = useState("");
  const [stats, setStats] = useState({
    hp: 1,
    fp: 1,
    end: 1,
    str: 1,
    dex: 1,
    int: 1,
    faith: 1,
    arc: 1,
  });
  const [privee, setPrivee] = useState(false);
  const user = useContext(Auth);
  const navigate = useNavigate();
  const typeEquipements = ["casque", "plastron", "gant", "jambiere"];
  const typeArtefacts = ["artefact1", "artefact2", "artefact3", "artefact4"];
  const typeStats = ["hp", "fp", "end", "str", "dex", "int", "faith", "arc"];
  const [items, setItems] = useState(null);
  const [itemsJoueur, setItemsJoueur] = useState(null);
  const [page, setPage] = useState(0);
  const { userId, buildId } = useParams();
  const [titre, setTitre] = useState("");
  const comboBox = () => {
    return (
      <div>
        <label htmlFor="classe">Classe</label>
        <select
          id="classe"
          value={choix}
          onChange={(e) => setChoix(e.target.value)}
        >
          <option value="" disabled>
            --
          </option>
          <option value="Hero">Hero</option>
          <option value="Bandit">Bandit</option>
          <option value="Astrologer">Astrologer</option>
          <option value="Warrior">Warrior</option>
          <option value="Prisoner">Prisoner</option>
          <option value="Confessor">Confessor</option>
          <option value="Wretch">Wretch</option>
          <option value="Vagabond">Vagabond</option>
          <option value="Prophet">Prophet</option>
          <option value="Samurai">Samurai</option>
          <option value="Heavy Knight">Heavy Knight</option>
        </select>
      </div>
    );
  };
  useEffect(() => {
    const sendRequest = async () => {
      try {
        const url = "http://localhost:5000/api/items/" + page;
        const reponse = await fetch(url);
        const reponseBuild = await fetch(
          "http://localhost:5000/api/user/" + userId + "/" + buildId,
          {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          },
        );
        if (!reponse.ok) {
          throw new Error("erreur survenue");
        }
        if (!reponseBuild.ok) {
          throw new Error("erreur survenue");
        }

        const reponseData = await reponse.json();
        const reponseDataBuild = await reponseBuild.json();
        setItems(reponseData.items);
        setItemsJoueur(reponseDataBuild.Build);
        setTitre(reponseDataBuild.Build.titre);
        console.log(itemsJoueur);
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
      <h1
        contentEditable
        suppressContentEditableWarning={true}
        onInput={(e) => {
          setTitre(e.currentTarget.textContent);
          console.log(titre);
        }}
      >
        {titre}
      </h1>
      {comboBox()}
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
            <input
              id={typeS}
              type="number"
              value={stats[typeS]}
              onChange={(e) => {
                setStats({ ...stats, [typeS]: Number(e.target.value) });
                console.log(stats);
              }}
            />
          </label>
        </div>
      ))}
      <h3>barre de recherche</h3>
      <BuildListBox>
        {items.map((item) => (
          <div key={item._id}>
            <BuildCardInfo
              type={item.categorie}
              objet={item}
              img={`/assets/${item.nom}.png`}
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
      <textarea
        name="desciption"
        id="description"
        onChange={(e) => {
          setDescription(e.target.value);
          console.log({ description });
        }}
      ></textarea>
      <button>Enregistrer</button>
      <button
        onClick={() => {
          setPrivee(!privee);
        }}
      >
        {privee ? "rendre public" : "Rendre privee"}
      </button>
    </div>
  );
}
