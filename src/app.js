const express = require('express');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const teamRoutes = require('./routes/teamRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos do front-end (HTML, CSS, JS da pasta public)
app.use(express.static(path.join(__dirname, '../public')));

// Prefixos da API REST
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/teams', teamRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Middleware de tratamento de erro (último da cadeia)
app.use(errorHandler);

module.exports = app;