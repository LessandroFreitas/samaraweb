let mongoose = require("mongoose");

// Relacionamentos:
// MUITOS PARA MUITOS com Aluno     (uma turma tem vários alunos, um aluno pode estar em várias turmas)
// MUITOS PARA UM com Professor (uma turma tem um professor)

let turmaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  alunos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Aluno" }],
  professor: { type: mongoose.Schema.Types.ObjectId, ref: "Professor" }
});

module.exports = mongoose.model("Turma", turmaSchema);