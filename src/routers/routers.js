const express = require("express");
const router = new express.Router();
//setting path for

// hbs view

router.get("/", (req, res) => {
  res.status(200).send("<h1>This your home page</h1>");
  console.log("home page started");
});
//exporting router
module.exports = router;
