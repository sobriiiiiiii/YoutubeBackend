const express = require("express");
const Subscriber = require("./src/models/subscriber");
const path = require("path");


//invoking express function
const app = express();

//routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

//to get all subscribers
app.get("/subscribers", async (req, res, next) => {
  try {
    let subscribers = await Subscriber.find();
    res.status(200).json(subscribers);
  } catch (error) {
    res.status(500);
    next(error);
  }
});

//get all subscibers names and subscribed channel names
app.get("/subscribers/names", async (req, res, next) => {
  try {
    let subscribers = await Subscriber.find(
      {},
      { name: 1, subscribedChannel: 1, _id: 0 }
    );
    res.status(200).json(subscribers);
  } catch (error) {
    res.status(500);
    next(error);
  }
});

//get the subscriber by id and handle 400
app.get("/subscribers/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let subscriber = await Subscriber.findById(id);
    res.status(200).json(subscriber);
  } catch (error) {
    res.status(400).json({ message: "Subsciber doesn't exist" });
  }
});











module.exports = app;
