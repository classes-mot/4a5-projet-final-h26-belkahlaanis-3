import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  isBan: { type: Boolean, default: false },
  nom: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  builds: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Builds", default: null },
  ],
});

export const Users = mongoose.model("Users", usersSchema);
