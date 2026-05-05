import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  categorie: {
    type: String,
    required: true,
    enum: ["casque", "plastron", "jambiere", "gant", "talisman"],
  },
  poids: { type: Number, required: true },
  description: { type: String },

  damageNegation: {
    physique: Number,
    magie: Number,
    feu: Number,
    foudre: Number,
    sacre: Number,
  },

  resistance: {
    immunite: Number,
    robustesse: Number,
    focus: Number,
    vitalite: Number,
    poise: Number,
  },
});
export const Items = mongoose.model("Items", itemSchema);
