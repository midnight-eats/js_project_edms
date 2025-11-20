const { Router } = require("express");
const { positionGet, positionPost, positionFormGet, deletePosition } = require('../controllers/positionController');

const positionRouter = Router();

positionRouter.get("/", positionGet);
positionRouter.get("/form", positionFormGet);
positionRouter.post("/form/create", positionPost);
positionRouter.get("/:id/delete", deletePosition);

module.exports = positionRouter;