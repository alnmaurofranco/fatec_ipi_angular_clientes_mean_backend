require("dotenv").config();
const express = require("express");
const cors = require("cors");

const Cliente = require("./src/models/cliente");

const app = express();

// Conexão ao banco de dados
require("./src/database");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Welcome to Express API"));

app.post("/api/clientes", async (req, res) => {
  const { nome, email, telefone } = req.body;

  const cliente = new Cliente({
    nome,
    email,
    telefone,
  });

  await cliente.save();

  return res.status(201).json();
});

app.get("/api/clientes/:id", async (req, res) => {
  const { id } = req.params;

  const cliente = await Cliente.findOne({ _id: id });

  return res.json(cliente);
});

app.delete("/api/clientes/:id", async (req, res) => {
  const { id } = req.params;

  await Cliente.deleteOne({ _id: id });

  return res.status(204).json();
});

app.get("/api/clientes", async (req, res) => {
  const clientes = await Cliente.find();

  return res.json({ clientes });
});

module.exports = { app };
