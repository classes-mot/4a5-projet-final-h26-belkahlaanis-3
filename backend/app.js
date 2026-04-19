import express from "express";

import { connectDB } from "./utils/bd.js";

await connectDB();

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  const erreur = new Error("Route non trouvee");
  erreur.code = 404;
  next(erreur);
});

app.listen(5000);
