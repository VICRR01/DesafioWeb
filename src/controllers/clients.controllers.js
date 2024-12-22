import Clientes from "../models/clients.models.js";
import { sequelize } from '../database/connection.js';

export const getClientes = async (req, res) => {
    try {
        const clientes = await Clientes.findAll();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener clientes", error });
    }
};

export const getCliente = async (req, res) => {
    const { id } = req.params;
    try {
        const cliente = await Clientes.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener cliente", error });
    }
};

export const createCliente = async (req, res) => {
    try {
        const {
            razon_social,
            nombre_comercial,
            direccion_entrega,
            telefono,
            email,
        } = req.body;

        // Query SQL
        const query = `
            INSERT INTO Clientes 
            (razon_social, nombre_comercial, direccion_entrega, telefono, email)
            VALUES (?, ?, ?, ?, ?);
        `;

        // Ejecutar la consulta con parámetros seguros (replacements)
        const [results] = await sequelize.query(query, {
            replacements: [
                razon_social,
                nombre_comercial,
                direccion_entrega,
                telefono,
                email,
            ],
        });

        res.status(201).json({
            message: "Cliente creado exitosamente",
            id: results, // Devuelve el ID insertado si es posible
        });
    } catch (error) {
        console.error("Error al ejecutar la consulta manual:", error);
        res.status(500).json({
            message: "Error al crear cliente manualmente",
            error: error.message,
        });
    }
};


export const updateCliente = async (req, res) => {
    const { id } = req.params;
    const { razon_social, nombre_comercial, direccion_entrega, telefono, email} = req.body;
    try {
        const query = `
            UPDATE Clientes 
            SET razon_social = ?, nombre_comercial = ?, direccion_entrega = ?, telefono = ?, email = ?
            WHERE idCliente = ?;
        `;
        const [results] = await sequelize.query(query, {
            replacements: [
                razon_social,
                nombre_comercial,
                direccion_entrega,
                telefono,
                email,
                id,
            ],
        });

        if (results.affectedRows === 0) {
            // Si no se actualizó ningún registro
            return res.status(404).json({
                message: "Cliente no encontrado o no se realizaron cambios",
            });
        }

        // Respuesta de éxito
        res.status(200).json({
            message: "Cliente actualizado correctamente",
        });
    } catch (error) {
        console.error("Error al actualizar el cliente:", error);
        res.status(500).json({
            message: "Error al actualizar el cliente",
            error: error.message,
        });
    }
};

// Eliminar cliente
export const deleteCliente = async (req, res) => {
    const { id } = req.params;
    try {
        await Clientes.destroy({ where: { idCliente: id } });
        res.json({ message: "Cliente eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar cliente", error });
    }
};