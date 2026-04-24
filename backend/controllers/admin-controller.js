import { Users } from "../models/users.js";
import HttpError from "../utils/http-error.js";

/* recupere tous les users dans la bd et affiche le user -> "nom";
si aucun user -> retourne 404*/
const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await Users.find().select("nom");
  } catch (erreur) {
    return next(new HttpError("Une erreur est survenue dans la BD", 500));
  }
  if (users.length === 0) {
    return next(new HttpError("Aucun utilisateur n'est enregistrer", 404));
  }
  res.json({ Users: users });
};

/* trouve le user et met sa variable isBan == true + save()"save ne creer pas un nv mais reactualise";
si user existe pas -> retourne 404*/
const banUser = async (req, res, next) => {
  const validationErreurs = validationResult(req);
  if (!validationErreurs.isEmpty()) {
    return next(
      new HttpError("données saisies invalides valider votre payload", 422),
    );
  }
  const { raisonBan } = req.body;
  const userId = req.params.id;
  let user;
  try {
    user = await Users.findById(userId);
    if (!user) {
      return next(new HttpError("User non trouvee", 404));
    } else {
      user.isBan = true;
      user.raisonBan = raisonBan;
    }
    await user.save();
  } catch (erreur) {
    return next(new HttpError("Une erreur est survenue dans la BD", 500));
  }
  res.json({ message: user.nom + " a bien ete banni pour " + raisonBan });
};

export { getUsers, banUser };
