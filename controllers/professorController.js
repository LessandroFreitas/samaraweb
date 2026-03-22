const Professor = require("../models/professor");

const criarProfessor = async (req, res) => {
  try {
    const { nome, idade, disciplinasIds } = req.body;

    const novoProfessor = new Professor({
      nome,
      idade,
      disciplinas: disciplinasIds
    });

    await novoProfessor.save();

    res.json({
      message: "Professor criado com sucesso!",
      professor: novoProfessor,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao criar professor",
      error: error.message,
    });
  }

  const obterTodosProfessores = async (req, res) => {
    try {
      const professores = await Professor.find().populate('disciplinas');
      res.json(professores);
    } catch (error) {
      res.status(500).json({
        message: "Erro ao obter professores",
        error: error.message,
      });
    }

    const deletarProfessor = async (req, res) => {
      try {
        const { id } = req.params;

        await Professor.deleteOne({ _id: id });
        res.json({ message: "Professor removido com sucesso!" });
      } catch (error) {
        res.status(500).json({
          message: "Erro ao deletar professor",
          error: error.message,
        });
      }

      const editarProfessor = async (req, res) => {
        try {
          const { id } = req.params;
          const { nome, idade, disciplinasIds } = req.body;

          let professor = await Professor.findByIdAndUpdate(id, { nome, idade, disciplinas: disciplinasIds });
          res.status(200).json({
            message: "Professor atualizado com sucesso!",
            professor,
          });
        } catch (error) {
          res.status(500).json({
            message: "Erro ao atualizar professor",
            error: error.message,
          });

        };
      };
    };
  };
};

module.exports = {
  criarProfessor,
  obterTodosProfessores,
  deletarProfessor,
  editarProfessor,
}