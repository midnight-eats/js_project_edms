const { Router } = require("express");
const positionController = require('../controllers/positionController');

const positionRouter = Router();

positionRouter.get("/", positionController.positionGet);
positionRouter.get("/form", positionController.positionFormGet);
positionRouter.post("/form/create", positionController.positionPost);
positionRouter.get("/form/:id", positionController.editPositionFormGet);
positionRouter.post("/form/:id/edit", positionController.editPositionFormPost);
positionRouter.get("/:id/delete", positionController.deletePosition);

module.exports = positionRouter;