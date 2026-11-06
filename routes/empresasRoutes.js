import { Router } from 'express';
import {
  listarEmpresas, buscarEmpresa, criarEmpresa, atualizarEmpresa
} from '../controllers/empresasController.js';

const router = Router();
router.get('/', listarEmpresas);
router.get('/:id', buscarEmpresa);
router.post('/', criarEmpresa);
router.patch('/:id', atualizarEmpresa);
export default router;
