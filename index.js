const express = require("express");
const app = require("./App.js");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT||7000;

// Parse JSON bodies (as sent by API clients)
mongoose.set("strictQuery", false);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Connect to DATABASE
const dbUrl = process.env.dbURL;
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected to Database");
    app.listen(PORT, () => console.log(` listening on port ${PORT}!`));
  })
  .catch((err) => {
    console.log(err);
  });
