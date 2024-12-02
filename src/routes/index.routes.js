const { Router } = require("express");
const authRouter = require("./auth.routes");
const userRouter = require("./user.routes");
const foodRouter = require("./food.routes");
const predictRouter = require("./predict.routes");

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/foods", foodRouter);
router.use("/predicts", predictRouter);

module.exports = router;
