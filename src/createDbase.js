const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");
const data = require("./mydata");
require("dotenv").config();

// Connect to database
const dbUrl = process.env.dbURL;
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });

// Refresh data in subscribers collection
async function refreshAllData() {
  try {
    await Subscriber.deleteMany({}, { wtimeout: 30000 });

    console.log("Deleted all subscribers");
    const newSubscribers = await Subscriber.insertMany(data);
    console.log(`Added ${newSubscribers.length} new subscribers`);
  } catch (err) {
    console.log("Error refreshing data", err);
  } finally {
    mongoose.disconnect();
    console.log("Disconnected from database");
  }
}

refreshAllData();
