const { Position } = require("./pool");

async function getAllPositions() {
  return await Position.findAll({
    raw : true
    });
}

async function getPositionById(id) {
  return await Position.findByPk(id);
}

async function editPositionById(id, name) {
  return await Position.update({ name: name }, {
    where: {
      id: id
    }
  });
}

async function insertPosition(name) {
  return await Position.create({
    name: name
  });
}

async function deletePositionById(id) {
  return await Position.destroy({
    where: {
      id: id
    }
  });
}

module.exports = {
  getAllPositions,
  insertPosition,
  getPositionById,
  editPositionById,
  deletePositionById
};
