const db = require("../db/queries");
const { ERROR_TYPES, ERROR_MESSAGES } = require('../js/constants');

async function getPositions(req, res) {
  const positions = await db.getAllPositions();
  return positions;
}

async function positionGet(req, res) {
  const positions = await db.getAllPositions(); 

  res.render("index", { items: positions });
}

async function positionFormGet(req, res) {
  const { error } = req.query;

  const errorMessage = ERROR_MESSAGES[error] || null;

  res.render("position_form", { error: errorMessage });
}

async function positionPost(req, res) {
  const { name } = req.body;
  
  try {
    await db.insertPosition(name);
    res.redirect("/positions");
  } catch (error) {
    let errorParam = null;

    if (error.code === 'P2002') {
      errorParam = ERROR_TYPES.POSITION_EXISTS;
    }
    else {
      errorParam = ERROR_TYPES.INVALID_FORMAT;
    }

    console.log(error.code);
    
    res.redirect(`/positions/form?error=${errorParam}`);
  }
}

async function editPosition(req, res) {
  res.redirect("/positions");
}

async function deletePosition(req, res) {
  await db.deletePositionById(req.params.id);
  res.redirect("/positions");
}

module.exports = {
  getPositions,
  positionGet,
  positionFormGet,
  positionPost,
  deletePosition
};