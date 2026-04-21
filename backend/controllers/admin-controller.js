import { Users } from "../models/users.js";
import HttpError from "../utils/http-error.js";

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await Users.find();
  } catch (erreur) {
    return next(new HttpError("Une erreur est survenue dans la BD", 500));
  }
  res.json({ Users: users });
};

const banUser = async (req, res, next) => {
  const userId = req.params.id;
  let user;
  try {
    user = await Users.findById(userId);
  } catch (erreur) {
    return next(new HttpError("Une erreur est survenue dans la BD", 500));
  }
  if (!user) {
    return next(new HttpError("User non trouvee", 404));
  } else {
    user.isBan = true;
  }
  try {
    await user.save();
  } catch (erreur) {
    return next(new HttpError("Une erreur est survenue dans la BD", 500));
  }
  res.json({ message: user.nom + " a bien ete banni " });
};

export { getUsers, banUser };
