const express = require('express');
const cors = require('cors');
const app = express();
const errorHandler = require('./middlewares/error.middleware');

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/api/articulos', require('./routes/articulo.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use("/api/reportes", require("./routes/reporte.routes"));


app.use(errorHandler);

module.exports = app;
