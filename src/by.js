const bcript = require("bcryptjs");

const scurePass = async (pass) => {
  console.log(pass);
  const spass = await bcript.hash(pass, 10);
  console.log(spass);
};
// scurePass("hrithik");

const comparePass = async (old, npass) => {
  const pass = await bcript.compare(old, npass);
  if (pass) {
    console.log("passwords are matched");
  } else {
    console.log("login failed");
  }
};
const npass = "$2a$12$fznDBkxW59ahwZAgAdWK7OAgSx.lCEyYBXuzNnPE5b9K0XKWQQm4W";
const old = "hrithik";
comparePass(old, npass);
