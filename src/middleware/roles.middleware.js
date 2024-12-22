export const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    const { user } = req; // Aquí obtenemos el usuario desde el middleware de autenticación

    if (!user) {
      return res.status(403).json({ message: 'Usuario no autenticado' });
    }

    // Comprobar si el rol del usuario está dentro de los roles permitidos
    if (!allowedRoles.includes(user.rol)) {
      return res.status(403).json({ message: 'Acceso denegado: rol insuficiente' });
    }

    next(); // Si el rol es válido, seguimos con la solicitud
  };
};



