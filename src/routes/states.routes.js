import { Router } from 'express';
import { createEstado, deleteEstado, getEstado, getEstados, updateEstado } from '../controllers/states.controllers.js';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { authorizeRole } from '../middleware/roles.middleware.js';

const router = Router();

router.get('/estados', getEstados);

router.get('/estados/:id', getEstado);

router.post('/estados',  authenticateToken, authorizeRole('operador'), createEstado);

router.put('/estados/:id', authenticateToken, authorizeRole('operador'), updateEstado);
router.delete('/estados/:id', authenticateToken, authorizeRole('operador'), deleteEstado);

export default router;