import { Router } from 'express';
import { createCateriaProductos, deleteCateriaProducto, getCateriaProducto, getCateriaProductos, updateCateriaProductos } from '../controllers/productsCategory.controllers.js';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { authorizeRole } from '../middleware/roles.middleware.js';

const router = Router();

router.get('/categorias', getCateriaProductos);

router.get('/categorias/:id', getCateriaProducto);

router.post('/categorias', authenticateToken, authorizeRole('operador'), createCateriaProductos);

router.put('/categorias/:id', authenticateToken, authorizeRole('operador'), updateCateriaProductos);
router.delete('/categorias/:id', authenticateToken, authorizeRole('operador'), deleteCateriaProducto);

export default router;