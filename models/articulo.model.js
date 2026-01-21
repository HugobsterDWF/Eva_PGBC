const { sql, getConnection } = require('../config/db');

const crear = async ({ nombre, descripcion, precio }) => {
    const pool = await getConnection();

    const result = await pool.request()
        .input('Nombre', sql.VarChar(50), nombre)
        .input('Descripcion', sql.VarChar(250), descripcion)
        .input('Precio', sql.Decimal(10, 2), precio)
        .query(`
            INSERT INTO Articulo (Nombre, Descripcion, Precio)
            VALUES (@Nombre, @Descripcion, @Precio)
        `);

    return result;
};

const obtenerTodos = async () => {
    const pool = await getConnection();

    const result = await pool.request()
        .query('SELECT * FROM Articulo');

    return result.recordset;
};

const obtenerPorId = async (id) => {
    const pool = await getConnection();

    const result = await pool.request()
        .input('Id', sql.Int, id)
        .query('SELECT * FROM Articulo WHERE Id = @Id');

    return result.recordset[0];
};

const actualizar = async (id, { nombre, descripcion, precio }) => {
    const pool = await getConnection();

    await pool.request()
        .input('Id', sql.Int, id)
        .input('Nombre', sql.VarChar(50), nombre)
        .input('Descripcion', sql.VarChar(250), descripcion)
        .input('Precio', sql.Decimal(10, 2), precio)
        .query(`
            UPDATE Articulo
            SET Nombre = @Nombre,
                Descripcion = @Descripcion,
                Precio = @Precio
            WHERE Id = @Id
        `);
};

const eliminar = async (id) => {
    const pool = await getConnection();

    await pool.request()
        .input('Id', sql.Int, id)
        .query('DELETE FROM Articulo WHERE Id = @Id');
};

module.exports = {
    crear,
    obtenerTodos,
    obtenerPorId,
    actualizar,
    eliminar
};
