import Estados from '../models/states.models.js';
import { sequelize } from '../database/connection.js';

// Obtener todos los estados
export const getEstados = async (req, res) => {
  try {
    const estados = await Estados.findAll();
    res.json(estados);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener estados', error });
  }
};

// Obtener un estado por id
export const getEstado = async (req, res) => {
  const { id } = req.params;
  try {
    const estado = await Estados.findByPk(id);
    if (!estado) {
      return res.status(404).json({ message: 'Estado no encontrado' });
    }
    res.json(estado);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener estado', error });
  }
};

// Crear un nuevo estado
export const createEstado = async (req, res) => {
  try {
    const {
      nombre,
    } = req.body;

    // Query SQL
    const query = `
      INSERT INTO Estados 
      (nombre) 
      VALUES (?);
    `;

    // Ejecutar la consulta con parámetros seguros (replacements)
    const [results] = await sequelize.query(query, {
      replacements: [
        nombre,
      ],
    });

    res.status(201).json({
      message: 'Estado creado exitosamente',
      id: results, // Devuelve el ID insertado si es posible
    });
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    res.status(500).json({
      message: 'Error al crear estado',
      error: error.message,
    });
  }
};


// Actualizar estado
export const updateEstado = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const query = `
      UPDATE Estados 
      SET nombre = ?
      WHERE idEstado = ?;
    `;
    const [results] = await sequelize.query(query, {
      replacements: [
        nombre,
        id,
      ],
    });

    if (results.affectedRows === 0) {
      // Si no se actualizó ningún registro
      return res.status(404).json({
        message: 'Producto no encontrado o no se realizaron cambios',
      });
    }

    // Respuesta de éxito
    res.status(200).json({
      message: 'Producto actualizado correctamente',
    });
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({
      message: 'Error al actualizar el producto',
      error: error.message,
    });
  }
};

// Eliminar estado
export const deleteEstado = async (req, res) => {
  const { id } = req.params;
  try {
    await Estados.destroy({ where: { idEstado: id } });
    res.json({ message: 'Estado eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar estado', error });
  }
};