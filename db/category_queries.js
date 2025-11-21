const { Category } = require("./pool");

async function getAllCategories() {
  return await Category.findAll({
    raw : true
    });
}

async function getCategoryById(id) {
  return await Category.findByPk(id);
}

async function editCategoryById(id, name) {
  return await Category.update({ name: name }, {
    where: {
      id: id
    }
  });
}

async function insertCategory(name) {
  return await Category.create({
    name: name
  });
}

async function deleteCategoryById(id) {
  return await Category.destroy({
    where: {
      id: id
    }
  });
}

module.exports = {
  getAllCategories,
  insertCategory,
  getCategoryById,
  editCategoryById,
  deleteCategoryById
};
