import mongoose from "mongoose";

const buildsSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  isPublic: { type: Boolean, required: true },
  proprietaire: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  equipement: {
    casque: { type: String, default: null },
    plastron: { type: String, default: null },
    pantalon: { type: String, default: null },
    botte: { type: String, default: null },
  },
  artefacts: {
    artefact1: { type: String, default: null },
    artefact2: { type: String, default: null },
    artefact3: { type: String, default: null },
    artefact4: { type: String, default: null },
  },
  stats: {
    hp: { type: Number, default: null },
    fp: { type: Number, default: null },
    end: { type: Number, default: null },
    str: { type: Number, default: null },
    dex: { type: Number, default: null },
    int: { type: Number, default: null },
    faith: { type: Number, default: null },
    arc: { type: Number, default: null },
    lvl: { type: Number, default: null },
  },
  description: { type: String, default: "" },
});

export const Build = mongoose.model("Builds", buildsSchema);
