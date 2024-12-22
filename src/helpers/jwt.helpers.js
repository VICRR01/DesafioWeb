import jwt from 'jsonwebtoken';

// Clave secreta y tiempo de expiración
const secretKey = process.env.JWT_SECRET_KEY;
const expiresIn = process.env.JWT_EXPIRES_IN || '1d';

// Mapa de roles para convertir IDs en nombres
const roleMap = {
  1: 'cliente',
  2: 'operador',
};

/**
 * Generar un token JWT
 * @param {Object} payload - Los datos que se incluirán en el token
 * @returns {string} - El token generado
 */
export const generateToken = (payload) => {
  if (!secretKey) {
    throw new Error('La clave JWT_SECRET_KEY no está definida en el archivo .env');
  }

  // Convertir el ID del rol al nombre del rol
  if (payload.rol_idRol) {
    const roleName = roleMap[payload.rol_idRol];
    if (!roleName) {
      throw new Error(`Rol no válido: ${payload.rol_idRol}`);
    }
    payload.rol = roleName; // Agregar el nombre del rol al payload
    delete payload.rol_idRol; // Opcional: eliminar el ID del rol si no es necesario
  }

  return jwt.sign(payload, secretKey, { expiresIn });
};

/**
 * Verificar un token JWT
 * @param {string} token - El token JWT a verificar
 * @returns {Object} - Los datos decodificados del token si es válido
 */
export const verifyToken = (token) => {
  if (!secretKey) {
    throw new Error('La clave JWT_SECRET_KEY no está definida en el archivo .env');
  }
  return jwt.verify(token, secretKey);
};
