const { sql, getConnection } = require("../config/db");

const generarReporteArticulos = async (user) => {
  const pool = await getConnection();

  // 1. Obtener artículos
  const articulos = await pool.request()
    .query("SELECT * FROM Articulo");

  // 2. Insertar reporte
  const reporteResult = await pool.request()
    .input("Tipo", sql.VarChar, "ARTICULOS")
    .input("Total", sql.Int, articulos.recordset.length)
    .input("Usuario", sql.VarChar, user?.username || null)
    .query(`
      INSERT INTO Reporte (Tipo, TotalRegistros, Usuario)
      OUTPUT INSERTED.Id
      VALUES (@Tipo, @Total, @Usuario)
    `);

  const reporteId = reporteResult.recordset[0].Id;

  // 3. Insertar detalle
  for (const a of articulos.recordset) {
    await pool.request()
      .input("ReporteId", sql.Int, reporteId)
      .input("ArticuloId", sql.Int, a.Id)
      .input("Nombre", sql.VarChar, a.Nombre)
      .input("Descripcion", sql.VarChar, a.Descripcion)
      .input("Precio", sql.Decimal(10, 2), a.Precio)
      .query(`
        INSERT INTO ReporteDetalle
        (ReporteId, ArticuloId, Nombre, Descripcion, Precio)
        VALUES (@ReporteId, @ArticuloId, @Nombre, @Descripcion, @Precio)
      `);
  }

  return {
    reporteId,
    total: articulos.recordset.length
  };
};

const obtenerReporte = async (id) => {
  const pool = await getConnection();

  const reporte = await pool.request()
    .input("Id", sql.Int, id)
    .query("SELECT * FROM Reporte WHERE Id = @Id");

  const detalle = await pool.request()
    .input("Id", sql.Int, id)
    .query(`
      SELECT * FROM ReporteDetalle
      WHERE ReporteId = @Id
    `);

  return {
    ...reporte.recordset[0],
    articulos: detalle.recordset
  };
};

module.exports = {
  generarReporteArticulos,
  obtenerReporte
};
