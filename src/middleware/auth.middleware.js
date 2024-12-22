import { verifyToken } from '../helpers/jwt.helpers.js';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verificar si el encabezado contiene el token
  if (!authHeader) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1]; // Esperamos "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Token no válido' });
  }

  try {
    // Verificar el token
    const decoded = verifyToken(token);  // Decodificando el token JWT
    //console.log(decoded);  // Esto debería mostrar el contenido del token
    req.user = decoded;  // Guardar los datos del usuario en req.user para usarlos en el endpoint
    next(); // Continuar con la siguiente función
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido o expirado', error: error.message });
  }
};
