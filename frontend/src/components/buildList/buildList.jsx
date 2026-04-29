import { useContext, useEffect, useState } from "react";
import BuildCard from "../buildCard/buildCard";
import { isUser } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";

export default function BuildList() {
  const user = useContext(isUser);
  const naviger = useNavigate();
  const [estPrivee, setPrivee] = useState(user.connectee);
  const [data, setData] = useState(null);
  useEffect(() => {
    const sendRequest = async () => {
      try {
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
        console.log(reponseData);
        setData(reponseData);
      } catch (erreur) {
        console.log(erreur);
      }
    };
    sendRequest();
  }, [estPrivee]);
  if (!data) return <p>Loading...</p>;
  return (
    <div>
      {user.connectee && estPrivee && (
        <div>
          <button onClick={() => setPrivee(false)}>Build public</button>
          <h1>Mes builds</h1>
        </div>
      )}
      {user.connectee && !estPrivee && (
        <button onClick={() => setPrivee(true)}>Mes builds</button>
      )}
      {!user.connectee && (
        <div>
          <button onClick={() => naviger("/login")}>log in</button>
          <h1>Build public</h1>
        </div>
      )}
      {user.connectee && (
        <button
          onClick={() => {
            setPrivee(false);
            user.logout();
          }}
        >
          log out
        </button>
      )}

      {estPrivee ? (
        data.Builds && data.Builds.length === 0 ? (
          <h1>Pas de builds</h1>
        ) : (
          data.Builds?.map((build) => (
            <div key={build._id}>
              <BuildCard nomBuild={build.titre} estPrivee={estPrivee} />
            </div>
          ))
        )
      ) : data.buildsPublic && data.buildsPublic.length === 0 ? (
        <h1>Pas de builds</h1>
      ) : (
        data.buildsPublic?.map((build) => (
          <div key={build._id}>
            <BuildCard nomBuild={build.titre} estPrivee={estPrivee} />
          </div>
        ))
      )}
    </div>
  );
}
