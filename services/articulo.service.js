const articuloModel = require('../models/articulo.model');
const { sql, getConnection } = require('../config/db');

const crearArticulo = async ({ nombre, descripcion, precio }) => {
    console.log('DATA EN SERVICE:', { nombre, descripcion, precio });

    if (!nombre || !precio) {
        throw new Error('Nombre y precio son obligatorios');
    }

    return await articuloModel.crear({
        nombre,
        descripcion,
        precio
    });
};

const obtenerArticulos = async () => {
    return await articuloModel.obtenerTodos();
};

const obtenerArticuloPorId = async (id) => {
    const pool = await getConnection();

    const result = await pool.request()
        .input('Id', sql.Int, id)
        .query('SELECT * FROM Articulo WHERE Id = @Id');

    return result.recordset[0] || null;
};

const actualizarArticulo = async (id, data) => {
    return await articuloModel.actualizar(id, data);
};

const eliminarArticulo = async (id) => {
    return await articuloModel.eliminar(id);
};

module.exports = {
    crearArticulo,
    obtenerArticulos,
    obtenerArticuloPorId,
    actualizarArticulo,
    eliminarArticulo
};
