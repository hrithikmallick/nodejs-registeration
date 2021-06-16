const express = require("express");
const bcript = require("bcryptjs");
const app = express();
// connect to db file
require("./db/conn");
//port selceted for local and server
const port = process.env.PORT || 8085;
const path = require("path");
const hbs = require("hbs");
//setting all path for src file
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
// setting view engine
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);
app.use(express.static(static_path));
//importing model
const UsData = require("./models/schema");
app.use(express.json());
//use for encoder
app.use(express.urlencoded({ extended: false }));
//home page
app.get("/", (req, res) => {
  res.render("register");
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

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await UsData.findOne({ email: email });
    const pass = await bcript.compare(password, user.password);
    if (pass) {
      console.log(`${user.firstname} log in our system`);
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
