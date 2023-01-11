require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const start = require("./event_Listener");

app.use(cors());

app.use(express.json());

start();

app.use("/", require("./routes/bridgeRoutes"));

app.listen(process.env.PORT || 3001, () => {
  console.log("listening on port " + (process.env.PORT || 3001));
});
