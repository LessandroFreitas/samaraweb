let mongoose = require("mongoose");

// Relacionamento: UM PARA UM com Aluno
// Cada perfil pertence a um único aluno e cada aluno tem um único perfil

let perfilSchema = new mongoose.Schema({
  matricula: String,
  telefone: String,
  endereco: String,
  aluno: { type: mongoose.Schema.Types.ObjectId, ref: "Aluno" },
});

module.exports = mongoose.model("Perfil", perfilSchema);