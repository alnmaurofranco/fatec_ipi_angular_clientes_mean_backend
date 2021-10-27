const { Router, response } = require("express");

const Cliente = require("./../models/cliente");

const clientesRouter = Router();

clientesRouter.get("/", async (req, res) => {
  const clientes = await Cliente.find();

  return res.json({ clientes });
});

clientesRouter.post("/", async (req, res) => {
  const { nome, email, telefone } = req.body;

  const cliente = new Cliente({
    nome,
    email,
    telefone,
  });

  await cliente.save();

  return res.status(201).json({ id: cliente._id });
});

clientesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const cliente = await Cliente.findOne({ _id: id });

  return res.json(cliente);
});

clientesRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const cliente = await Cliente.findOne({ _id: id });

  if (!cliente) {
    response.status(400).json("User does not exists.");
  }

  //await Cliente.findByIdAndDelete(cliente._id);

  await Cliente.deleteOne(cliente._id); // or { _id: id }

  return res.status(204).json();
});

module.exports = { clientesRouter };
