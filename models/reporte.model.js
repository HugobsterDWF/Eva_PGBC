const { sql, getConnection } = require('../config/db');

const crear = async (data) => {
  try {
    const pool = await getConnection();
    await pool.request()
      .input('Tipo', sql.VarChar, data.tipo)
      .input('NombreArchivo', sql.VarChar, data.nombreArchivo)
      .input('RutaArchivo', sql.VarChar, data.rutaArchivo)
      .input('TotalRegistros', sql.Int, data.totalRegistros)
      .input('GeneradoPor', sql.VarChar, data.generadoPor)
      .query(`
        INSERT INTO dbo.ReporteArticulo
        (Tipo, NombreArchivo, RutaArchivo, TotalRegistros, GeneradoPor)
        VALUES (@Tipo, @NombreArchivo, @RutaArchivo, @TotalRegistros, @GeneradoPor)
      `);

  } catch (error) {
    console.error('Error al guardar reporte:', error);
    throw error;
  }
};

const listar = async () => {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .query('SELECT * FROM dbo.ReporteArticulo ORDER BY FechaGeneracion DESC');
    return result.recordset;
  } catch (error) {
    console.error('Error al listar reportes:', error);
    throw error;
  }
};

module.exports = { crear, listar };
