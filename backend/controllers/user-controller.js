import { Users } from "../models/users.js";
import jwt from "jsonwebtoken";
import HttpError from "../utils/http-error.js";

const enregistrerUser = async (req, res, next) => {
  const { nom, email, password } = req.body;
  let userExistant;
  try {
    userExistant = await Users.findOne({ email: email });
  } catch (erreur) {
    return next(
      new HttpError("Enregistrement echouer recommence plus tard", 500),
    );
  }

  if (userExistant) {
    return next(new HttpError("Le email est deja utiliser", 422));
  }
  const user = new Users({
    nom,
    email,
    password,
  });
  try {
    await user.save();
  } catch (erreur) {
    return next(
      new HttpError("Enregistrement echouer recommence plus tard", 500),
    );
  }
  let token;
  try {
    token = jwt.sign(
      { userId: user.id, email: user.email },
      "cleTresTresTresSecret???",
      { expiresIn: "1h" },
    );
  } catch (err) {
    const error = new HttpError("Erreur lors de la generation de la cle", 500);
    return next(error);
  }
  res.status(201).json({ user: user.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let userExistant;

  try {
    userExistant = await Users.findOne({ email });
  } catch (erreur) {
    return next(new HttpError("Echec de connexion1", 500));
  }
  if (!userExistant || userExistant.password !== password) {
    return next(
      new HttpError("Identification echouer,Verifier les identifions", 401),
    );
  }

  let token;
  try {
    token = jwt.sign(
      { userId: userExistant.id, email: userExistant.email },
      "cleTresTresTresSecret???",
      { expiresIn: "1h" },
    );
  } catch (err) {
    const error = new HttpError("Erreur lors de la generation de la cle", 500);
    return next(error);
  }
  res.status(200).json({
    userId: userExistant.id,
    email: userExistant.email,
    token: token,
  });
};

const getBuilds = async (req, res, next) => {
  const { userId } = req.params;
  let builds;
  try {
    const user = await Users.findById(userId);
    if (!user) {
      return next(new HttpError("User non trouvee", 404));
    }
    builds = user.builds;
  } catch (erreur) {
    return next(new HttpError("Une erreur est survenue dans la BD", 500));
  }
  res.json({ Builds: builds });
};

const getBuildId = async (req, res, next) => {
  const { userId, buildId } = req.params;
  let build;
  try {
    const user = await Users.findById(userId);
    if (!user) {
      return next(new HttpError("User non trouvee", 404));
    }
    build = user.builds.find((b) => b._id.toString() === buildId);
    if (!build) {
      return next(new HttpError("Build non trouvee", 404));
    }
  } catch (erreur) {
    return next(new HttpError("Une erreur est survenue dans la BD", 500));
  }
  res.json({ Build: build });
};

export { enregistrerUser, login, getBuilds, getBuildId };
