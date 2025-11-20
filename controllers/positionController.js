const db = require("../db/position_queries");
const { ERROR_TYPES, ERROR_MESSAGES } = require('../js/constants');

async function getPositions(req, res) {
  const positions = await db.getAllPositions();
  return positions;
}

async function positionGet(req, res) {
  const positions = await db.getAllPositions(); 

  res.render("positions", { items: positions });
}

async function positionFormGet(req, res) {
  const { error } = req.query;

  const errorMessage = ERROR_MESSAGES[error] || null;

  res.render("position_form", { name: null, error: errorMessage });
}

async function positionPost(req, res) {
  const { name } = req.body;
  
  try {
    await db.insertPosition(name);
    res.redirect("/positions");
  } catch (error) {
    let errorParam = null;
    console.log(error.code);
    if (error.name === 'SequelizeUniqueConstraintError') {
      errorParam = ERROR_TYPES.POSITION_EXISTS;
    }
    else {
      errorParam = ERROR_TYPES.INVALID_FORMAT;
    }

    res.redirect(`/positions/form?error=${errorParam}`);
  }
}

async function editPositionFormGet(req, res) {
  const id = req.params.id;
  const position = await db.getPositionById(id); 
  const name = position.name;
  
  const { error } = req.query;
  const errorMessage = ERROR_MESSAGES[error] || null;

  res.render("position_form", { name: name, error: errorMessage });
}

async function editPositionFormPost(req, res) {
  const id = req.params.id;
  const { name } = req.body;
  const position = await db.getPositionById(id);

  if (position.name === name) {
    res.redirect("/positions");
    return;
  }
  
  try {
    await db.editPositionById(id, name);
    res.redirect("/positions");
  } catch (error) {
    let errorParam = null;

    if (error.name === 'SequelizeUniqueConstraintError') {
      errorParam = ERROR_TYPES.POSITION_EXISTS;
    }
    else {
      errorParam = ERROR_TYPES.INVALID_FORMAT;
    }

    res.redirect(`/positions/form/${id}?error=${errorParam}`);
  }
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
  editPositionFormGet,
  editPositionFormPost,
  deletePosition
};