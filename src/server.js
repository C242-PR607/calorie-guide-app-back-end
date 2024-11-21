const express = require("express");
require("dotenv").config();
const router = require("./routes");

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
