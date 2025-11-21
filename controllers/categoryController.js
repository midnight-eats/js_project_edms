const db = require("../db/category_queries");
const { ERROR_TYPES, ERROR_MESSAGES } = require('../js/constants');

async function getCategories(req, res) {
  const categories = await db.getAllCategories();
  return categories;
}

async function categoryGet(req, res) {
  const categories = await db.getAllCategories(); 

  res.render("categories", { items: categories });
}

async function categoryFormGet(req, res) {
  const { error } = req.query;

  const errorMessage = ERROR_MESSAGES[error] || null;

  res.render("category_form", { name: null, error: errorMessage });
}

async function categoryPost(req, res) {
  const { name } = req.body;
  
  try {
    await db.insertCategory(name);
    res.redirect("/categories");
  } catch (error) {
    let errorParam = null;
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      errorParam = ERROR_TYPES.VALUE_EXISTS;
    }
    else {
      errorParam = ERROR_TYPES.INVALID_FORMAT;
    }

    res.redirect(`/categories/form?error=${errorParam}`);
  }
}

async function editCategoryFormGet(req, res) {
  const id = req.params.id;
  const category = await db.getCategoryById(id); 
  const name = category.name;
  
  const { error } = req.query;
  const errorMessage = ERROR_MESSAGES[error] || null;

  res.render("category_form", { name: name, error: errorMessage });
}

async function editCategoryFormPost(req, res) {
  const id = req.params.id;
  const { name } = req.body;
  const category = await db.getCategoryById(id);

  if (category.name === name) {
    res.redirect("/categories");
    return;
  }
  
  try {
    await db.editCategoryById(id, name);
    res.redirect("/categories");
  } catch (error) {
    let errorParam = null;

    if (error.name === 'SequelizeUniqueConstraintError') {
      errorParam = ERROR_TYPES.VALUE_EXISTS;
    }
    else {
      errorParam = ERROR_TYPES.INVALID_FORMAT;
    }

    res.redirect(`/categories/form/${id}?error=${errorParam}`);
  }
}

async function deleteCategory(req, res) {
  await db.deleteCategoryById(req.params.id);
  res.redirect("/categories");
}

module.exports = {
  getCategories,
  categoryGet,
  categoryFormGet,
  categoryPost,
  editCategoryFormGet,
  editCategoryFormPost,
  deleteCategory
};