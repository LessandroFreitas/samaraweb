const express = require('express');
const app = express();
app.use(express.json());


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

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});