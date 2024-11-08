const mongoose = require("mongoose");
require("dotenv").config();

const databaseConnection = function connectToDatabase() {
  const mongoString = "mongodb://localhost:27017/newsdb";
  mongoose
    .connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("MongoDB connection established");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });

  const database = mongoose.connection;
  database.on("error", (error) => {
    console.log(error);
  });

  database.once("connected", () => {
    console.log("Database Connected to " + database.name);
  });
};

module.exports = databaseConnection;