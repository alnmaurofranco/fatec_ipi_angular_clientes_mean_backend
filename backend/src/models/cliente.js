const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  telefone: {
    type: String,
    required: false,
    default: "0000-0000",
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Cliente", clientSchema);
