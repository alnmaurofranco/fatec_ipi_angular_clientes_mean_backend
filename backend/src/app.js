require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { router } = require("./routes");

const app = express();

// Conexão ao banco de dados
require("./database");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Welcome to Express API"));
app.use("/api", router);

module.exports = { app };
