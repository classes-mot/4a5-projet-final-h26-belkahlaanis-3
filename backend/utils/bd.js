import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;
  const url = "mongodb://localhost:27017/build_maker_db";
  try {
    await mongoose.connect(url);
    isConnected = true;
    console.log("connexion a la db reussi");
  } catch (erreur) {
    console.log("Erreur lors de la connexion de la DB", erreur.message);
    process.exit(1);
  }
};
