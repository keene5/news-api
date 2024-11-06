const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
require("dotenv").config();
const routes = require("./routes/news_routes");
const externalRoutes = require("./routes/external_routes");
const userRoutes = require("./routes/user_routes");
//const path = require("path");
const databaseConnection  = require("./config/database_config");

const app = express();
configureApp();

function configureApp() {
  app.use(express.json());
  app.use("/api", routes);
  app.use("/api", userRoutes);
  app.use("/api", externalRoutes);
  app.use(cors);
  //app.use(express.static(path.join(__dirname, "public")));
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`Server Started at ${port}`);
  });
}
databaseConnection();

