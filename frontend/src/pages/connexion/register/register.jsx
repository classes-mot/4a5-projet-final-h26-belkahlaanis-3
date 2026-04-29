import { useContext } from "react";
import { Auth } from "../../../context/auth-context";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const user = useContext(Auth);
  const naviger = useNavigate();

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    try {
      const reponse = await fetch(
        "http://localhost:5000/api/user/enregistrer",
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
      console.log("reponseData:", reponseData);
      user.login(reponseData.user._id, reponseData.token, "user");
      naviger("/menu");
    } catch (erreur) {
      console.log(erreur);
    }
  };

  return (
    <form onSubmit={authSubmitHandler}>
      <h2 className="titre">Inscription</h2>
      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="username">username</label>
          <input id="username" type="text" name="nom" />
        </div>
        <div className="control no-margin">
          <label htmlFor="email">email</label>
          <input id="email" type="email" name="email" />
        </div>
        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
        </div>
      </div>
      <button className="btn" type="submit">
        Se connecter
      </button>
      <button
        className="boutton"
        type="button"
        onClick={() => naviger("/login")}
      >
        Retour login
      </button>
    </form>
  );
}
