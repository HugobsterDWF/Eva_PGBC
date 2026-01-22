const { sql, getConnection } = require('../config/db');

const crear = async (data) => {
    const pool = await getConnection();
    await pool.request()
        .input('Tipo', sql.VarChar, data.tipo)
        .input('NombreArchivo', sql.VarChar, data.nombreArchivo)
        .input('RutaArchivo', sql.VarChar, data.rutaArchivo)
        .input('TotalRegistros', sql.Int, data.totalRegistros)
        .input('GeneradoPor', sql.VarChar, data.generadoPor)
        .query(`
            INSERT INTO ReporteArticulo
            (Tipo, NombreArchivo, RutaArchivo, TotalRegistros, GeneradoPor)
            VALUES (@Tipo, @NombreArchivo, @RutaArchivo, @TotalRegistros, @GeneradoPor)
        `);
};

const listar = async () => {
    const pool = await getConnection();
    const result = await pool.request()
        .query('SELECT * FROM ReporteArticulo ORDER BY FechaGeneracion DESC');
    return result.recordset;
};

module.exports = { crear, listar };
