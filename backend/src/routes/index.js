const { Router } = require("express");

const { clientesRouter } = require("./clientes.routes");

const router = Router();

router.use("/clientes", clientesRouter);

module.exports = { router };
