const { Router } = require("express");
const AuthController = require("../controllers/auth.controller");
const AsyncHandler = require("../utils/asyncHandler");
const AuthMiddleware = require("../middlewares/auth");

const router = Router();

router.post("/register", AsyncHandler.asyncHandler(AuthController.register));
router.post("/verify-otp", AuthMiddleware.authenticate, AsyncHandler.asyncHandler(AuthController.verifyOTP));
router.post("/login", AsyncHandler.asyncHandler(AuthController.login));
router.post("/logout", AuthMiddleware.authenticate, AsyncHandler.asyncHandler(AuthController.logout));
router.post("/forgot-password", AsyncHandler.asyncHandler(AuthController.forgotPassword));
router.put("/reset-password", AuthMiddleware.authenticate, AsyncHandler.asyncHandler(AuthController.resetPassword));

module.exports = router;
