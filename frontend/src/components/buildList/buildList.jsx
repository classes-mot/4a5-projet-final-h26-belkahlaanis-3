import { useContext, useEffect, useState } from "react";
import BuildCard from "../buildCard/buildCard";
import { Auth } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import ModalSupprimer from "../modal/supprimer/supprimer";
import "./buildList.css";

export default function BuildList() {
  const user = useContext(Auth);
  const naviger = useNavigate();
  const [estPrivee, setPrivee] = useState(user.connectee);
  const [data, setData] = useState(null);
  const [buildSupp, setBuildSupp] = useState(null);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const sendRequest = async () => {
      try {
        if (estPrivee && !user.userId) return;
        let reponse;
        if (estPrivee) {
          let url = "http://localhost:5000/api/user/";
          reponse = await fetch(url + user.userId, {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          });
        } else {
          reponse = await fetch("http://localhost:5000/api/user/public");
        }
        const reponseData = await reponse.json();
        if (!reponse.ok) {
          throw new Error(reponseData.message || "erreur survenue");
        }
        setData(reponseData);
      } catch (erreur) {
        console.log(erreur);
      }
    };
    sendRequest();
  }, [estPrivee, user.userId, user.token, refresh]);
  if (!data) return <p>Loading...</p>;
  return (
    <div className="build-list-wrapper">
      <div className="build-list-header">
        <div className="header-actions">
          {user.connectee && estPrivee && (
            <button className="btn" onClick={() => setPrivee(false)}>
              Build public
            </button>
          )}
          {user.connectee && !estPrivee && (
            <button className="btn" onClick={() => setPrivee(true)}>
              Mes builds
            </button>
          )}
          {!user.connectee && (
            <button className="btn" onClick={() => naviger("/login")}>
              log in
            </button>
          )}
          {user.connectee && (
            <button
              className="btn"
              onClick={() => {
                setPrivee(false);
                user.logout();
              }}
            >
              log out
            </button>
          )}
        </div>
      </div>

      <div className="build-list-content">
        <h1 className="build-list-section-title">
          {user.connectee && estPrivee
            ? "Mes Builds"
            : "Liste de builds publics"}
        </h1>
        {estPrivee ? (
          !data.Builds || data.Builds.length === 0 ? (
            <h1>Pas de builds</h1>
          ) : (
            data.Builds?.map((build) => (
              <div key={build._id}>
                <BuildCard
                  nomBuild={build.titre}
                  estPrivee={estPrivee}
                  supprimer={() => setBuildSupp(build)}
                />
              </div>
            ))
          )
        ) : !data.buildsPublic || data.buildsPublic.length === 0 ? (
          <h1>Pas de builds</h1>
        ) : (
          data.buildsPublic?.map((build) => (
            <div key={build._id}>
              <BuildCard
                nomBuild={build.titre}
                estPrivee={estPrivee}
                supprimer={() => setBuildSupp(build)}
              />
            </div>
          ))
        )}
        {buildSupp && (
          <ModalSupprimer
            annuler={() => setBuildSupp(null)}
            supprimer={async () => {
              const url =
                "http://localhost:5000/api/build/" +
                buildSupp.proprietaire +
                "/" +
                buildSupp._id;
              await fetch(url, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + user.token,
                },
              });
              setBuildSupp(null);
              setRefresh((prev) => !prev);
            }}
            nomBuild={buildSupp.titre}
          />
        )}
      </div>
    </div>
  );
}
