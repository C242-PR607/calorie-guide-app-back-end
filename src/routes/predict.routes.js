const { Router } = require("express");
const AuthMiddleware = require("../middlewares/auth");
const PredictController = require("../controllers/predict.controller");
const AsyncHandler = require("../utils/asyncHandler");

const router = Router();

router.post("/", AuthMiddleware.authenticate, AsyncHandler.asyncHandler(PredictController.predict));

module.exports = router;
