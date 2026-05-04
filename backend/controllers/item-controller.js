import HttpError from "../utils/http-error.js";

const getArmures = async (req, res, next) => {
  const nbPage = req.params.page;
  try {
    let url =
      "https://eldenring.fanapis.com/api/armors?limit=25&page=" + nbPage;
    const reponse = await fetch(url);
    const data = await reponse.json();
    res.json({ armures: data });
  } catch (erreur) {
    return next(new HttpError("erreur lors du api call", 500));
  }
};

const getTalisments = async (req, res, next) => {
  try {
    const reponse = await fetch(
      "https://eldenring.fanapis.com/api/talismans?limit=1000",
    );
    if (!reponse.ok) {
      return next(new HttpError("Erreur lors du api call", 500));
    }
    const data = await reponse.json();
    res.json(data);
  } catch (erreur) {
    return next(new HttpError("erreur lors du api call", 500));
  }
};

export { getArmures, getTalisments };
