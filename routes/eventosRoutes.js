import { Router } from 'express';
import {
  listarEventos, buscarEventoPorId, criarEvento, atualizarEvento, cancelarEvento
} from '../controllers/eventosController.js';

const router = Router();
router.get('/', listarEventos);
router.get('/:id', buscarEventoPorId);
router.post('/', criarEvento);
router.patch('/:id', atualizarEvento);
router.delete('/:id', cancelarEvento); // cancelamento lógico, não apaga o evento
export default router;
