import express from "express";
import adminRoute from "./routes/admin-routes.js";
import buildRoute from "./routes/build-route.js";
import userRoute from "./routes/user-routes.js";
import { errorHandler } from "./handler/error-handler.js";
import { connectDB } from "./utils/bd.js";

await connectDB();

const app = express();

app.use(express.json());
app.use("/api/admin", adminRoute);
app.use("/api/build", buildRoute);
app.use("/api/user", userRoute);
app.use((req, res, next) => {
  const erreur = new Error("Route non trouvee");
  erreur.code = 404;
  next(erreur);
});
app.use(errorHandler);

app.listen(5000);
