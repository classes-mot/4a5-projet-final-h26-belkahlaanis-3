import { Users } from "../models/users.js";
import jwt from "jsonwebtoken";
import HttpError from "../utils/http-error.js";
import { Builds } from "../models/builds.js";
import { validationResult } from "express-validator";

/* verifie si le payload est bon sinon -> retourne 404;
si le user existe -> retourne 422;
sinon creer le user le met dans la bd et creer un token
si la creation du token echoue -> retourne 500
*/
const enregistrerUser = async (req, res, next) => {
  const validationErreurs = validationResult(req);
  if (!validationErreurs.isEmpty()) {
    return next(
      new HttpError("données saisies invalides valider votre payload", 422),
    );
  }
  const { nom, email, password } = req.body;
  let user;
  try {
    const userExistant = await Users.findOne({ email: email });
    if (userExistant) {
      return next(new HttpError("Le email est deja utiliser", 422));
    }
    const nomExistant = await Users.findOne({ nom: nom });
    if (nomExistant) {
      return next(new HttpError("Le nom est deja utiliser", 422));
    }
    user = new Users({
      nom,
      email,
      password,
    });
    await user.save();
  } catch (erreur) {
    return next(
      new HttpError("Enregistrement echouer recommence plus tard", 500),
    );
  }
  let token;
  try {
    token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      "cleTresTresTresSecret???",
      { expiresIn: "1h" },
    );
  } catch (err) {
    console.log(err);
    const error = new HttpError("Erreur lors de la generation de la cle", 500);
    return next(error);
  }
  res.status(201).json({ user: user.toObject(), token: token });
};

/*verifie le payload si pas respecter -> retourne 422;
ensuite cherche le user avec le email si le user est ban indique la raison du ban -> retourne 403;
ensuite verifie le mdp donnee avec celui de la bd si mauvais -> retourne 401 
si bon -> creer un token si la creation du token echoue -> retourne 500
*/
const login = async (req, res, next) => {
  const validationErreurs = validationResult(req);
  if (!validationErreurs.isEmpty()) {
    return next(
      new HttpError("données saisies invalides valider votre payload", 422),
    );
  }
  const { email, password } = req.body;
  let userExistant;
  try {
    userExistant = await Users.findOne({ email });
    if (!userExistant || userExistant.password !== password) {
      return next(
        new HttpError("Identification echouer,Verifier les identifions", 401),
      );
    }
    if (userExistant.isBan) {
      return next(
        new HttpError("tu es ban pour " + userExistant.raisonBan, 403),
      );
    }
  } catch (erreur) {
    return next(new HttpError("Echec de connexion", 500));
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: userExistant.id,
        email: userExistant.email,
        role: userExistant.role,
      },
      "cleTresTresTresSecret???",
      { expiresIn: "24h" },
    );
  } catch (err) {
    const error = new HttpError("Erreur lors de la generation de la cle", 500);
    return next(error);
  }
  res.status(200).json({
    userId: userExistant.id,
    email: userExistant.email,
    token: token,
    role: userExistant.role,
  });
};

/* cherche le user donner en parametre si trouve pas -> retourne 404;
sinon prends ces builds et les renvoies
si trouve aucun gerer au niveau Frontend
*/
const getBuilds = async (req, res, next) => {
  const { userId } = req.userData;
  let builds;
  try {
    const user = await Users.findById(userId).populate("builds");
    if (!user) {
      return next(new HttpError("User non trouvee", 404));
    }
    builds = user.builds;
  } catch (erreur) {
    return next(new HttpError("Une erreur est survenue dans la BD", 500));
  }
  res.json({ Builds: builds });
};

/* cherche le user donner en parametre si trouve pas -> retourne 404;
sinon prends un builds donner avec un id
si le(build) trouve pas -> retourne 404
*/
const getBuildId = async (req, res, next) => {
  const { userId, buildId } = req.params;
  let build;
  try {
    const user = await Users.findById(userId).populate("builds"); // populate cherche l'objet avec le id que je stock dans le shcema
    if (!user) {
      return next(new HttpError("User non trouvee", 404));
    }
    build = await Builds.findById(buildId)
      .populate("equipements.casque")
      .populate("equipements.plastron")
      .populate("equipements.gant")
      .populate("equipements.jambiere")
      .populate("talismans.talisman1")
      .populate("talismans.talisman2")
      .populate("talismans.talisman3")
      .populate("talismans.talisman4");
    if (!build) {
      return next(new HttpError("Build non trouvee", 404));
    }
  } catch (erreur) {
    return next(new HttpError("Une erreur est survenue dans la BD", 500));
  }
  res.json({ Build: build });
};

/*Cherche tous les builds qui sont public
si trouve aucun gerer au niveau Frontend
*/
const getPublic = async (req, res, next) => {
  let buildsPublic;
  try {
    buildsPublic = await Builds.find({ isPublic: true });
  } catch (erreur) {
    return next(new HttpError("Une erreur est survenue dans la BD", 500));
  }
  res.json({ buildsPublic: buildsPublic });
};

export { enregistrerUser, login, getBuilds, getBuildId, getPublic };
