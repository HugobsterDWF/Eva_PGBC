const sql = require('mssql');
const { getConnection } = require('../config/db');

const obtenerUsuarioPorUsername = async (username) => {
    const pool = await getConnection();

    const result = await pool.request()
        .input('Username', sql.VarChar(50), username)
        .query(`
            SELECT Id, Username, PasswordHash, Rol
            FROM Usuario
            WHERE Username = @Username
        `);

    return result.recordset[0];
};

module.exports = {
    obtenerUsuarioPorUsername
};
