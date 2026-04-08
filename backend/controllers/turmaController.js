const Turma = require("../models/turma");
const Aluno = require("../models/aluno");
const Professor = require("../models/professor");

const criarTurma = async (req, res) => {

  try {
    const { nome, alunosIds, professorId } = req.body;

    const novaTurma = new Turma({
      nome,
      alunos: alunosIds,
      professor: professorId,
    });

    await novaTurma.save();

    res.json({
      message: "Turma criada com sucesso!",
      turma: novaTurma,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao criar turma",
      error: error.message,
    });
  }
};
const obterTodasTurmas = async (req, res) => {
  try {
    const turmas = await Turma.find().populate('alunos professor');
    res.json(turmas);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao obter turmas",
      error: error.message,
    });
  }
};

const deletarTurma = async (req, res) => {
  try {
    const { id } = req.params;

    await Turma.deleteOne({ _id: id });
    res.json({ message: "Turma removida com sucesso!" });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao deletar turma",
      error: error.message,
    });
  }
};

const editarTurma = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, alunosIds, professorId } = req.body;

    let turma = await Turma.findByIdAndUpdate(id, { nome, alunos: alunosIds, professor: professorId });
    res.status(200).json({
      message: "Turma atualizada com sucesso!",
      turma,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao atualizar a turma",
      error: error.message,
    });

  };
};

module.exports = {
  criarTurma,
  obterTodasTurmas,
  deletarTurma,
  editarTurma,
};