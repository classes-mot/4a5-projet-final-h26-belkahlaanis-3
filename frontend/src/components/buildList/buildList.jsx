import { useContext, useEffect, useState } from "react";
import BuildCard from "../buildCard/buildCard";
import { isUser } from "../../context/auth-context";

export default function BuildList() {
  const [estPrivee, setPrivee] = useState(false);
  const user = useContext(isUser);
  const [data, setData] = useState(null);
  useEffect(() => {
    const sendRequest = async () => {
      try {
        let reponse;
        if (estPrivee) {
          let url = "http://localhost:5000/api/user/";
          reponse = await fetch(url + user.userId);
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
  }, [estPrivee]);
  if (!data) return <p>Loading...</p>;
  return (
    <div>
      {user.connectee && estPrivee && (
        <button onClick={() => setPrivee(false)}>Build public</button>
      )}
      {user.connectee && !estPrivee && (
        <button onClick={() => setPrivee(true)}>retour</button>
      )}
      {!user.connectee && (
        <div>
          <button onClick={() => user.login("test", "test")}>log in</button>
          <h1>Build public</h1>
        </div>
      )}
      {user.connectee && (
        <div>
          <button onClick={user.logout}>log out</button>
          <h1>Mes builds</h1>
        </div>
      )}
      {data.buildsPublic.map((build) => (
        <div key={build._id}>
          <BuildCard nomBuild={build.titre} estPrivee={estPrivee} />
        </div>
      ))}
    </div>
  );
}
