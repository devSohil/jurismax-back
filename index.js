const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

app.use("/user", require("./routes/user.route"));
app.listen(process.env.PORT || 4000, () => {
  console.log("server running ");
});
