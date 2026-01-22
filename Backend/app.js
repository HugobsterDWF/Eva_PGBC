const express = require('express');

const app = express();
const errorHandler = require('./middlewares/error.middleware');
app.use(express.json());

app.use('/api/articulos', require('./routes/articulo.routes'));
app.use('/api/auth', require('./routes/auth.routes'));

app.use(errorHandler);

module.exports = app;
