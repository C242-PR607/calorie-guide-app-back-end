const { Router } = require("express");
const AuthMiddleware = require("../middlewares/auth");
const AsyncHandler = require("../utils/asyncHandler");
const FoodController = require("../controllers/food.controller");

const router = Router();

router.get("/", AuthMiddleware.authenticate, AsyncHandler.asyncHandler(FoodController.getFoods));

module.exports = router;