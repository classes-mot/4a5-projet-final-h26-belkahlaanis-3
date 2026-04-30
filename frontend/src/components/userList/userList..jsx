import { useContext, useEffect, useState } from "react";
import { Auth } from "../../context/auth-context";
import UserCard from "../userCard/userCard";
import ModalBanUser from "../modal/banUser/banUser";

export default function UserList() {
  const admin = useContext(Auth);
  const [data, setData] = useState(null);
  const [userBan, setUserBan] = useState(null);
  useEffect(() => {
    const sendRequest = async () => {
      try {
        const reponse = await fetch("http://localhost:5000/api/admin/users", {
          headers: {
            Authorization: "Bearer " + admin.token,
          },
        });
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
  }, []);
  if (!data) return <p>Loading...</p>;
  return (
    <div>
      <h1>Liste des users</h1>
      <button onClick={admin.logout}>Logout</button>
      {data.Users?.map((user) => (
        <div key={user._id}>
          <UserCard nomUser={user.nom} ban={() => setUserBan(user)} />
        </div>
      ))}
      {userBan && (
        <ModalBanUser
          annuler={() => setUserBan(null)}
          ban={(raison) => {
            const url = "http://localhost:5000/api/admin/" + userBan._id;
            fetch(url, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + admin.token,
              },
              body: JSON.stringify({ raisonBan: raison }),
            });
          }}
          nomUser={userBan.nom}
        />
      )}
    </div>
  );
}
