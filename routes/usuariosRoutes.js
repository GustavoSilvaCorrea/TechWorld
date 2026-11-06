import { Router } from 'express';
import { buscarUsuario, criarUsuario, listarUsuarios } from '../controllers/usuariosController.js';

const router = Router();
router.get('/', listarUsuarios);
router.get('/:id', buscarUsuario);
router.post('/', criarUsuario);
export default router;
