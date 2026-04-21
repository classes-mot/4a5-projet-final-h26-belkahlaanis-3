import { Builds } from "../models/builds.js";
import HttpError from "../utils/http-error.js";

const creerBuild = async (req, res, next) => {
  const {
    titre,
    isPublic,
    proprietaire,
    equipement,
    artefacts,
    stats,
    description,
  } = req.body;

  const build = new Builds({
    titre,
    isPublic,
    proprietaire,
    equipement,
    artefacts,
    stats,
    description,
  });
  try {
    await build.save();
  } catch (erreur) {
    return next(new HttpError("Creation dans la BD echouee", 500));
  }
  res.status(201).json({ creation: build });
};

const modifierBuild = async (req, res, next) => {
  const buildId = req.params.buildId;
  const nvBuild = req.body;

  try {
    const buildModifier = await Builds.findByIdAndUpdate(buildId, nvBuild, {
      new: true,
    });
    if (!buildModifier) {
      return res.status(404).json({ message: "Build non trouvee" });
    }
    res.status(200).json({ build: buildModifier.toObject({ getters: true }) });
  } catch (erreur) {
    res
      .status(500)
      .json({ message: "Erreur lors de la modificatoin du build" });
  }
};

const supprimerBuild = async (req, res, next) => {
  const buildId = req.params.id;
  try {
    const build = await Builds.findByIdAndDelete(buildId);
    if (!build) {
      return res.status(404).json({ message: "Build non trouve" });
    }
    res.status(200).json({ message: "Build supprimer" });
  } catch (erreur) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppresion du build dans la bd" });
  }
};

export { creerBuild, modifierBuild, supprimerBuild };
