import { Router } from "express";
import { getUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario  } from '../controllers/users.controllers.js';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { authorizeRole } from '../middleware/roles.middleware.js';
import { getUserProfile } from '../controllers/users.controllers.js';

const router = Router();

router.get('/usuarios', authenticateToken, authorizeRole('operador'), getUsuarios);

router.get('/usuarios/:id', authenticateToken, getUsuario);
router.post('/usuarios', authenticateToken, authorizeRole('operador'), createUsuario);
router.put('/usuarios/:id', authenticateToken, updateUsuario);

router.delete('/usuarios/:id', authenticateToken, deleteUsuario);

router.get('/me', authenticateToken, getUserProfile);

export default router;