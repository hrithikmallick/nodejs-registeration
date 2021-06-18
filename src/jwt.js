const jwt = require("jsonwebtoken");
const tkStr = "mynameishrithikmallickiamawebdeveloper";
const createToke = async (req, res) => {
  const tkn = await jwt.sign({ _id: "60c9c942439a9b2e4c1c5cde" }, tkStr, {
    expiresIn: "5000",
  });
  console.log(tkn);
};
createToke();
// const checkToken = async (req, res) => {
//   const token =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM5Yzk0MjQzOWE5YjJlNGMxYzVjZGUiLCJpYXQiOjE2MjM4NTEyNDl9.o8J1EOhV6a42WCtRkhpS1LOyPdJ3GZGFSCmj8yhocFc";
//   const tkn = await jwt.verify(token, tkStr);
//   console.log(tkn);
// };
// checkToken();
