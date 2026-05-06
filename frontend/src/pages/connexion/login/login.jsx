import { useContext } from "react";
import { Auth } from "../../../context/auth-context";
import { useNavigate } from "react-router-dom";
import "../login.css";
import { useTranslation } from "react-i18next";

export default function Login() {
  const user = useContext(Auth);
  const naviger = useNavigate();
  const { t } = useTranslation();

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    try {
      const reponse = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
      if (!reponse.ok) {
        throw new Error(reponse.message || "erreur lors de la connexion");
      }
      const reponseData = await reponse.json();
      console.log("reponseData:", reponseData);
      user.login(reponseData.userId, reponseData.token, reponseData.role);
      if (reponseData.role === "admin") {
        naviger("/banUser");
      } else {
        naviger("/menu");
      }
    } catch (erreur) {
      console.log(erreur);
    }
  };

  return (
    <form onSubmit={authSubmitHandler}>
      <h2 className="titre">{t("login.titre")}</h2>
      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">{t("login.email")}</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder={t("login.placeHolderEmail")}
          />
        </div>
        <div className="control no-margin">
          <label htmlFor="password">{t("login.mdp")}</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder={t("login.placeHolderMdp")}
          />
        </div>
      </div>
      <button className="btnSubmit" type="submit">
        {t("login.btnConnecter")}
      </button>
      <button
        className="creer"
        type="button"
        onClick={() => naviger("/register")}
      >
        {t("login.btnInscription")}
      </button>
    </form>
  );
}
