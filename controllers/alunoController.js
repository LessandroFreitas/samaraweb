const Aluno = require("../models/aluno");

const criarAluno = async (req, res) => {

  try {  //colocado try catch para tratar erros
    const { nome, idade } = req.body;

    const novoAluno = new Aluno({
      nome,
      idade,
    });

    await novoAluno.save();

    res.status(201).json({ //criei status 201
      message: "Aluno criado com sucesso!",
      aluno: novoAluno,
    });
  } catch (error) {
    res.status(500).json({ //criei status 500 para erros de servidor
      message: "Erro ao criar aluno",
      error: error.message,
    });
  };

  const obterTodosAlunos = async (req, res) => {
    try {
      const alunos = await Aluno.find().populate('perfil');
      res.json(alunos);
    } catch (error) {
      res.status(500).json({ //criei status 500
        message: "Erro ao obter alunos",
        error: error.message,
      });
    }

    const deletarAluno = async (req, res) => {

      try {
        const { id } = req.params;

        await Aluno.deleteOne({ _id: id });
        res.json({ message: 'Aluno removido com sucesso!' });
      } catch (error) {
        res.status(500).json({
          message: "Erro ao deletar aluno",
          error: error.message,
        });
      }

      const editarAluno = async (req, res) => {

        try {
          const { id } = req.params;
          const { nome, idade } = req.body;

          let aluno = await Aluno.findByIdAndUpdate(id, { nome, idade });
          res.status(200).json({ // aqui já tinha
            message: 'Aluno atualizado com sucesso!',
            aluno,
          });
        } catch (error) { // acrecentei esse
          res.status(500).json({
            message: "Erro ao editar aluno",
            error: error.message,
          });
        }

        module.exports = {
          criarAluno,
          obterTodosAlunos,
          deletarAluno,
          editarAluno,
        };
      };
    };
  };
};