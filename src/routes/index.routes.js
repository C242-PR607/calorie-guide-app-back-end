const { Router } = require("express");
const authRouter = require("./auth.routes");
const userRouter = require("./user.routes");

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter)

module.exports = router;