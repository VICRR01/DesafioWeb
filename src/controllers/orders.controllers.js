import Ordenes from '../models/orders.models.js';
import { sequelize } from '../database/connection.js';

// Obtener todas las ordenes
export const getOrdenes = async (req, res) => {
  try {
    const ordenes = await Ordenes.findAll();
    res.json(ordenes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener ordenes', error });
  }
};

// Obtener una orden por id
export const getOrden = async (req, res) => {
  const { id } = req.params;
  try {
    const orden = await Ordenes.findByPk(id);
    if (!orden) {
      return res.status(404).json({ message: 'Orden no encontrado' });
    }
    res.json(orden);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener orden', error });
  }
};

// Crear una nueva orden
export const createOrden = async (req, res) => {
  try {
    const {
      usuario_idUsuario,
      estado_idEstado,
      fecha_creacion,
      direccion,
      telefono,
      correo_electronico,
      fecha_entrega,
      total_orden,
    } = req.body;

    // Query SQL
    const query = `
      INSERT INTO Ordenes 
      (usuario_idUsuario, estado_idEstado, fecha_creacion, direccion, telefono, correo_electronico, fecha_entrega, total_orden) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;

    // Ejecutar la consulta con parámetros seguros (replacements)
    const [results] = await sequelize.query(query, {
      replacements: [
        usuario_idUsuario,
        estado_idEstado,
        fecha_creacion,
        direccion,
        telefono,
        correo_electronico,
        fecha_entrega,
        total_orden,
      ],
    });

    res.status(201).json({
      message: 'Orden creado exitosamente',
      id: results, // Devuelve el ID insertado si es posible
    });
  } catch (error) {
    console.error('Error al ejecutar la consulta manual:', error);
    res.status(500).json({
      message: 'Error al crear orden manualmente',
      error: error.message,
    });
  }
};


// Actualizar orden
export const updateOrden = async (req, res) => {
  const { id } = req.params;
  const { usuario_idUsuario, estado_idEstado, fecha_creacion, direccion, telefono, correo_electronico, fecha_entrega, total_orden } = req.body;
  try {
    const query = `
      UPDATE Ordenes 
      SET usuario_idUsuario = ?, estado_idEstado = ?, fecha_creacion = ?, direccion = ?, telefono = ?, correo_electronico = ?, fecha_entrega = ?, total_orden = ?
      WHERE idOrden = ?;
    `;
    const [results] = await sequelize.query(query, {
      replacements: [
        usuario_idUsuario,
        estado_idEstado,
        fecha_creacion,
        direccion,
        telefono,
        correo_electronico,
        fecha_entrega,
        total_orden,
        id,
      ],
    });

    if (results.affectedRows === 0) {
      // Si no se actualizó ningún registro
      return res.status(404).json({
        message: 'Orden no encontrado o no se realizaron cambios',
      });
    }

    // Respuesta de éxito
    res.status(200).json({
      message: 'Orden actualizado correctamente',
    });
  } catch (error) {
    console.error('Error al actualizar el orden:', error);
    res.status(500).json({
      message: 'Error al actualizar el orden',
      error: error.message,
    });
  }
};

    // Eliminar orden
    export const deleteOrden = async (req, res) => {
  const { id } = req.params;
  try {
    await Ordenes.destroy({ where: { idOrden: id } });
    res.json({ message: 'Orden eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar orden', error });
  }
};      