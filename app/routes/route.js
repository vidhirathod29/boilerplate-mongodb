const express = require("express");
const router = express.Router();
const categoryRoute = require("./categoryRoute");
const route = require("./route");

router.use("/category", categoryRoute);

module.exports = router;
