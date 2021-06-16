const mongoose = require("mongoose");
const validator = require("validator");
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
  confirmpassword: {
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
});
//create model for collection creation
const UsData = mongoose.model("user", regSchema);
//export the model
module.exports = UsData;
