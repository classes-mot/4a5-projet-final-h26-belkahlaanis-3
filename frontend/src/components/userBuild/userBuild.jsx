import { useNavigate, useParams } from "react-router-dom";
import BuildCardInfo from "../BuildCardInfo/buildCardInfo";
import BuildListBox from "../buildListBox/buildListbox";
import { useContext, useEffect, useState } from "react";
import BuildCardConteneur from "../BuildCardConteneur/buildCardContenuer";
import { Auth } from "../../context/auth-context";
import { useTranslation } from "react-i18next";
import ComboBox from "../comboBox/comboBox";

export default function UserBuild() {
  const { t } = useTranslation();
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
  const [items, setItems] = useState(null);
  const [itemsFiltre, setItemsFiltre] = useState([]);
  const [page, setPage] = useState(0);
  const { userId, buildId } = useParams();
  const estProprietaire = userId === user?.userId;

  useEffect(() => {
    const recupererBuild = async () => {
      try {
        const reponseBuild = await fetch(
          "http://localhost:5000/api/user/" + userId + "/" + buildId,
        );
        if (!reponseBuild.ok) {
          throw new Error("erreur survenue");
        }
        const reponseDataBuild = await reponseBuild.json();
        setTitre(reponseDataBuild.Build.titre);
        setPrivee(reponseDataBuild.Build.isPublic);
        setChoix(reponseDataBuild.Build.classe);
        setDescription(reponseDataBuild.Build.description);
        setEquipements(reponseDataBuild.Build.equipements);
        setTalismans(reponseDataBuild.Build.talismans);
        setStats(reponseDataBuild.Build.stats);
      } catch (erreur) {
        console.log(erreur);
      }
    };
    recupererBuild();
  }, [userId, buildId]);

  useEffect(() => {
    const changerPage = async () => {
      try {
        const url = "http://localhost:5000/api/items/" + page;
        const reponse = await fetch(url);
        if (!reponse.ok) {
          throw new Error("erreur survenue");
        }
        const reponseData = await reponse.json();

        const objetsEquipes = [
          ...Object.values(equipements),
          ...Object.values(talismans),
        ];
        const itemsFiltres = reponseData.items.filter((item) => {
          return !objetsEquipes.some((objet) => objet?._id === item._id);
        });
        setItemsFiltre(itemsFiltres);
        setItems(reponseData.items);
      } catch (erreur) {
        console.log(erreur);
      }
    };

    changerPage();
  }, [page]);
  if (!items) return <p>Loading...</p>;
  return (
    <div>
      <button onClick={() => navigate("/menu")}>{t("build.btnMenu")}</button>
      <h1
        contentEditable={estProprietaire}
        suppressContentEditableWarning={true}
        onInput={(e) => {
          setTitre(e.currentTarget.textContent);
        }}
      >
        {titre}
      </h1>
      <ComboBox
        choix={choix}
        estProprietaire={estProprietaire}
        setChoix={setChoix}
      />
      <h2>{t("build.titreEquipements")}</h2>
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
      <h2>{t("build.titreTalismans")}</h2>
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
      <h2>{t("build.titreStats")}</h2>

      {typeStats.map((typeS) => (
        <div key={typeS}>
          <label>
            {t(`build.stats.${typeS}`)}
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
              }}
            />
          </label>
        </div>
      ))}
      {estProprietaire && (
        <>
          <h3>{t("build.barreRecherche")}</h3>
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
            {t("build.btnAvant")}
          </button>
          <button
            onClick={() => {
              setPage(page + 1);
            }}
          >
            {t("build.btnApres")}
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
        }}
      ></textarea>
      {estProprietaire && (
        <>
          <button
            onClick={() => {
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
            {t("build.btnEnregistrer")}
          </button>
          <button
            onClick={() => {
              setPrivee(!privee);
            }}
          >
            {privee ? t("build.btnBuildPrivee") : t("build.btnBuildPublic")}
          </button>
        </>
      )}
    </div>
  );
}
