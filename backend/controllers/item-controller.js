import { Items } from "../models/items.js";
import HttpError from "../utils/http-error.js";

const getItems = async (req, res, next) => {
  const nbPage = Number(req.params.page);
  const limit = 10;
  let items;
  try {
    items = await Items.find()
      .skip(nbPage * limit)
      .limit(limit);
    res.json({ items: items });
  } catch (erreur) {
    return next(new HttpError("erreur lors du api call", 500));
  }
};

export { getItems };
