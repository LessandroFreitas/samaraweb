const Perfil = require("../models/perfil");
const Aluno = require("../models/aluno");

const criarPerfil = async (req, res) => {

  try {
    const { matricula, telefone, endereco, alunoId } = req.body;

    const novoPerfil = new Perfil({
      matricula,
      telefone,
      endereco,
      aluno: alunoId,
    });

    await novoPerfil.save();

    await Aluno.updateOne(
      { _id: alunoId },
      { $set: { perfil: novoPerfil._id } }
    );

    res.json({
      message: "Perfil criado com sucesso!",
      perfil: novoPerfil,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao criar perfil",
      error: error.message,
    });
  }
};

const obterTodosPerfis = async (req, res) => {

  try {
    const perfis = await Perfil.find().populate('aluno');
    res.json(perfis);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao obter perfis",
      error: error.message,
    });
  }
};

const deletarPerfil = async (req, res) => {
  const { id } = req.params;

  try {
    await Perfil.deleteOne({ _id: id });
    res.status(200).json({ message: "Perfil removido com sucesso!" });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao deletar perfil",
      error: error.message,
    });
  }
};

const editarPerfil = async (req, res) => {

  try {
    const { id } = req.params;
    const { matricula, telefone, endereco, alunoId } = req.body;

    let perfil = await Perfil.findByIdAndUpdate(id, { matricula, telefone, endereco, aluno: alunoId });
    res.status(200).json({
      message: "Perfil atualizado com sucesso!",
      perfil,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao atualizar o perfil",
      error: error.message,
    });
  }
};


module.exports = {
  criarPerfil,
  obterTodosPerfis,
  deletarPerfil,
  editarPerfil,
};