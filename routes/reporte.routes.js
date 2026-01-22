const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const controller = require('../controllers/reporte.controller');
console.log('Controller:', controller);
console.log('generarPDF:', controller.generarPDF);
console.log('generarExcel:', controller.generarExcel);
console.log('listarReportes:', controller.listarReportes);

router.post('/articulos/pdf', auth, controller.generarPDF);
router.post('/articulos/excel', auth, controller.generarExcel);
router.get('/articulos', auth, controller.listarReportes);

module.exports = router;
