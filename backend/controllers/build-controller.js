import { Builds } from "../models/builds.js";
import { Users } from "../models/users.js";
import HttpError from "../utils/http-error.js";
import { validationResult } from "express-validator";

/* methode qui valide le json; si mauvais -> retourne 422;
recupere les valeurs et creer un build et le mets dans la bd et dans la liste du user;
si user existe pas -> retourne 404;
si le build est public et n'a pas de titre -> "build de " nom du User
 */
const creerBuild = async (req, res, next) => {
  let build;
  try {
    const userId = req.params.userId;
    const user = await Users.findById(userId);
    if (!user) {
      return next(new HttpError("Utilisateur non trouvé", 404));
    }
    build = new Builds({
      titre: "Build de " + user.nom,
      proprietaire: userId,
      classe: "Vagabond",
      stats: {
        hp: 1,
        fp: 1,
        end: 1,
        str: 1,
        dex: 1,
        int: 1,
        faith: 1,
        arc: 1,
        lvl: 1,
      },
    });
    user.builds.push(build);
    await build.save();
    await user.save();
  } catch (erreur) {
    console.log(erreur);
    return next(new HttpError("Creation dans la BD echouee", 500));
  }
  res.status(201).json({ creation: build });
};

/* valide le json sinon -> retourne 422;
recupere le json et le id du build
puis cherche dans la bd si pas de build -> retourne 404;
A notee ***Ne modifie tout le build au complet juste le json entrer*** avec ??(verifie si undifined)
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
  const userId = req.params.userId;
  const {
    titre,
    isPublic,
    classe,
    equipement: { casque, plastron, pantalon, botte } = {},
    artefacts: { artefact1, artefact2, artefact3, artefact4 } = {},
    stats: { hp, fp, end, str, dex, int, faith, arc, lvl } = {},
    description,
  } = req.body;
  let buildModifier;
  try {
    buildModifier = await Builds.findById(buildId);
    if (!buildModifier) {
      return next(new HttpError("Build non trouve", 404));
    }
    if (buildModifier.proprietaire.toString() !== userId) {
      return next(new HttpError("Action non autorisee", 403));
    }
    const user = await Users.findById(userId);
    let titreFinal;
    if (isPublic === true && titre === undefined) {
      titreFinal = "Build de " + user.nom;
    } else {
      titreFinal = titre;
    }
    buildModifier.titre = titreFinal ?? buildModifier.titre;
    buildModifier.isPublic = isPublic ?? buildModifier.isPublic;
    buildModifier.classe = classe ?? buildModifier.classe;
    buildModifier.description = description ?? buildModifier.description;
    buildModifier.equipement = {
      casque: casque ?? buildModifier.equipement.casque,
      plastron: plastron ?? buildModifier.equipement.plastron,
      pantalon: pantalon ?? buildModifier.equipement.pantalon,
      botte: botte ?? buildModifier.equipement.botte,
    };
    buildModifier.artefacts = {
      artefact1: artefact1 ?? buildModifier.artefacts.artefact1,
      artefact2: artefact2 ?? buildModifier.artefacts.artefact2,
      artefact3: artefact3 ?? buildModifier.artefacts.artefact3,
      artefact4: artefact4 ?? buildModifier.artefacts.artefact4,
    };
    buildModifier.stats = {
      hp: hp ?? buildModifier.stats.hp,
      fp: fp ?? buildModifier.stats.fp,
      end: end ?? buildModifier.stats.end,
      str: str ?? buildModifier.stats.str,
      dex: dex ?? buildModifier.stats.dex,
      int: int ?? buildModifier.stats.int,
      faith: faith ?? buildModifier.stats.faith,
      arc: arc ?? buildModifier.stats.arc,
      lvl: lvl ?? buildModifier.stats.lvl,
    };
    await buildModifier.save();
  } catch (erreur) {
    console.log(erreur);
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
    const build = await Builds.findById(buildId);
    if (!build) {
      return next(new HttpError("Build non trouvee", 404));
    }
    if (build.proprietaire.toString() !== userId) {
      return next(new HttpError("Action non autorisee", 403));
    }
    user.builds = user.builds.filter((b) => b._id.toString() !== buildId);
    await user.save();
    await Builds.deleteOne({ _id: buildId });
  } catch (erreur) {
    return next(
      new HttpError("Erreur lors de la suppresion du build dans la bd", 500),
    );
  }
  res.status(200).json({ message: "Build supprimer" });
};

export { creerBuild, modifierBuild, supprimerBuild };
