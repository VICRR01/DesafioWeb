import { Router } from "express";
import { getClientes, getCliente, createCliente, updateCliente, deleteCliente  } from '../controllers/clients.controllers.js';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { authorizeRole } from '../middleware/roles.middleware.js';

const router = Router();

router.get('/clientes', authenticateToken, authorizeRole('operador'), getClientes);

router.get('/clientes/:id', authenticateToken, authorizeRole('operador', 'cliente'), getCliente);

router.post('/clientes', authenticateToken, authorizeRole('operador'), createCliente);
router.put('/cliente/:id', authenticateToken, authorizeRole('operador'), updateCliente);
router.delete('/cliente/:id', authenticateToken, authorizeRole('operador'), deleteCliente);

export default router;