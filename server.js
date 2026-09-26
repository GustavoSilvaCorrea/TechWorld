const express = require('express');

const app = express();
const PORT = 3000;

// Middleware para JSON
app.use(express.json());

// Rota básica
app.get('/', (req, res) => {
  res.json({ message: 'Server Rodando!' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

// npm run dev	(Rodar com nodemon)