import { Builds } from "../models/builds.js";
import { Users } from "../models/users.js";
import HttpError from "../utils/http-error.js";

/* methode qui valide le json; si mauvais -> retourne 422;
recupere les valeurs et creer un build et le mets dans la bd et dans la liste du user;
si user existe pas -> retourne 404;
si le build est public et n'a pas de titre -> "build de " nom du User
 */
const creerBuild = async (req, res, next) => {
  const validationErreurs = validationResult(req);
  if (!validationErreurs.isEmpty()) {
    return next(
      new HttpError("données saisies invalides valider votre payload", 422),
    );
  }
  const {
    titre,
    isPublic,
    equipement: { casque, plastron, pantalon, botte },
    artefacts: { artefact1, artefact2, artefact3, artefact4 },
    stats: { hp, fp, end, str, dex, int, faith, arc, lvl },
    description,
  } = req.body;
  try {
    const userId = req.params.userId;
    const user = await Users.findById(userId);
    if (!user) {
      return next(new HttpError("Utilisateur non trouvé", 404));
    }
    if (isPublic === true && titre === undefined) {
      titre = "Build de " + user.nom;
    }
    const build = new Builds({
      titre,
      isPublic,
      proprietaire: userId,
      equipement: {
        casque,
        plastron,
        pantalon,
        botte,
      },
      artefacts: {
        artefact1,
        artefact2,
        artefact3,
        artefact4,
      },
      stats: { hp, fp, end, str, dex, int, faith, arc, lvl },
      description,
    });
    user.builds.push(build);
    await build.save();
    await user.save();
  } catch (erreur) {
    return next(new HttpError("Creation dans la BD echouee", 500));
  }
  res.status(201).json({ creation: build });
};

/* valide le json sinon -> retourne 422;
recupere le json et le id du build
puis cherche dans la bd si pas de build -> retourne 404;
A notee ***Ne modifie tout le build au complet juste le json entrer***
donc si je mets juste un titre dans le json le build reste le meme sauf le titre
 */
const modifierBuild = async (req, res, next) => {
  const validationErreurs = validationResult(req);
  if (!validationErreurs.isEmpty()) {
    return next(
      new HttpError("données saisies invalides valider votre payload", 422),
    );
  }
  const buildId = req.params.buildId;
  const nvBuild = req.body;

  try {
    const buildModifier = await Builds.findByIdAndUpdate(buildId, nvBuild, {
      new: true,
    });
    if (!buildModifier) {
      return next(new HttpError("Build non trouvee", 404));
    }
  } catch (erreur) {
    return next(new HttpError("Erreur lors de la modificatoin du build", 500));
  }
  res.status(200).json({ build: buildModifier.toObject({ getters: true }) });
};

/*methode qui cherche le build que le joueur veut supprimer;
si il existe pas (user ou build) -> retourne 404;
sinon supprimer le build de la bd Build et de la liste du user 
 */
const supprimerBuild = async (req, res, next) => {
  const buildId = req.params.buildId;
  const userId = req.params.userId;
  try {
    const user = await Users.findById(userId);
    if (!user) {
      return next(new HttpError("User non trouvee", 404));
    }
    const build = await Builds.findByIdAndDelete(buildId);
    if (!build) {
      return next(new HttpError("Build non trouvee", 404));
    }
    user.builds = user.builds.filter((b) => b._id.toString() !== buildId);
    await user.save();
  } catch (erreur) {
    return next(
      new HttpError("Erreur lors de la suppresion du build dans la bd", 500),
    );
  }
  res.status(200).json({ message: "Build supprimer" });
};

export { creerBuild, modifierBuild, supprimerBuild };
