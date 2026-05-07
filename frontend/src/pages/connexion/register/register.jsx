import { useContext } from "react";
import { Auth } from "../../../context/auth-context";
import { useNavigate } from "react-router-dom";
import "../login.css";
import { useTranslation } from "react-i18next";

export default function Register() {
  const user = useContext(Auth);
  const naviger = useNavigate();
  const { t } = useTranslation();

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    try {
      const reponse = await fetch(
        import.meta.env.VITE_BACKEND_URL + "user/enregistrer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nom: data.nom,
            email: data.email,
            password: data.password,
          }),
        },
      );
      if (!reponse.ok) {
        throw new Error(reponse.message || "erreur lors de la connexion");
      }
      const reponseData = await reponse.json();
      user.login(reponseData.user._id, reponseData.token, "user");
      naviger("/menu");
    } catch (erreur) {
      console.log(erreur);
    }
  };

  return (
    <form onSubmit={authSubmitHandler}>
      <h2 className="titre">{t("register.titre")}</h2>
      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="username">{t("register.username")}</label>
          <input
            id="username"
            type="text"
            name="nom"
            placeholder={t("register.placeHolderUsername")}
          />
        </div>
        <div className="control no-margin">
          <label htmlFor="email">{t("register.email")}</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder={t("register.placeHolderEmail")}
          />
        </div>
        <div className="control no-margin">
          <label htmlFor="password">{t("register.mdp")}</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder={t("register.placeHolderMdp")}
          />
        </div>
      </div>
      <button className="btnSubmit" type="submit">
        {t("register.btnConnecter")}
      </button>
      <button className="creer" type="button" onClick={() => naviger("/login")}>
        {t("register.btnRetour")}
      </button>
    </form>
  );
}
