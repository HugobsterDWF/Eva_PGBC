const sql = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: false
    }
};

let pool;

const getConnection = async () => {
    if (!pool) {
        pool = await sql.connect(config);
        console.log('✅ Conectado a SQL Server');
    }
    return pool;
};

module.exports = {
    sql,
    getConnection
};
