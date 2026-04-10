require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// ⚠️ CORS: necessário para o frontend na Vercel conseguir chamar o backend no Render
app.use(cors({
  origin: '*', // Em produção, troque por: process.env.FRONTEND_URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'authorization']
}));

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

// Rota de health check — útil para ver se o Render subiu certo
app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3000;

// Ping a cada 13 minutos para o Render não dormir
const https = require('https');
setInterval(() => {
  https.get('https://samaraweb.onrender.com/health', (res) => {
    console.log(`[Keep-alive] ping: ${res.statusCode}`);
  }).on('error', (err) => {
    console.log(`[Keep-alive] erro: ${err.message}`);
  });
}, 13 * 60 * 1000); // 13 minutos em ms

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});