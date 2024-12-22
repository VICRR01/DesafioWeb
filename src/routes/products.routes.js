import { Router } from 'express';
import { createProducto, deleteProducto, getProducto, getProductos, updateProducto } from '../controllers/products.controllers.js';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { authorizeRole } from '../middleware/roles.middleware.js';

const router = Router();

router.get('/productos', getProductos);

router.get('/productos/:id', getProducto);

router.post('/productos', authenticateToken, authorizeRole('operador'), createProducto);

router.put('/productos/:id', authenticateToken, authorizeRole('operador'), updateProducto);

router.delete('/productos/:id', authenticateToken, authorizeRole('operador'), deleteProducto);

export default router;