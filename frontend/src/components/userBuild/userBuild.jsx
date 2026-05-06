import { useNavigate, useParams } from "react-router-dom";
import BuildCardInfo from "../BuildCardInfo/buildCardInfo";
import BuildListBox from "../buildListBox/buildListbox";
import { useContext, useEffect, useState } from "react";
import BuildCardConteneur from "../BuildCardConteneur/buildCardContenuer";
import { Auth } from "../../context/auth-context";

export default function UserBuild() {
  const [equipements, setEquipements] = useState({
    casque: null,
    plastron: null,
    gant: null,
    jambiere: null,
  });
  const [talismans, setTalismans] = useState({
    talisman1: null,
    talisman2: null,
    talisman3: null,
    talisman4: null,
  });
  const [titre, setTitre] = useState(null);
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
    lvl: 1,
  });
  const [privee, setPrivee] = useState(false);
  const user = useContext(Auth);
  const navigate = useNavigate();
  const typeEquipements = ["casque", "plastron", "gant", "jambiere"];
  const typeArtefacts = ["talisman1", "talisman2", "talisman3", "talisman4"];
  const typeStats = [
    "hp",
    "fp",
    "end",
    "str",
    "dex",
    "int",
    "faith",
    "arc",
    "lvl",
  ];
  const [items, setItems] = useState([]);
  const [itemsFiltre, setItemsFiltre] = useState([]);
  const [itemsJoueur, setItemsJoueur] = useState([]);
  const [page, setPage] = useState(0);
  const { userId, buildId } = useParams();
  const estProprietaire = userId === user.userId;
  const comboBox = () => {
    return (
      <div>
        <label htmlFor="classe">Classe</label>
        <select
          id="classe"
          value={choix}
          disabled={!estProprietaire}
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
        );
        if (!reponse.ok) {
          throw new Error("erreur survenue");
        }
        if (!reponseBuild.ok) {
          throw new Error("erreur survenue");
        }

        const reponseData = await reponse.json();
        const reponseDataBuild = await reponseBuild.json();
        setItemsJoueur(reponseDataBuild.Build);
        setTitre(reponseDataBuild.Build.titre);
        setPrivee(reponseDataBuild.Build.isPublic);
        setChoix(reponseDataBuild.Build.classe);
        setDescription(reponseDataBuild.Build.description);
        setEquipements(reponseDataBuild.Build.equipements);
        setTalismans(reponseDataBuild.Build.talismans);
        const objetsEquipes = [
          ...Object.values(reponseDataBuild.Build.equipements),
          ...Object.values(reponseDataBuild.Build.talismans),
        ];
        setStats(reponseDataBuild.Build.stats);
        const itemsFiltres = reponseData.items.filter((item) => {
          return !objetsEquipes.some((objet) => objet?._id === item._id);
        });
        setItemsFiltre(itemsFiltres);
        setItems(reponseData.items);
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
        contentEditable={!estProprietaire}
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
          <BuildCardConteneur
            type={typeE}
            ajouterItem={setEquipements}
            enlverItem={setItemsFiltre}
            itemInitial={equipements[typeE]}
          />
        </div>
      ))}
      <h2>Artefacs</h2>
      {typeArtefacts.map((typeA) => (
        <div key={typeA}>
          <BuildCardConteneur
            type={"talisman"}
            slot={typeA}
            ajouterItem={setTalismans}
            enlverItem={setItemsFiltre}
            itemInitial={talismans[typeA]}
          />
        </div>
      ))}
      <h2>Stats</h2>

      {typeStats.map((typeS) => (
        <div key={typeS}>
          <label>
            {typeS}
            <input
              disabled={!estProprietaire}
              id={typeS}
              type="number"
              value={stats[typeS]}
              onChange={(e) => {
                let valeur = Number(e.target.value);
                if (valeur < 1) valeur = 1;
                if (valeur > 99) valeur = 99;
                setStats({ ...stats, [typeS]: valeur });
                console.log(stats);
              }}
            />
          </label>
        </div>
      ))}
      {estProprietaire && (
        <>
          <h3>barre de recherche</h3>
          <BuildListBox>
            {itemsFiltre.map((item) => (
              <div key={item._id}>
                <BuildCardInfo type={item.categorie} objet={item} />
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
        </>
      )}

      <textarea
        disabled={!estProprietaire}
        value={description}
        name="desciption"
        id="description"
        onChange={(e) => {
          setDescription(e.target.value);
          console.log({ description });
        }}
      ></textarea>
      {estProprietaire && (
        <>
          <button
            onClick={() => {
              console.log("description " + description); //
              console.log("stats " + stats);
              console.log("titre " + titre); //
              console.log("choix " + choix); //
              console.log("public " + privee);
              Object.entries(equipements).map(([slot, item]) => {
                console.log(slot, item);
              });
              Object.entries(talismans).map(([slot, item]) => {
                console.log(slot, item);
              });
              const url =
                "http://localhost:5000/api/build/" + userId + "/" + buildId;
              fetch(url, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + user.token,
                },
                body: JSON.stringify({
                  titre: titre,
                  classe: choix,
                  description: description,
                  isPublic: privee,
                  equipements: equipements,
                  talismans: talismans,
                  stats: stats,
                }),
              });
            }}
          >
            Enregistrer
          </button>
          <button
            onClick={() => {
              setPrivee(!privee);
            }}
          >
            {privee ? "rendre privee" : "Rendre public"}
          </button>
        </>
      )}
    </div>
  );
}
