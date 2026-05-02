import HttpError from "../utils/http-error.js";

async function getAllArmures() {
  const total = [];
  let page = 0;
  let pasFinit = true;

  while (pasFinit) {
    const reponse = await fetch(
      `https://eldenring.fanapis.com/api/armors?limit=100&page=${page}`,
    );
    const data = await reponse.json();
    total.push(...data.data);
    if (total.length >= data.total) {
      pasFinit = false;
    } else {
      page++;
    }
  }
  return total;
}

const getArmures = async (req, res, next) => {
  try {
    const items = await getAllArmures();
    res.json({ armures: items });
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
