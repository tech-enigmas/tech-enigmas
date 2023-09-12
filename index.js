"use strict";

require("dotenv").config();
const app = require("./src/server");
const { db } = require("./src/models/index");
// const PORT = process.env.PORT || 3001;

db.sync().then(() => {
  app.start(process.env.PORT || 3001);
});
