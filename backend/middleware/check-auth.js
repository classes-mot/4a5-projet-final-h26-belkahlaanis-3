import jwt from "jsonwebtoken";
import HttpError from "../util/http-error.js";

const checkUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Authentification echouee!");
    }
    const decodedToken = jwt.verify(token, "cleTresTresTresSecret???");
    req.userData = { userId: decodedToken.userId, role: decodedToken.role };
    next();
  } catch (err) {
    const error = new HttpError("Authentification echouee !", 401);
    return next(error);
  }
};

const checkAdmin = (req, res, next) => {
  try {
    if (req.userData.role !== "admin") {
      return next(new HttpError("admin autorise pas toi", 403));
    }
    next();
  } catch (erreur) {
    const error = new HttpError("Authentification echouee !", 401);
    return next(error);
  }
};

export { checkUser, checkAdmin };
