const express = require("express");
const router = express.Router();
const alunoController = require("../controllers/alunoController.js");
const { autenticar } = require("../middlewares/autenticar.js"); //add essa linha para importar o middleware de autenticação

router.get("/aluno", autenticar, alunoController.obterTodosAlunos);
router.post("/aluno", alunoController.criarAluno);
router.delete("/aluno/:id", alunoController.deletarAluno);
router.put("/aluno/:id", alunoController.editarAluno);

module.exports = router;