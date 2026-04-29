import { useContext } from "react";
import { isUser } from "../../../context/auth-context";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const user = useContext(isUser);
  const naviger = useNavigate();

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
      user.login(reponseData.userId, reponseData.token);
      naviger("/menu");
    } catch (erreur) {
      console.log(erreur);
    }
  };

  return (
    <form onSubmit={authSubmitHandler}>
      <h2 className="titre">Connexion</h2>
      <div className="control-row">
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
    </form>
  );
}
