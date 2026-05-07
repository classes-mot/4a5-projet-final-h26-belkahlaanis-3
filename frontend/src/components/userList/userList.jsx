import { useContext, useEffect, useState } from "react";
import { Auth } from "../../context/auth-context";
import UserCard from "../userCard/userCard";
import ModalBanUser from "../modal/banUser/banUser";
import "./userList.css";
import { useTranslation } from "react-i18next";

export default function UserList() {
  const { t } = useTranslation();
  const admin = useContext(Auth);
  const [data, setData] = useState(null);
  const [userBan, setUserBan] = useState(null);
  useEffect(() => {
    const sendRequest = async () => {
      try {
        const reponse = await fetch(
          import.meta.env.VITE_BACKEND_URL + "admin/users",
          {
            headers: {
              Authorization: "Bearer " + admin.token,
            },
          },
        );
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
    <div className="user-list-wrapper">
      <div className="user-list-header">
        <h1 className="user-list-title">{t("admin.titre")}</h1>
        <button className="btn" onClick={admin.logout}>
          {t("admin.logout")}
        </button>
      </div>
      <div className="user-list-content">
        {data.Users?.map((user) => (
          <div key={user._id}>
            <UserCard nomUser={user.nom} ban={() => setUserBan(user)} />
          </div>
        ))}
        {userBan && (
          <ModalBanUser
            annuler={() => setUserBan(null)}
            ban={(raison) => {
              const url =
                import.meta.env.VITE_BACKEND_URL + "admin/" + userBan._id;
              fetch(url, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + admin.token,
                },
                body: JSON.stringify({ raisonBan: raison }),
              });
              setUserBan(null);
            }}
            nomUser={userBan.nom}
          />
        )}
      </div>
    </div>
  );
}
