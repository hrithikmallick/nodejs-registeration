// connection to the server
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/Registration", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("db connect and server is ready to use");
  })
  .catch((err) => {
    console.log(err);
  });
// here mongoose return  promises
