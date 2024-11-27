const { Router } = require("express");
const AuthMiddleware = require("../middlewares/auth");
const AsyncHandler = require("../utils/asyncHandler");
const UserController = require("../controllers/user.controller");

const router = Router();

router.post("/me", AuthMiddleware.authenticate, AsyncHandler.asyncHandler(UserController.addUserInfo));
router.get("/me", AuthMiddleware.authenticate, AsyncHandler.asyncHandler(UserController.showProfile));
router.patch("/me", AuthMiddleware.authenticate, AsyncHandler.asyncHandler(UserController.updateProfile));
router.put("/me/password", AuthMiddleware.authenticate, AsyncHandler.asyncHandler(UserController.changePassword));
router.delete("/me", AuthMiddleware.authenticate, AsyncHandler.asyncHandler(UserController.deleteAccount));

module.exports = router;