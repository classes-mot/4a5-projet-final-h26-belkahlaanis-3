import mongoose from "mongoose";

const buildsSchema = new mongoose.Schema({
  titre: { type: String, default: "Sans titre" },
  isPublic: { type: Boolean, default: false },
  proprietaire: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  classe: { type: String, required: true },
  equipement: {
    casque: { type: String, default: "vide" },
    plastron: { type: String, default: "vide" },
    pantalon: { type: String, default: "vide" },
    botte: { type: String, default: "vide" },
  },
  artefacts: {
    artefact1: { type: String, default: "vide" },
    artefact2: { type: String, default: "vide" },
    artefact3: { type: String, default: "vide" },
    artefact4: { type: String, default: "vide" },
  },
  stats: {
    hp: { type: Number, required: true },
    fp: { type: Number, required: true },
    end: { type: Number, required: true },
    str: { type: Number, required: true },
    dex: { type: Number, required: true },
    int: { type: Number, required: true },
    faith: { type: Number, required: true },
    arc: { type: Number, required: true },
    lvl: { type: Number, required: true },
  },
  description: { type: String, default: "" },
});

export const Builds = mongoose.model("Builds", buildsSchema);
