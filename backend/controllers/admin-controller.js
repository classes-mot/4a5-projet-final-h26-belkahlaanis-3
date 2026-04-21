import { Users } from "../models/users";
import HttpError from "../utils/http-error";

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await Users.find();
  } catch (erreur) {
    return next(HttpError("Une erreur est survenue dans la BD", 500));
  }
  res.json({ Users: users });
};

const getUserId = async (req, res, next) => {
  const userId = req.params.id;
  let user;
  try {
    user = await Users.findById(userId);
  } catch (erreur) {
    return next(HttpError("Une erreur est survenue dans la BD", 500));
  }
  if (!user) {
    return next(HttpError("User non trouvee", 404));
  }
  res.json({ user: user.toObject({ getters: true }) });
};
