const express = require("express");
const cors = require("cors");

const app = express();

const clientes = [
  {
    id: 1,
    nome: "John Doe",
    email: "johndoe@domain.com",
    telefone: "121212212112",
  },
  {
    id: 2,
    nome: "Fulano",
    email: "fulano@domain.com",
    telefone: "255252252525",
  },
];

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Welcome to Express API"));

app.post("/api/clientes", (req, res) => {
  const { nome, email, telefone } = req.body;

  const cliente = {
    id: Number(Math.floor(Math.random() * 100)),
    nome,
    email,
    telefone,
  };

  clientes.push(cliente);

  return res.status(201).json();
});

app.delete("/api/clientes/:id", (req, res) => {
  const { id } = req.params;

  const clienteIndex = clientes.findIndex(
    (findCliente) => findCliente.id === Number(id)
  );

  if (clienteIndex < 0)
    return res.status(400).json({ error: "User does not exists." });

  clientes.splice(clienteIndex, 1);

  return res.status(204).json();
});

app.get("/api/clientes", (req, res) => {
  return res.json({ clientes });
});

module.exports = { app };
