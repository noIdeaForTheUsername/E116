const express = require("express");
const path = require("path");
const femboyRouter = require("./routes/femboyRouter")

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", femboyRouter);

module.exports = app;