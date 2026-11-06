import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import eventosRoutes from './routes/eventosRoutes.js';
import inscricoesRoutes from './routes/inscricoesRoutes.js';
import empresasRoutes from './routes/empresasRoutes.js';
import usuariosRoutes from './routes/usuariosRoutes.js';

const app = express();
app.use(cors()); // Em produção, limite para o domínio do TechWorld.
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/eventos', eventosRoutes);
app.use('/api/inscricoes', inscricoesRoutes);
app.use('/api/empresas', empresasRoutes);
app.use('/api/usuarios', usuariosRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ erro: 'Erro interno do servidor.' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`TechWorld API rodando na porta ${port}`));
