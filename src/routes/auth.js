const { Router } = require("express");
const AuthController = require("../controllers/auth");
const AsyncHandler = require("../utils/asyncHandler");
const AuthMiddleware = require("../middlewares/auth");

const router = Router();

router.post("/register", AsyncHandler.asyncHandler(AuthController.register));
router.post("/verify_otp", AsyncHandler.asyncHandler(AuthController.verifyOTP));
router.post("/user_info", AuthMiddleware.authenticate, AsyncHandler.asyncHandler(AuthController.addUserInfo));
router.post("/login", AsyncHandler.asyncHandler(AuthController.login));
router.post("/logout", AuthMiddleware.authenticate, AsyncHandler.asyncHandler(AuthController.logout));

module.exports = router;