const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/database');
const routes = require('./routes/routes');

const app = express();

// Conecta ao Banco de Dados
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas da Aplicação
app.use('/api', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});