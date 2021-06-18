require("dotenv").config();
const mongoose = require("mongoose");
const validator = require("validator");
const bcript = require("bcryptjs");
const jwt = require("jsonwebtoken");
const regSchema = new mongoose.Schema({
  firstname: {
    type: String,
    min: 3,
  },
  lastname: {
    type: String,
    min: 3,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Emali should be uniq"],
    //using custome validation from validator package
    validator(val) {
      if (!validator.isEmail(val)) {
        throw new Error("Invalid Email");
      }
    },
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    min: 10,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  quest: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
const tkStr = process.env.SECRET_KEY;
//checking and genrating token
regSchema.methods.generatAuthToken = async function () {
  try {
    const tkn = await jwt.sign({ _id: this._id }, tkStr);
    this.tokens = this.tokens.concat({ token: tkn });
    await this.save();
    return tkn;
  } catch (error) {
    console.log(error);
  }
};

//hashing password
regSchema.pre("save", async function (next) {
  //is modified for updation
  if (this.isModified("password")) {
    this.password = await bcript.hash(this.password, 10);
  }
  next();
});

//create model for collection creation
const UsData = mongoose.model("user", regSchema);
//export the model
module.exports = UsData;
