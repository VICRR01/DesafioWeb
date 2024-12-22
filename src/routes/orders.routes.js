import { Router } from 'express';
import { createOrden, deleteOrden, getOrden, getOrdenes, updateOrden } from '../controllers/orders.controllers.js';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { authorizeRole } from '../middleware/roles.middleware.js';

const router = Router();

router.get('/ordenes', authenticateToken, authorizeRole('operador'), getOrdenes);

router.get('/ordenes/:id', getOrden);

router.post('/ordenes',  authenticateToken, authorizeRole('cliente'), createOrden);

router.put('/ordenes/:id', updateOrden);

router.delete('/ordenes/:id', deleteOrden);

export default router;