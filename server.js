const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const routes = require("./routes/news_routes");
const externalRoutes = require("./routes/external_routes");
//const userRoutes = require("./routes/user_routes");
//const swaggerUi = require("swagger-ui-express");
//const swaggerDocument = require("./resources/swagger.json");
//const path = require("path");
const databaseConnection  = require("./config/database_config");

const app = express();
configureApp();

function configureApp() {
  app.use(express.json());
  app.use("/api", routes);
  app.use("/api", externalRoutes);
  //app.use(express.static(path.join(__dirname, "public")));
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`Server Started at ${port}`);
  });
}
databaseConnection();

