require("dotenv").config();
const express = require("express");
const bcript = require("bcryptjs");
const path = require("path");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");
const app = express();
// connect to db file
require("./db/conn");
//port selceted for local and server
const port = process.env.PORT || 8085;

//setting all path for src file
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

//importing model
const UsData = require("./models/schema");
const auth = require("./middleware/auth");

// setting view engine
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);
//middleware
app.use(cookieParser());
app.use(express.static(static_path));
//req body
app.use(express.json());
//use for encoder
app.use(express.urlencoded({ extended: false }));
//home page
app.get("/", auth, (req, res) => {
  res.status(200).render("index");
});
app.get("/register", (req, res) => {
  res.status(200).render("register");
});
// post method for creating reecors in db
app.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;
    if (password === cpassword) {
      const user = new UsData({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        gender: req.body.gender,
        phone: req.body.phone,
        dob: req.body.dob,
        quest: req.body.quest,
        password: req.body.password,
      });
      const token = await user.generatAuthToken();
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 100000),
        httpOnly: true,
      });
      console.log(token);
      console.log(
        `data save on our db of ${req.body.firstname} ${req.body.lastname}`
      );
      await user.save();
      res.status(201).render("index");
    } else {
      res.send("password did not matched");
    }
  } catch (err) {
    res.status(400).send(`some error occur ${err}`);
    console.log(err);
  }
});
app.get("/login", (req, res) => {
  res.status(200).render("login");
});
app.get("/about", auth, (req, res) => {
  // console.log(req.user);
  res.status(200).render("about");
});
app.get("/logout", auth, async (req, res) => {
  try {
    // console.log(req.user);
    res.clearCookie("jwt");
    //using filter method to delete token in our db
    req.user.tokens = req.user.tokens.filter((key) => {
      return key.token !== req.token;
    });
    console.log(
      ` ${req.user.firstname} ${req.user.lastname} logout succesfully`
    );
    await req.user.save();
    res.render("login");
  } catch (error) {}
});
app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await UsData.findOne({ email: email });
    const pass = await bcript.compare(password, user.password);
    if (pass) {
      console.log(`${user.firstname} ${user.lastname} log in our Website`);
      const token = await user.generatAuthToken();
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 100000),
        httpOnly: true,
        // secure: true,
      });

      res.status(201).render("index");
    } else {
      res.send("invalid creadintial");
    }
  } catch (error) {
    res.send("invalid creadintial" + error);
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
