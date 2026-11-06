import { Router } from 'express';
import {
  inscreverUsuario, listarInscricoesUsuario, listarInscricoesEvento, cancelarInscricao
} from '../controllers/inscricoesController.js';

const router = Router();
router.post('/', inscreverUsuario);
router.get('/usuario/:usuarioId', listarInscricoesUsuario);
router.get('/evento/:eventoId', listarInscricoesEvento);
router.patch('/:id/cancelar', cancelarInscricao);
export default router;
