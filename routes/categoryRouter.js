const { Router } = require("express");
const categoryController = require('../controllers/categoryController');

const categoryRouter = Router();

categoryRouter.get("/", categoryController.categoryGet);
categoryRouter.get("/form", categoryController.categoryFormGet);
categoryRouter.post("/form/create", categoryController.categoryPost);
categoryRouter.get("/form/:id", categoryController.editCategoryFormGet);
categoryRouter.post("/form/:id/edit", categoryController.editCategoryFormPost);
categoryRouter.get("/:id/delete", categoryController.deleteCategory);

module.exports = categoryRouter;