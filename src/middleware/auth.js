const jwt = require("jsonwebtoken");
//importing model
const UsData = require("../models/schema");
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    console.log(verifyUser);
    const user = await UsData.findOne({ _id: verifyUser._id });
    console.log(`${user.firstname} ${user.lastname} pass authentication`);
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.status(400).render("login");
    console.log(err);
  }
};
module.exports = auth;
