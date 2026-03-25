require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const db = require('./database/db.js');


const alunoRoutes = require('./routes/alunoRoutes.js');
const professorRoutes = require("./routes/professorRoutes.js");
const turmaRoutes = require("./routes/turmaRoutes.js");
const disciplinaRoutes = require('./routes/disciplinaRoutes.js');
const tarefaRoutes = require('./routes/tarefaRoutes.js');
const perfilRoutes = require("./routes/perfilRoutes.js");
const authRoutes = require('./routes/authRoutes.js');


app.use(alunoRoutes);
app.use(professorRoutes);
app.use(turmaRoutes);
app.use(disciplinaRoutes);
app.use(tarefaRoutes);
app.use(perfilRoutes);
app.use(authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});