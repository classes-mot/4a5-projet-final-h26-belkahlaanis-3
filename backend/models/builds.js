import mongoose from "mongoose";

const buildsSchema = new mongoose.Schema({
  titre: { type: String, default: null },
  isPublic: { type: Boolean, default: false },
  proprietaire: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  classe: { type: String, required: true },
  equipements: {
    casque: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Items",
      default: null,
    },
    plastron: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Items",
      default: null,
    },
    gant: { type: mongoose.Schema.Types.ObjectId, ref: "Items", default: null },
    jambiere: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Items",
      default: null,
    },
  },
  talismans: {
    talisman1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Items",
      default: null,
    },
    talisman2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Items",
      default: null,
    },
    talisman3: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Items",
      default: null,
    },
    talisman4: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Items",
      default: null,
    },
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
